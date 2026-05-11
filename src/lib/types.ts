export type ProductVariant = {
  name: string
  price: number
  sku: string
}

export type Product = {
  name: string
  slug: string
  category: string
  subcategory: string
  price: number | null
  compareAtPrice: number | null
  availability: string
  badges: string[]
  fullDescription: string
  variants: ProductVariant[]
  imagePaths: string[]
  sourcePageUrl: string
  sourceMarkdownFile: string
}

export type Collection = {
  name: string
  slug: string
  description: string
  type: "general" | "seasonal" | "sympathy" | "wedding"
  imagePaths: string[]
  productSlugs: string[]
  sourcePageUrl: string
  sourceMarkdownFile: string
}

export type PageRecord = {
  title: string
  slug: string
  pageType: string
  url: string
  sourceMarkdownFile: string
  content: string[]
  imagePaths?: string[]
}

export type Business = {
  name: string
  branding: { style: string }
  address: string
  phones: string[]
  emails: string[]
  hours: Record<string, string>
  serviceArea: string
  homepageCopy: string[]
  promotions: { text: string; source: string }[]
  social: { instagram: string }
}
