import type { Business, Collection, PageRecord, Product } from "./types"
import businessJson from "../../data/business.json"
import collectionsJson from "../../data/collections.json"
import pagesJson from "../../data/pages.json"
import productsJson from "../../data/products.json"
import { primaryProductImage } from "./images"

export const business = businessJson as Business
export const products = productsJson as Product[]
export const collections = collectionsJson as Collection[]
export const pages = pagesJson as PageRecord[]

const productBySlug = new Map(products.map((p) => [p.slug, p]))

export function getProductBySlug(slug: string): Product | undefined {
  return productBySlug.get(slug)
}

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug)
}

export function getPageBySlug(slug: string): PageRecord | undefined {
  return pages.find((p) => p.slug === slug)
}

export function getProductsForCollection(slug: string): Product[] {
  const collection = getCollectionBySlug(slug)
  if (!collection) return []
  return collection.productSlugs
    .map((s) => productBySlug.get(s))
    .filter((p): p is Product => Boolean(p))
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase()
  if (!q) return products
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      (p.fullDescription && p.fullDescription.toLowerCase().includes(q)),
  )
}

export function featuredProducts(limit = 10): Product[] {
  const withImage = products.filter((p) => primaryProductImage(p))
  return withImage.slice(0, limit)
}

export function collectionsByType(type: Collection["type"]): Collection[] {
  return collections.filter((c) => c.type === type)
}
