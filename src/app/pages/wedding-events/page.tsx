'use client';

import { Header, Footer, AnnouncementBar, Section, ProductCard } from '@/components';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Product {
  name: string;
  slug: string;
  price: number | null;
  imagePaths: string[];
  category: string;
}

export default function WeddingEventsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        // Fetch wedding-related products (bouquets, arrangements, etc.)
        const res = await fetch('/api/products?limit=20');
        const data: Product[] = await res.json();
        // Filter to show upscale arrangements
        const filtered = data.filter((p) => 
          (p.price ?? 0) > 50 || p.name.toLowerCase().includes('bouquet') || 
          p.name.toLowerCase().includes('luxury')
        );
        setProducts(filtered.slice(0, 12));
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
            src="/media/ceremony-1-4aa149dfef.webp"
            alt="Wedding flowers"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-4xl md:text-5xl font-light text-white mb-4">
              Weddings & Events
            </h1>
            <p className="text-lg text-white/90 max-w-2xl">
              Stunning floral designs for your special celebration
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Content */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-light mb-6">Celebrate in Style</h2>
              <p className="text-ink/80 leading-relaxed mb-4">
                At Chey Florist, we specialize in creating stunning floral designs for weddings and special events. Our experienced florists work with you to bring your vision to life with beautiful arrangements that complement your celebration.
              </p>
              <p className="text-ink/80 leading-relaxed mb-4">
                From bridal bouquets and bridesmaids' arrangements to ceremony decorations, reception centerpieces, and event installations, we handle every detail with care and expertise.
              </p>
              <p className="text-ink/80 leading-relaxed">
                Let us create a customized floral experience for your wedding or event. Contact us to schedule a consultation.
              </p>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <Image
                src="/media/reception-1-2e46064025.webp"
                alt="Wedding reception flowers"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Services */}
          <Section title="Our Wedding & Event Services">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-light mb-3">Bridal Bouquets</h3>
                <p className="text-ink/70">
                  Custom bridal bouquets designed to complement your dress and wedding style
                </p>
              </div>
              <div>
                <h3 className="text-lg font-light mb-3">Ceremony Flowers</h3>
                <p className="text-ink/70">
                  Beautiful arrangements for the ceremony, from altar flowers to pew arrangements
                </p>
              </div>
              <div>
                <h3 className="text-lg font-light mb-3">Reception Centerpieces</h3>
                <p className="text-ink/70">
                  Stunning centerpieces for tables, bars, and special areas of your venue
                </p>
              </div>
              <div>
                <h3 className="text-lg font-light mb-3">Decorative Installations</h3>
                <p className="text-ink/70">
                  Large-scale floral installations to transform your space
                </p>
              </div>
              <div>
                <h3 className="text-lg font-light mb-3">Corsages & Boutonnieres</h3>
                <p className="text-ink/70">
                  Elegant accessories for the wedding party and special guests
                </p>
              </div>
              <div>
                <h3 className="text-lg font-light mb-3">Event Flowers</h3>
                <p className="text-ink/70">
                  Custom floral designs for any special event or celebration
                </p>
              </div>
            </div>
          </Section>

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
                    imagePath={product.imagePaths?.[0]}
                    category={product.category}
                  />
                ))}
              </div>
              <div className="text-center mt-12">
                <Link
                  href="/collections/all"
                  className="inline-block px-8 py-3 border border-gray-900 text-ink rounded-lg hover:bg-bone/60 transition"
                >
                  Explore All Arrangements
                </Link>
              </div>
            </Section>
          )}

          {/* Consultation CTA */}
          <div className="bg-bone rounded-2xl px-8 md:px-12 py-12 text-center mb-16">
            <h3 className="text-2xl font-light mb-4">Plan Your Perfect Event</h3>
            <p className="text-ink/80 mb-6 max-w-2xl mx-auto">
              Schedule a consultation with our floral designers to discuss your vision and create custom arrangements for your wedding or event.
            </p>
            <a
              href="tel:(929) 216-7775"
              className="inline-block px-8 py-3 bg-oxblood text-white font-medium rounded-lg hover:bg-ink transition"
            >
              Schedule Consultation
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
