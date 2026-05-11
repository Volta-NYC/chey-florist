'use client';

import { Header, Footer, AnnouncementBar, Section, ProductCard } from '@/components';
import Image from 'next/image';
import Link from 'next/link';
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
        const res = await fetch('/api/products?category=casket-sprays&limit=12');
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-transparent">
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
              <p className="text-ink/80 leading-relaxed mb-4">
                During times of loss, flowers provide comfort and express care. When you order funeral flowers from Chey Florist, our skilled and compassionate florist will work directly with the funeral home to ensure that your delivery is timely and accurate.
              </p>
              <p className="text-ink/80 leading-relaxed mb-4">
                We offer same-day delivery for sympathy arrangements. Please call (929) 216-7775 for assistance.
              </p>
              <p className="text-ink/80 leading-relaxed">
                Funeral flowers are sent to a church service or funeral home to honor the departed's religious or cultural beliefs with appropriate arrangements for a viewing, wake, funeral, cremation, or graveside service.
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

          {/* Types of Arrangements */}
          <Section title="Types of Sympathy Arrangements">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="text-lg font-light mb-3">Casket Sprays</h3>
                <p className="text-ink/70">
                  Elegant arrangements placed on top of the casket during services
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-light mb-3">Wreaths & Tributes</h3>
                <p className="text-ink/70">
                  Beautiful standing wreaths for display at services
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-light mb-3">Sympathy Bouquets</h3>
                <p className="text-ink/70">
                  Delivered to the family's home for ongoing comfort
                </p>
              </div>
            </div>
          </Section>

          {/* Featured Products */}
          {!loading && products.length > 0 && (
            <Section title="Featured Sympathy Arrangements">
              <div className="grid md:grid-cols-4 gap-8">
                {products.slice(0, 4).map((product) => (
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
              <div className="text-center mt-12">
                <Link
                  href="/collections/sympathy"
                  className="inline-block px-8 py-3 border border-gray-900 text-ink rounded-lg hover:bg-bone/60 transition"
                >
                  View All Sympathy Arrangements
                </Link>
              </div>
            </Section>
          )}

          {/* Hospital & Funeral Home Info */}
          <div className="grid md:grid-cols-2 gap-8 my-16">
            <div className="bg-bone/60 rounded-2xl p-8">
              <h3 className="text-xl font-light mb-4">Hospital Delivery</h3>
              <p className="text-sm text-ink/70 mb-4">
                We deliver to the following hospitals:
              </p>
              <ul className="space-y-2 text-sm text-ink/80">
                <li>• Richmond University Medical Center</li>
                <li>• Bayley Seton Hospital</li>
                <li>• Richmond Center for Rehab and Specialty Healthcare</li>
              </ul>
            </div>
            <div className="bg-bone/60 rounded-2xl p-8">
              <h3 className="text-xl font-light mb-4">Funeral Home Delivery</h3>
              <p className="text-sm text-ink/70 mb-4">
                We deliver to the following funeral homes:
              </p>
              <ul className="space-y-2 text-sm text-ink/80">
                <li>• John Vincent Scalia Home for Funerals</li>
                <li>• Casey McCallum Rice South Shore Funeral Home</li>
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-bone rounded-2xl px-8 md:px-12 py-12 text-center mb-16">
            <h3 className="text-2xl font-light mb-4">
              Let Us Help Honor Your Loved One
            </h3>
            <p className="text-ink/80 mb-6 max-w-2xl mx-auto">
              Our compassionate florists are here to help you create the perfect arrangement. Same-day delivery available.
            </p>
            <a
              href="tel:(929) 216-7775"
              className="inline-block px-8 py-3 bg-oxblood text-white font-medium rounded-lg hover:bg-ink transition"
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
