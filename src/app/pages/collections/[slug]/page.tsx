'use client';

import { Header, Footer, AnnouncementBar, Section, ProductCard } from '@/components';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';

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

    if (slug) {
      loadCollection();
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

  if (error || !collection) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-transparent">
      <AnnouncementBar />
      <Header />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-light mb-4">
              {collection.name}
            </h1>
            {collection.description && (
              <p className="text-lg text-ink/70 max-w-2xl">
                {collection.description}
              </p>
            )}
            <p className="text-sm text-ink/50 mt-4">
              {collection.products?.length || 0} products
            </p>
          </div>

          {/* Products Grid */}
          {collection.products && collection.products.length > 0 ? (
            <div className="grid md:grid-cols-4 gap-8">
              {collection.products.map((product) => (
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
          ) : (
            <div className="text-center py-20">
              <p className="text-ink/70 text-lg">
                No products found in this collection.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
