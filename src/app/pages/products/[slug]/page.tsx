'use client';

import { Header, Footer, AnnouncementBar, Section } from '@/components';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  name: string;
  slug: string;
  price: number;
  compareAtPrice?: number;
  imagePaths: string[];
  category: string;
  fullDescription: string;
  variants?: Array<{
    name: string;
    price: number;
    sku: string;
  }>;
  availability: string;
  badges: string[];
}

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    async function loadProduct() {
      try {
        const res = await fetch(`/api/products/${slug}`);
        if (!res.ok) {
          setError('Product not found');
          setLoading(false);
          return;
        }
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError('Failed to load product');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      loadProduct();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-transparent">
        <AnnouncementBar />
        <Header />
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <p className="text-ink/70">Loading...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    notFound();
  }

  const currentVariant = product.variants?.[selectedVariant];

  return (
    <div className="min-h-screen flex flex-col bg-transparent">
      <AnnouncementBar />
      <Header />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <div className="mb-8 flex items-center gap-2 text-sm text-ink/70">
            <Link href="/collections/all" className="hover:text-ink">
              Shop
            </Link>
            <span>/</span>
            <Link href={`/collections/${product.category}`} className="hover:text-ink">
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-ink">{product.name}</span>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Images */}
            <div className="space-y-4">
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-bone">
                {product.imagePaths[selectedImage] && (
                  <Image
                    src={product.imagePaths[selectedImage]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                )}
              </div>
              {product.imagePaths.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.imagePaths.map((path, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`relative aspect-square overflow-hidden rounded-lg ${
                        selectedImage === idx ? 'ring-2 ring-rose-600' : 'ring-1 ring-gray-200'
                      }`}
                    >
                      <Image
                        src={path}
                        alt={`${product.name} ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="space-y-8">
              <div>
                <p className="text-sm text-ink/50 uppercase tracking-widest mb-2">
                  {product.category}
                </p>
                <h1 className="text-3xl md:text-4xl font-light mb-4">
                  {product.name}
                </h1>

                {/* Price */}
                <div className="mb-6">
                  {currentVariant ? (
                    <div>
                      <p className="text-3xl font-semibold text-ink">
                        ${currentVariant.price.toFixed(2)}
                      </p>
                      {product.compareAtPrice && product.compareAtPrice > currentVariant.price && (
                        <p className="text-lg text-ink/50 line-through">
                          ${product.compareAtPrice.toFixed(2)}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-3xl font-semibold text-ink">
                      ${product.price.toFixed(2)}
                    </p>
                  )}
                </div>

                {/* Availability */}
                <div className="mb-6">
                  <span
                    className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
                      product.availability === 'available'
                        ? 'bg-green-50 text-green-700'
                        : 'bg-red-50 text-red-700'
                    }`}
                  >
                    {product.availability === 'available' ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>

              {/* Variants */}
              {product.variants && product.variants.length > 1 && (
                <div>
                  <label className="block text-sm font-medium text-ink mb-3">
                    Size
                  </label>
                  <div className="space-y-2">
                    {product.variants.map((variant, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedVariant(idx)}
                        className={`w-full px-4 py-3 text-left rounded-lg border-2 transition ${
                          selectedVariant === idx
                            ? 'border-rose-600 bg-bone'
                            : 'border-ink/15 hover:border-ink/25'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{variant.name}</span>
                          <span className="text-ink/70">${variant.price.toFixed(2)}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="space-y-3 pt-6">
                <button
                  disabled={product.availability !== 'available'}
                  className="w-full px-6 py-4 bg-oxblood text-white font-medium rounded-lg hover:bg-ink transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {product.availability === 'available' ? 'Add to Cart' : 'Out of Stock'}
                </button>
                <a
                  href="tel:(929) 216-7775"
                  className="block text-center px-6 py-4 border-2 border-gray-900 text-ink font-medium rounded-lg hover:bg-bone/60 transition"
                >
                  Call (929) 216-7775
                </a>
              </div>

              {/* Description */}
              <div className="pt-6 border-t border-ink/15">
                <h3 className="text-lg font-light mb-4">About This Arrangement</h3>
                <p className="text-ink/80 leading-relaxed">
                  {product.fullDescription}
                </p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-ink/15">
                <div>
                  <p className="text-sm text-ink/70 mb-1">Same-Day Delivery</p>
                  <p className="font-medium">Available</p>
                </div>
                <div>
                  <p className="text-sm text-ink/70 mb-1">Local Delivery Area</p>
                  <p className="font-medium">Staten Island, NY</p>
                </div>
                <div>
                  <p className="text-sm text-ink/70 mb-1">Order Before</p>
                  <p className="font-medium">1:00 PM</p>
                </div>
                <div>
                  <p className="text-sm text-ink/70 mb-1">Delivery Fee</p>
                  <p className="font-medium">$15.00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
