import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

const ROOT = process.cwd();
const RAW_DIR = path.join(ROOT, "raw messy data");
const DATA_DIR = path.join(ROOT, "data");
const MEDIA_DIR = path.join(ROOT, "public", "media");

const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const BLOCKLIST_IMAGE_HOSTS = new Set(["www.cheyfloristsi.com", "assets.stage.eflorist.com"]);
const URL_MAP_FILE = path.join(MEDIA_DIR, "_url-map.json");
const FETCH_TIMEOUT_MS = 45000;
const DOWNLOAD_CONCURRENCY = 6;

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function cleanText(value) {
  return value
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\s+([,.;:!?])/g, "$1")
    .trim();
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const raw = match[1];
  const data = {};
  for (const line of raw.split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim().replace(/^"|"$/g, "");
    data[key] = value;
  }
  return data;
}

function sectionBody(content) {
  return content.replace(/^---[\s\S]*?---\n?/, "");
}

async function walkMarkdownFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walkMarkdownFiles(fullPath)));
      continue;
    }
    if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(fullPath);
    }
  }
  return files;
}

function parseLinks(content) {
  const linkRegex = /\[([^\]]*?)\]\((https?:\/\/[^\s)]+)\)/g;
  const links = [];
  let match;
  while ((match = linkRegex.exec(content)) !== null) {
    links.push({
      label: cleanText(match[1].replace(/!/g, "")),
      url: match[2].trim(),
    });
  }
  return links;
}

function parseImages(content) {
  const imageRegex = /!\[([^\]]*?)\]\((https?:\/\/[^\s)]+)\)/g;
  const images = [];
  let match;
  while ((match = imageRegex.exec(content)) !== null) {
    images.push({
      alt: cleanText(match[1]),
      url: match[2].trim(),
    });
  }
  return images;
}

function parseBusinessInfo(fileRecords) {
  const allText = fileRecords.map((f) => f.body).join("\n");
  const phones = unique(
    [...allText.matchAll(/(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g)].map(
      (m) => cleanText(m[0]),
    ),
  );
  const emails = unique(
    [...allText.matchAll(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi)].map((m) =>
      m[0].toLowerCase(),
    ),
  );

  const aboutDoc = fileRecords.find((f) => f.frontmatter.url?.includes("/about-us"));
  const lines = aboutDoc ? aboutDoc.body.split("\n").map((line) => line.trim()) : [];
  const addressStart = lines.findIndex((line) => /^\d+\s+.+/.test(line));
  const address = addressStart >= 0
    ? cleanText(`${lines[addressStart] || ""} ${lines[addressStart + 1] || ""}`)
    : "";

  const hours = {};
  for (let i = 0; i < lines.length; i += 1) {
    if (WEEKDAYS.includes(lines[i])) {
      const next = cleanText(lines[i + 1] || "");
      if (next) {
        hours[lines[i]] = next;
      }
    }
  }

  const homeDoc = fileRecords.find((f) => f.frontmatter.url === "https://www.cheyfloristsi.com/");
  const homepageCopy = homeDoc
    ? unique(
        homeDoc.body
          .split("\n")
          .map((line) => cleanText(line))
          .filter(
            (line) =>
              line.length > 80 &&
              !line.startsWith("[") &&
              !line.startsWith("http") &&
              !line.includes("Select ZIP"),
          ),
      ).slice(0, 8)
    : [];

  const promotions = [];
  if (homeDoc) {
    const body = homeDoc.body;
    const bannerHeading = body.match(/^#\s+(.+)$/m)?.[1];
    if (bannerHeading) {
      promotions.push({ text: cleanText(bannerHeading), source: homeDoc.frontmatter.url });
    }
    for (const line of body.split("\n")) {
      if (/Shop .+ Flowers/i.test(line) || /Deal of the Day/i.test(line)) {
        const text = cleanText(line.replace(/\[|\]|\(|\)|\*|\\/g, ""));
        if (text.length > 5) {
          promotions.push({ text, source: homeDoc.frontmatter.url });
        }
      }
    }
  }

  return {
    name: "Chey Florist",
    branding: {
      style: "premium modern floral studio",
    },
    address,
    phones,
    emails,
    hours,
    serviceArea:
      "All of Staten Island, NY including area hospitals and funeral homes.",
    homepageCopy,
    promotions: unique(promotions.map((p) => JSON.stringify(p))).map((raw) => JSON.parse(raw)),
    social: {
      instagram: "https://www.instagram.com/cheyflorist/",
    },
  };
}

function productPathSlug(urlStr) {
  try {
    const pathname = new URL(urlStr).pathname;
    const parts = pathname.split("/").filter(Boolean);
    const pIdx = parts.findIndex((part) => /^p_ef/i.test(part) || /^prod/i.test(part));
    if (pIdx > 0) return parts[pIdx - 1];
  } catch {
    /* ignore */
  }
  return "";
}

function parseProduct(record) {
  const { url, title } = record.frontmatter;
  if (!url?.includes("/p_ef") && !/\/prod\d+/i.test(url)) return null;
  const lines = record.body.split("\n");
  const heading = lines.find((line) => line.startsWith("# "));
  const name = cleanText((heading || title || "").replace(/^#\s*/, "").replace(/ in .+$/, ""));
  if (!name) return null;

  const urlObj = new URL(url);
  const segments = urlObj.pathname.split("/").filter(Boolean);
  const category = segments[0] || "flowers";
  const subcategory = segments[1] || "";
  const slug = productPathSlug(url) || slugify(name);

  const variantMatches = [...record.body.matchAll(/(?:^|\n)(Standard|Deluxe|Premium)\s*-\s*\$([0-9]+(?:\.[0-9]{2})?)/g)];
  const variants = variantMatches.map((m) => ({
    name: m[1],
    price: Number(m[2]),
    sku: (record.body.match(new RegExp(`${m[1]}[\\s\\S]{0,120}\\n\\n([A-Z0-9-]{4,})`)) || [])[1] || "",
  }));

  const standalonePrices = [...record.body.matchAll(/\$([0-9]+(?:\.[0-9]{2})?)/g)].map((m) => Number(m[1]));
  const basePrice = variants[0]?.price ?? standalonePrices[0] ?? null;

  const descriptionStart = record.body.indexOf("[DESCRIPTION]");
  let fullDescription = "";
  if (descriptionStart >= 0) {
    const tail = record.body.slice(descriptionStart);
    const stopAt = tail.search(/\n-\s*Orientation|\nSign up for special offers!/i);
    fullDescription = cleanText(stopAt > 0 ? tail.slice(0, stopAt) : tail)
      .replace("[DESCRIPTION]", "")
      .trim();
  }
  fullDescription = fullDescription
    .replace(/^\(https?:\/\/[^)]*#description\)\s*/i, "")
    .replace(/^\(https?:\/\/[^)]+\)\s*/i, "")
    .trim();

  const availability = /sold out/i.test(record.body) ? "sold_out" : "available";
  const badges = [];
  if (/same-day delivery/i.test(record.body)) badges.push("Same-day delivery");

  return {
    name,
    slug,
    category: cleanText(category.replace(/-/g, " ")),
    subcategory: subcategory ? cleanText(subcategory.replace(/-/g, " ")) : "",
    price: basePrice,
    compareAtPrice: null,
    availability,
    badges,
    fullDescription,
    variants,
    imagePaths: [],
    sourcePageUrl: url,
    sourceMarkdownFile: record.relativePath,
  };
}

function parseCollections(fileRecords) {
  const collectionsBySlug = new Map();
  for (const record of fileRecords) {
    const { url, title } = record.frontmatter;
    if (!url) continue;
    if (!/\/cat\d+|\/sympathy-collections\//.test(url)) continue;
    const links = parseLinks(record.body).filter((link) =>
      /\/p_ef|\/prod\d+|\/bouquet|\/arrangement|\/plant|\/basket|\/flower|\/sympathy-/i.test(link.url),
    );
    const urlObj = new URL(url);
    const slug = slugify(urlObj.pathname.split("/").filter(Boolean).slice(-2, -1)[0] || title || url);
    if (!collectionsBySlug.has(slug)) {
      collectionsBySlug.set(slug, {
        name: cleanText((title || "").replace(/^Buy\s+/i, "").replace(/\s+from.+$/i, "")) || slug,
        slug,
        description: "",
        type: /season|spring|easter|mother|valentine|christmas|new-years|hanukkah|fathers-day|sweetest-day/i.test(
          `${title} ${url}`,
        )
          ? "seasonal"
          : /sympathy/i.test(`${title} ${url}`)
            ? "sympathy"
            : /wedding/i.test(`${title} ${url}`)
              ? "wedding"
              : "general",
        imagePaths: [],
        productSlugs: [],
        sourcePageUrl: url,
        sourceMarkdownFile: record.relativePath,
      });
    }
    const existing = collectionsBySlug.get(slug);
    existing.productSlugs = unique([
      ...existing.productSlugs,
      ...links
        .map((link) => productPathSlug(link.url) || slugify(link.label))
        .filter((s) => s && s !== "shop-now" && s !== "buy-now"),
    ]);
  }
  return [...collectionsBySlug.values()];
}

function isProductDetailUrl(urlStr) {
  try {
    const p = new URL(urlStr).pathname;
    return /\/p_ef/i.test(p) || /\/prod\d+/i.test(p);
  } catch {
    return false;
  }
}

function isCategoryListingUrl(urlStr) {
  return /\/cat\d+/i.test(urlStr);
}

function parsePages(fileRecords) {
  const pageRecords = [];
  for (const record of fileRecords) {
    const { url, title } = record.frontmatter;
    if (!url) continue;
    if (isProductDetailUrl(url) || isCategoryListingUrl(url)) continue;
    const isCanonicalPage =
      /\/(about-us|faq|contact|sitemap)(?:\?|$)/.test(url) ||
      /\/sympathy(?:\?|$)/.test(url) ||
      /\/wedding(?:-|$)/.test(url) ||
      /\/deal-of-the-day\//.test(url) ||
      (!isProductDetailUrl(url) &&
        !isCategoryListingUrl(url) &&
        /\/(privacy|terms|delivery|consultation)/i.test(url));
    if (!isCanonicalPage) continue;
    const heading = record.body.match(/^#\s+(.+)$/m)?.[1] || title || "Page";
    const paragraphs = unique(
      record.body
        .split("\n")
        .map((line) => cleanText(line))
        .filter(
          (line) =>
            line.length > 60 &&
            !line.startsWith("[") &&
            !line.startsWith("http") &&
            !line.includes("cheyfloristsi.comhttps") &&
            !line.includes("Compare Your Favorites") &&
            !line.includes("Select ZIP"),
        ),
    ).slice(0, 10);
    pageRecords.push({
      title: cleanText(heading),
      slug: slugify(new URL(url).pathname.replace(/\//g, "-") || "home"),
      pageType: /wedding/i.test(url)
        ? "wedding"
        : /sympathy/i.test(url)
          ? "sympathy"
          : /about/i.test(url)
            ? "about"
            : /contact/i.test(url)
              ? "contact"
              : /faq/i.test(url)
                ? "faq"
                : "general",
      url,
      sourceMarkdownFile: record.relativePath,
      content: paragraphs,
    });
  }
  return pageRecords;
}

function makeMediaKey(url) {
  try {
    const parsed = new URL(url);
    parsed.search = "";
    return parsed.toString();
  } catch {
    return url;
  }
}

function extFromContentType(contentType) {
  if (!contentType) return ".jpg";
  if (contentType.includes("png")) return ".png";
  if (contentType.includes("webp")) return ".webp";
  if (contentType.includes("gif")) return ".gif";
  if (contentType.includes("svg")) return ".svg";
  return ".jpg";
}

async function ensureDirs() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.mkdir(MEDIA_DIR, { recursive: true });
}

async function loadUrlMap() {
  try {
    const raw = await fs.readFile(URL_MAP_FILE, "utf8");
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

async function saveUrlMap(map) {
  await fs.writeFile(URL_MAP_FILE, JSON.stringify(map, null, 2));
}

async function tryOptimizeWebp(buffer, contentType) {
  if (!/^image\/(jpeg|jpg|png|webp)$/i.test(contentType || "")) {
    return null;
  }
  try {
    const sharp = (await import("sharp")).default;
    return await sharp(buffer)
      .rotate()
      .resize({ width: 2000, height: 2000, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 84 })
      .toBuffer();
  } catch {
    return null;
  }
}

async function downloadMedia(mediaEntries) {
  const byKey = new Map();
  for (const media of mediaEntries) {
    const key = makeMediaKey(media.originalUrl);
    if (!byKey.has(key)) byKey.set(key, media);
  }

  const digestToLocal = new Map();
  const downloaded = [];
  const urlMap = await loadUrlMap();

  for (const [mappedUrl, relPath] of Object.entries(urlMap)) {
    const abs = path.join(ROOT, "public", relPath.replace(/^\//, ""));
    try {
      await fs.access(abs);
    } catch {
      delete urlMap[mappedUrl];
    }
  }

  const queue = [...byKey.values()];

  async function downloadOne(media) {
    let parsed;
    try {
      parsed = new URL(media.originalUrl);
    } catch {
      return null;
    }
    if (BLOCKLIST_IMAGE_HOSTS.has(parsed.hostname)) {
      return null;
    }

    const key = makeMediaKey(media.originalUrl);
    const cached = urlMap[key];
    if (cached) {
      const abs = path.join(ROOT, "public", cached.replace(/^\//, ""));
      try {
        await fs.access(abs);
        return {
          originalUrl: media.originalUrl,
          localPath: cached,
          associatedWith: media.associatedWith,
          sourceMarkdownFile: media.sourceMarkdownFile,
          sourcePageUrl: media.sourcePageUrl,
        };
      } catch {
        delete urlMap[key];
      }
    }

    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
      const response = await fetch(media.originalUrl, {
        signal: controller.signal,
        headers: { "user-agent": "chey-florist-data-build/1.0" },
      });
      clearTimeout(timer);
      if (!response.ok) return null;
      const arrBuf = await response.arrayBuffer();
      let buffer = Buffer.from(arrBuf);
      const digest = crypto.createHash("sha1").update(buffer).digest("hex");
      let localPath = digestToLocal.get(digest);
      if (!localPath) {
        const baseName = slugify(
          path.basename(parsed.pathname, path.extname(parsed.pathname)) || "image",
        );
        const contentType = response.headers.get("content-type") || "";
        const webpBuf = await tryOptimizeWebp(buffer, contentType);
        let ext = extFromContentType(contentType);
        let outBuf = buffer;
        if (webpBuf && webpBuf.length > 0) {
          outBuf = webpBuf;
          ext = ".webp";
        }
        const fileName = `${baseName}-${digest.slice(0, 10)}${ext}`;
        const absolutePath = path.join(MEDIA_DIR, fileName);
        await fs.writeFile(absolutePath, outBuf);
        localPath = `/media/${fileName}`;
        digestToLocal.set(digest, localPath);
        urlMap[key] = localPath;
      }

      return {
        originalUrl: media.originalUrl,
        localPath,
        associatedWith: media.associatedWith,
        sourceMarkdownFile: media.sourceMarkdownFile,
        sourcePageUrl: media.sourcePageUrl,
      };
    } catch {
      return null;
    }
  }

  for (let i = 0; i < queue.length; i += DOWNLOAD_CONCURRENCY) {
    const batch = queue.slice(i, i + DOWNLOAD_CONCURRENCY);
    const results = await Promise.all(batch.map((item) => downloadOne(item)));
    for (const r of results) {
      if (r) downloaded.push(r);
    }
    await saveUrlMap(urlMap);
  }

  return downloaded;
}

function attachMediaToEntities(products, collections, pages, mediaMap) {
  const productBySlug = new Map(products.map((p) => [p.slug, p]));
  for (const media of mediaMap) {
    if (media.associatedWith?.kind === "product") {
      const product = productBySlug.get(media.associatedWith.slug);
      if (product) {
        product.imagePaths = unique([...product.imagePaths, media.localPath]);
      }
    }
  }
  for (const collection of collections) {
    const topImages = collection.productSlugs
      .map((slug) => productBySlug.get(slug)?.imagePaths?.[0])
      .filter(Boolean)
      .slice(0, 6);
    collection.imagePaths = unique(topImages);
  }
  for (const page of pages) {
    const matching = mediaMap
      .filter((m) => m.associatedWith?.kind === "page" && m.associatedWith.slug === page.slug)
      .map((m) => m.localPath);
    if (matching.length) {
      page.imagePaths = unique(matching);
    }
  }
}

async function main() {
  const skipMedia = process.argv.includes("--skip-media");
  await ensureDirs();
  const markdownFiles = await walkMarkdownFiles(RAW_DIR);
  const fileRecords = [];
  for (const filePath of markdownFiles) {
    const content = await fs.readFile(filePath, "utf8");
    const frontmatter = parseFrontmatter(content);
    const body = sectionBody(content);
    fileRecords.push({
      absolutePath: filePath,
      relativePath: path.relative(ROOT, filePath),
      frontmatter,
      body,
      links: parseLinks(body),
      images: parseImages(body),
    });
  }

  const business = parseBusinessInfo(fileRecords);
  const productList = fileRecords.map((record) => parseProduct(record)).filter(Boolean);
  const productBySlug = new Map();
  for (const p of productList) {
    if (!productBySlug.has(p.slug)) {
      productBySlug.set(p.slug, p);
      continue;
    }
    const cur = productBySlug.get(p.slug);
    if ((p.fullDescription?.length || 0) > (cur.fullDescription?.length || 0)) {
      cur.fullDescription = p.fullDescription;
    }
    cur.variants = p.variants?.length ? p.variants : cur.variants;
    cur.price = cur.price ?? p.price;
  }
  const products = [...productBySlug.values()];
  const collections = parseCollections(fileRecords);
  const pages = parsePages(fileRecords);
  const homeDoc = fileRecords.find((f) => f.frontmatter.url === "https://www.cheyfloristsi.com/");
  if (homeDoc && !pages.some((p) => p.slug === "home")) {
    const homeParagraphs = unique(
      homeDoc.body
        .split("\n")
        .map((line) => cleanText(line))
        .filter(
          (line) =>
            line.length > 80 &&
            !line.startsWith("[") &&
            !line.startsWith("http") &&
            !line.includes("Select ZIP"),
        ),
    ).slice(0, 10);
    pages.unshift({
      title: "Home",
      slug: "home",
      pageType: "home",
      url: homeDoc.frontmatter.url,
      sourceMarkdownFile: homeDoc.relativePath,
      content: homeParagraphs,
    });
  }

  const mediaEntries = [];
  for (const record of fileRecords) {
    const product = products.find((p) => p.sourceMarkdownFile === record.relativePath);
    const page = pages.find((p) => p.sourceMarkdownFile === record.relativePath);
    for (const image of record.images) {
      mediaEntries.push({
        originalUrl: image.url,
        associatedWith: product
          ? { kind: "product", slug: product.slug }
          : page
            ? { kind: "page", slug: page.slug }
            : { kind: "unknown", slug: "unknown" },
        sourceMarkdownFile: record.relativePath,
        sourcePageUrl: record.frontmatter.url || "",
      });
    }
  }

  let mediaMap = [];
  if (skipMedia) {
    try {
      mediaMap = JSON.parse(await fs.readFile(path.join(DATA_DIR, "media-map.json"), "utf8"));
    } catch {
      mediaMap = [];
    }
  } else {
    mediaMap = await downloadMedia(mediaEntries);
  }
  attachMediaToEntities(products, collections, pages, mediaMap);

  const normalizedProducts = products.filter((p) => p.name && p.price !== null);
  const normalizedCollections = collections.filter((c) => c.name);
  const pagesDeduped = [...new Map(pages.map((p) => [p.slug, p])).values()];
  const normalizedPages = pagesDeduped.filter((p) => p.title && p.content?.length);

  await fs.writeFile(path.join(DATA_DIR, "business.json"), JSON.stringify(business, null, 2));
  await fs.writeFile(path.join(DATA_DIR, "products.json"), JSON.stringify(normalizedProducts, null, 2));
  await fs.writeFile(path.join(DATA_DIR, "collections.json"), JSON.stringify(normalizedCollections, null, 2));
  await fs.writeFile(path.join(DATA_DIR, "pages.json"), JSON.stringify(normalizedPages, null, 2));
  await fs.writeFile(path.join(DATA_DIR, "media-map.json"), JSON.stringify(mediaMap, null, 2));

  console.log(
    `Built data: ${normalizedProducts.length} products, ${normalizedCollections.length} collections, ${normalizedPages.length} pages, ${mediaMap.length} media files.`,
  );
}

main();
