'use client';

import { Header, Footer, HeroBanner, ProductCard, AnnouncementBar } from '@/components';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Product {
  name: string;
  slug: string;
  price: number | null;
  imagePaths: string[];
  category: string;
}

interface Collection {
  name: string;
  slug: string;
  type: string;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const productsRes = await fetch('/api/products?limit=8');
        const productsData = await productsRes.json();
        setProducts(productsData);

        const collectionsRes = await fetch('/api/collections');
        const collectionsData = await collectionsRes.json();
        setCollections(collectionsData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const occasions: { name: string; href: string; img: string; n: string }[] = [
    { name: 'Birthday', href: '/collections/birthday', img: '/media/category-banner-birthday-6d5899ace2.webp', n: 'I' },
    { name: 'Anniversary', href: '/collections/anniversary', img: '/media/category-banner-anniversary-09371ef61a.webp', n: 'II' },
    { name: 'Sympathy', href: '/sympathy', img: '/media/beautiful-memories-collection-banner-ec7f6dd5b8.webp', n: 'III' },
    { name: 'Weddings & Events', href: '/wedding-events', img: '/media/category-banner-love-and-romance-3661532b6f.webp', n: 'IV' },
    { name: 'Just Because', href: '/collections/just-because', img: '/media/category-banner-just-because-36edc515de.webp', n: 'V' },
    { name: 'Mother\'s Day', href: '/collections/mothers-day', img: '/media/dod-cat-banner-mothers-day-845b64e123.webp', n: 'VI' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />

      <HeroBanner
        title="Le Jardin Privé"
        imagePath="/media/party-1-f39d7f8bb6.webp"
        ctaText="Enter the Atelier"
        ctaLink="/collections/all"
      />

      <main className="flex-1">
        {/* MANIFESTO — editorial intro */}
        <section className="py-28 md:py-40">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              <div className="lg:col-span-3">
                <div className="eyebrow text-gold mb-4">№ 01</div>
                <div className="eyebrow text-ink/60">A Manifesto</div>
                <div className="mt-10 hidden lg:block">
                  <svg viewBox="0 0 80 80" className="w-20 h-20 text-moss animate-sway">
                    <g fill="none" stroke="currentColor" strokeWidth="1">
                      <path d="M40 70 Q40 50 30 40 Q20 30 25 20" />
                      <circle cx="25" cy="20" r="6" />
                      <circle cx="30" cy="40" r="4" />
                      <path d="M40 70 Q40 55 50 45 Q60 35 55 22" />
                      <circle cx="55" cy="22" r="5" />
                      <path d="M40 70 Q42 60 48 56" />
                    </g>
                  </svg>
                </div>
              </div>
              <div className="lg:col-span-9">
                <h2 className="sd-rise display font-light leading-[0.95] tracking-[-0.02em] text-ink text-4xl md:text-6xl lg:text-[5rem]">
                  Flowers, gathered with <span className="italiana italic text-moss">patience</span> &mdash;
                  bouquets composed the way a painter composes a still <span className="italiana italic text-oxblood">life</span>.
                </h2>
                <div className="mt-12 grid md:grid-cols-2 gap-10">
                  <p className="sd-rise-soft serif text-lg md:text-xl text-ink/80 leading-relaxed dropcap" style={{ animationDelay: '0.15s' }}>
                    For over a decade, Chey Florist has tended a small storefront on Forest Avenue. Each morning we open boxes from the market, sort stems by color and posture, and begin again. Nothing here is wired or stamped from a catalogue — every bouquet is conducted by hand, in our studio, on the same day it leaves us.
                  </p>
                  <p className="sd-rise-soft serif text-lg md:text-xl text-ink/80 leading-relaxed" style={{ animationDelay: '0.3s' }}>
                    We arrange for birthdays and quiet mornings, for new mothers and old friends, for funerals and first dates. We will deliver to a hospital, an office, a stoop in Stapleton, a chapel in West Brighton — the same afternoon, by our own hand. Tell us the colors you love and the person you'd like to move; we will compose the rest.
                  </p>
                </div>

                <div className="mt-14 flex flex-wrap items-center gap-8">
                  <Link href="/about" className="eyebrow link-edit text-ink">Read our story →</Link>
                  <Link href="/delivery" className="eyebrow link-edit text-ink/70">Delivery & areas served</Link>
                  <span className="display italic text-2xl text-moss">— C. F.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRACTICES — 3 columns with serif numbers */}
        <section className="border-y border-ink/15 bg-bone/60 py-24">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <div className="grid md:grid-cols-3 gap-px bg-ink/10">
              {[
                {
                  n: '01',
                  title: 'Gathered at Dawn',
                  body: 'Stems are selected at the wholesale market each morning. Only what is in peak condition makes it into the studio that day.',
                },
                {
                  n: '02',
                  title: 'Composed by Hand',
                  body: 'We never use wire armatures or shortcuts. Each bouquet is built stem by stem, breath by breath, by the florist who signs the card.',
                },
                {
                  n: '03',
                  title: 'Delivered the Same Afternoon',
                  body: 'Orders placed before 1pm are hand-delivered across Staten Island that same day. We knock; we wait until someone smiles.',
                },
              ].map((p, i) => (
                <div key={p.n} style={{ animationDelay: `${i * 0.15}s` }} className="sd-rise bg-cream p-10 md:p-12 group hover:bg-bone transition-colors duration-700">
                  <div className="flex items-baseline gap-4 mb-8">
                    <span className="display italic text-6xl text-moss">{p.n}</span>
                    <span className="h-px flex-1 bg-ink/30" />
                    <span className="eyebrow text-ink/40">Practice</span>
                  </div>
                  <h3 className="display text-3xl text-ink mb-4 leading-tight">{p.title}</h3>
                  <p className="serif text-lg text-ink/75 leading-relaxed">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED ARRANGEMENTS */}
        {!loading && products.length > 0 && (
          <section className="py-28 md:py-40">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
                <div>
                  <div className="eyebrow text-gold mb-5 flex items-center gap-3">
                    <span>№ 02</span><span className="w-10 h-px bg-ink/40" /><span>From the Studio</span>
                  </div>
                  <h2 className="sd-rise display text-5xl md:text-7xl font-light leading-[0.95] tracking-[-0.02em]">
                    This week's <span className="italiana italic text-moss">compositions</span>
                  </h2>
                </div>
                <Link href="/collections/all" className="eyebrow link-edit text-ink shrink-0">
                  See the entire atelier →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                {products.slice(0, 8).map((product, i) => (
                  <div
                    key={product.slug}
                    style={{ animationDelay: `${(i % 4) * 0.12}s` }}
                    className={`sd-rise ${i % 4 === 1 || i % 4 === 2 ? 'lg:translate-y-12' : ''}`}
                  >
                    <ProductCard
                      name={product.name}
                      slug={product.slug}
                      price={product.price}
                      imagePath={product.imagePaths?.[0]}
                      category={product.category}
                      index={i}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* OCCASIONS — editorial poster grid */}
        <section className="bg-moss text-cream py-28 md:py-40 relative overflow-hidden">
          <div className="absolute -top-32 -right-32 w-[480px] h-[480px] blob bg-moss2 opacity-50" />
          <div className="absolute -bottom-40 -left-32 w-[520px] h-[520px] blob bg-ink opacity-40" />
          <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
              <div>
                <div className="eyebrow text-blush mb-5 flex items-center gap-3">
                  <span>№ 03</span><span className="w-10 h-px bg-cream/40" /><span>By Occasion</span>
                </div>
                <h2 className="sd-rise display text-5xl md:text-7xl font-light leading-[0.95] tracking-[-0.02em]">
                  For every <span className="italiana italic text-blush">tender</span> moment.
                </h2>
              </div>
              <p className="serif text-lg text-cream/75 max-w-md">
                Six chapters of arrangements — celebrate, console, congratulate. Each curated to feel like it was made for one person.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-7">
              {occasions.map((c, i) => (
                <Link
                  key={c.href}
                  href={c.href}
                  style={{ animationDelay: `${(i % 3) * 0.12}s` }}
                  className={`sd-rise group block relative aspect-[3/4] overflow-hidden ${i % 2 === 1 ? 'lg:translate-y-10' : ''}`}
                >
                  <div className="absolute inset-0 sd-parallax">
                    <Image
                      src={c.img}
                      alt={c.name}
                      fill
                      className="object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1200ms]"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-moss/95 via-moss/30 to-transparent" />
                  <div className="absolute top-5 left-5 right-5 flex items-center justify-between eyebrow text-cream/90">
                    <span>{c.n}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="display text-3xl md:text-4xl font-light leading-tight">
                      {c.name}
                    </h3>
                    <div className="mt-2 eyebrow text-blush flex items-center gap-2">
                      Browse <span className="w-6 h-px bg-blush" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIAL — pull quote */}
        <section className="py-32 md:py-44">
          <div className="max-w-5xl mx-auto px-6 lg:px-10 text-center">
            <div className="eyebrow text-gold mb-8">№ 04 — A Note Received</div>
            <p className="sd-rise display font-light text-4xl md:text-6xl leading-[1.05] tracking-[-0.01em] text-ink">
              &ldquo;The arrangement <span className="italiana italic text-moss">arrived</span> right as the service began.
              Three people cried; one asked who made them. <span className="italiana italic text-oxblood">Cheyenne</span>, you composed a goodbye.&rdquo;
            </p>
            <div className="mt-12 ornament-divider text-moss"><span className="display italic text-xl">✿</span></div>
            <div className="mt-8 eyebrow text-ink/60">— M.D., Stapleton · February</div>
          </div>
        </section>

        {/* CTA — bold finale */}
        <section className="relative pb-28">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <div className="relative bg-ink text-cream overflow-hidden rounded-[2px]">
              <div className="absolute inset-0 opacity-30 sd-parallax">
                <Image
                  src="/media/category-banner-love-and-romance-3661532b6f.webp"
                  alt=""
                  fill
                  className="object-cover scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/30" />
              <div className="relative grid lg:grid-cols-12 gap-10 p-10 md:p-20">
                <div className="lg:col-span-8">
                  <div className="eyebrow text-gold mb-6">Order Today</div>
                  <h2 className="sd-rise display text-5xl md:text-7xl lg:text-8xl font-light leading-[0.95] tracking-[-0.02em]">
                    Send <span className="italiana italic text-blush">flowers</span> that<br />
                    arrive while it still <span className="italiana italic text-blush">matters</span>.
                  </h2>
                </div>
                <div className="lg:col-span-4 flex flex-col justify-end gap-5">
                  <p className="serif text-lg text-cream/80 leading-snug">
                    Same-day delivery across Staten Island when ordered before 1pm. National delivery through our trusted partner florists.
                  </p>
                  <div className="flex flex-col gap-3">
                    <Link href="/collections/all" className="group flex items-center justify-between gap-3 bg-cream text-ink rounded-full px-7 py-4 btn-press">
                      <span className="eyebrow">Browse the atelier</span>
                      <span className="w-6 h-px bg-ink group-hover:w-12 transition-all duration-500" />
                    </Link>
                    <a href="tel:(929) 216-7775" className="group flex items-center justify-between gap-3 border border-cream/40 text-cream rounded-full px-7 py-4 btn-press hover:bg-cream/10 transition">
                      <span className="eyebrow">(929) 216-7775</span>
                      <span>↗</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
