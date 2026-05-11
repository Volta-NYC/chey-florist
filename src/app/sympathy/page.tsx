'use client';

import { Header, Footer, AnnouncementBar, Section, ProductCard } from '@/components';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Product {
  name: string;
  slug: string;
  price: number;
  imagePaths: string[];
  category: string;
}

export default function SympathyPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch('/api/products?limit=12');
        const data = await res.json();
        // Filter for sympathy-related products
        const sympathy = data.filter((p: any) => 
          p.category.toLowerCase().includes('sympathy') || 
          p.category.toLowerCase().includes('casket') ||
          p.category.toLowerCase().includes('spray')
        ).slice(0, 6);
        setProducts(sympathy.length > 0 ? sympathy : data.slice(0, 6));
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <AnnouncementBar />
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <div className="relative h-[400px] md:h-[500px] overflow-hidden mb-16">
          <Image
            src="/media/ef-sympathy-bouquet-fts-326a94947d.webp"
            alt="Sympathy flowers"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-4xl md:text-5xl font-light text-white mb-4">
              Sympathy & Funeral Flowers
            </h1>
            <p className="text-lg text-white/90 max-w-2xl">
              Honor your loved one with thoughtfully arranged sympathy flowers
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Content */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-light mb-6">Expressing Sympathy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                During times of loss, flowers provide comfort and express care. 
                When you order funeral flowers from Chey Florist, our skilled and compassionate 
                florist will work directly with the funeral home to ensure that your delivery is
                timely and accurate.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                We offer same-day delivery for sympathy arrangements. Please call (929) 216-7775 for assistance.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Funeral flowers are sent to a church service or funeral home to 
                honor the departed's religious or cultural beliefs with appropriate arrangements
                for a viewing, wake, funeral, cremation, or graveside service.
              </p>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <Image
                src="/media/ef-sympathy-spray-wreath-fts-116be2a707.webp"
                alt="Sympathy wreath"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Featured Products */}
          {!loading && products.length > 0 && (
            <Section title="Featured Sympathy Arrangements">
              <div className="grid md:grid-cols-3 gap-8">
                {products.slice(0, 3).map((product: Product) => (
                  <ProductCard
                    key={product.slug}
                    name={product.name}
                    slug={product.slug}
                    price={product.price}
                    imagePath={product.imagePaths?.[0] || '/media/placeholder.webp'}
                    category={product.category}
                  />
                ))}
              </div>
            </Section>
          )}

          {/* CTA */}
          <div className="bg-rose-50 rounded-2xl px-8 md:px-12 py-12 text-center mb-16">
            <h3 className="text-2xl font-light mb-4">
              Let Us Help Honor Your Loved One
            </h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Our compassionate florists are here to help you create the perfect
              arrangement. Same-day delivery available.
            </p>
            <a
              href="tel:(929) 216-7775"
              className="inline-block px-8 py-3 bg-rose-600 text-white font-medium rounded-lg hover:bg-rose-700 transition"
            >
              Call (929) 216-7775
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
