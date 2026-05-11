import type { Product } from "./types"

const NOISE =
  /balloon|bear|chocolate|paypal|delivery\.png|instagram|social-media-icons|teleflora_proudmember|paypal-checkout/i

export function primaryProductImage(product: Product): string | undefined {
  return product.imagePaths.find((path) => !NOISE.test(path))
}

export function collectionCoverImage(paths: string[]): string | undefined {
  return paths.find((path) => !NOISE.test(path))
}
