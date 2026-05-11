'use client';

import { Header, Footer, AnnouncementBar, ProductCard } from '@/components';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';

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
  description: string;
  type: string;
  products: Product[];
}

export default function CollectionPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [collection, setCollection] = useState<Collection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCollection() {
      try {
        const res = await fetch(`/api/collections/${slug}`);
        if (!res.ok) {
          setError('Collection not found');
          setLoading(false);
          return;
        }
        const data = await res.json();
        setCollection(data);
      } catch (err) {
        setError('Failed to load collection');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (slug) loadCollection();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <AnnouncementBar />
        <Header />
        <main className="flex-1 max-w-[1400px] mx-auto px-6 lg:px-10 py-32">
          <p className="eyebrow text-ink/50 animate-pulse">Gathering compositions…</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !collection) notFound();

  const count = collection.products?.length ?? 0;
  const prettyName = collection.name.replace(/&/g, '&');

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />

      <main className="flex-1">
        {/* Editorial header */}
        <section className="border-b border-ink/15 pt-20 pb-16">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <div className="eyebrow text-ink/50 mb-8 flex items-center gap-3">
              <Link href="/" className="link-edit">Home</Link>
              <span>/</span>
              <Link href="/collections/all" className="link-edit">Atelier</Link>
              <span>/</span>
              <span className="text-ink">{prettyName}</span>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-8">
                <div className="eyebrow text-gold mb-5 flex items-center gap-3">
                  <span>Collection</span>
                  <span className="w-10 h-px bg-ink/40" />
                  <span>{count} {count === 1 ? 'composition' : 'compositions'}</span>
                </div>
                <h1 className="sd-rise display text-6xl md:text-8xl font-light leading-[0.92] tracking-[-0.02em]">
                  {prettyName.split(' ').map((w, i, arr) =>
                    i === arr.length - 1 && arr.length > 1 ? (
                      <span key={i} className="italiana italic text-moss"> {w}</span>
                    ) : (
                      <span key={i}>{w} </span>
                    ),
                  )}
                </h1>
              </div>
              {collection.description && (
                <p className="sd-rise-soft lg:col-span-4 serif text-lg text-ink/75 leading-relaxed">
                  {collection.description}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Products */}
        <section className="py-20">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            {collection.products && collection.products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                {collection.products.map((product, i) => (
                  <div
                    key={product.slug}
                    style={{ animationDelay: `${(i % 4) * 0.08}s` }}
                    className="sd-rise"
                  >
                    <ProductCard
                      name={product.name}
                      slug={product.slug}
                      price={product.price}
                      imagePath={product.imagePaths?.[0] || '/media/placeholder.webp'}
                      category={product.category}
                      index={i}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-32 text-center">
                <p className="display italic text-3xl text-ink/60 mb-4">The studio is being restocked.</p>
                <p className="serif text-ink/70 mb-8">Call us — we always have more in the cooler than appears online.</p>
                <a href="tel:(929) 216-7775" className="eyebrow border border-ink rounded-full px-6 py-3 inline-block hover:bg-ink hover:text-cream transition-colors">
                  (929) 216-7775
                </a>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
