'use client';

import { Header, Footer, HeroBanner, Section, ProductCard, CollectionCard, AnnouncementBar } from '@/components';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Product {
  name: string;
  slug: string;
  price: number;
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
  const [collections, setCollections] = useState<Collection[]>([]);
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

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <AnnouncementBar />
      <Header />

      {/* Hero Banner */}
      <HeroBanner
        title="Fresh Flowers for Every Occasion"
        subtitle="Hand-arranged with passion. Delivered fresh to Staten Island."
        imagePath="/media/43475100-chey-florist-18a0d1d1f5.webp"
        ctaText="Shop Now"
        ctaLink="/collections/all"
      />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* About Section */}
          <Section
            title="Premium Floral Design in Staten Island"
            subtitle="For over a decade, Chey Florist has been crafting beautiful arrangements for every special moment"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="prose prose-sm max-w-none">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  When you shop flowers with Chey Florist, you'll see beautiful bouquet arrangements of flowers hand-crafted with passion, attention to detail, and great care.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  We're committed to creating beautiful flower arrangements and floral gifts for any occasion—from Anniversary and Birthday flowers, to Valentine's and Mother's Day flowers.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  As a top florist in Staten Island, each arrangement gets the time and personalized attention it deserves. We hand-arrange all bouquets in-house and personally deliver them locally.
                </p>
              </div>
              <div className="relative h-96 rounded-2xl overflow-hidden">
                <Image
                  src="/media/dod-cat-banner-mothers-day-845b64e123.webp"
                  alt="Chey Florist arrangements"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </Section>

          {/* Features */}
          <section className="py-16 md:py-20 border-t border-b border-gray-200">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  <svg className="w-12 h-12 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-light mb-2">Hand-Arranged Fresh Flowers</h3>
                <p className="text-gray-600">Every arrangement is crafted by our skilled florists with premium, fresh blooms</p>
              </div>
              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  <svg className="w-12 h-12 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-light mb-2">Same-Day Local Delivery</h3>
                <p className="text-gray-600">We deliver fresh arrangements directly to your recipient in Staten Island</p>
              </div>
              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  <svg className="w-12 h-12 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-light mb-2">Competitive Pricing</h3>
                <p className="text-gray-600">Transparent pricing with no hidden fees. Quality flowers at fair prices</p>
              </div>
            </div>
          </section>

          {/* Featured Products */}
          {!loading && products.length > 0 && (
            <Section title="Featured Arrangements">
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
                  href="/collections/all"
                  className="inline-block px-8 py-3 border border-gray-900 text-gray-900 rounded-lg hover:bg-gray-50 transition"
                >
                  View All Products
                </Link>
              </div>
            </Section>
          )}

          {/* Collections Grid */}
          {!loading && collections.length > 0 && (
            <Section title="Shop by Occasion">
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { name: 'Birthday Flowers', slug: 'birthday' },
                  { name: 'Anniversary Flowers', slug: 'anniversary' },
                  { name: 'Sympathy & Funeral', slug: 'sympathy' },
                  { name: 'Wedding & Events', slug: 'wedding-events' },
                  { name: 'Valentine\'s Day', slug: 'valentines-day' },
                  { name: 'Mother\'s Day', slug: 'mothers-day' },
                ].map((collection) => (
                  <CollectionCard
                    key={collection.slug}
                    name={collection.name}
                    slug={collection.slug}
                  />
                ))}
              </div>
            </Section>
          )}

          {/* Testimonial/Trust Section */}
          <section className="py-16 md:py-20 bg-gray-50 rounded-2xl px-8 md:px-12 mb-20">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-2xl md:text-3xl font-light mb-6">
                Why Choose Chey Florist?
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                We offer flower delivery in and around Staten Island, as well as nationwide delivery through our reliable florist network. Chey Florist provides same-day flower delivery for your last-minute gift needs.
              </p>
              <div className="flex flex-wrap gap-4 justify-center text-sm text-gray-600">
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-rose-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Fresh Premium Flowers
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-rose-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Expert Florists
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-rose-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Same-Day Delivery
                </span>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 md:py-20 text-center">
            <h3 className="text-2xl md:text-3xl font-light mb-4">
              Ready to Send Fresh Flowers?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Explore our beautiful collection of arrangements or call us for custom orders and personalized recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/collections/all"
                className="px-8 py-3 bg-rose-600 text-white font-medium rounded-lg hover:bg-rose-700 transition"
              >
                Browse Flowers
              </Link>
              <a
                href="tel:(929) 216-7775"
                className="px-8 py-3 border border-gray-900 text-gray-900 font-medium rounded-lg hover:bg-gray-50 transition"
              >
                Call (929) 216-7775
              </a>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
