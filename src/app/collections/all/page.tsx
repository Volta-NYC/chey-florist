'use client';

import { Header, Footer, AnnouncementBar, ProductCard } from '@/components';
import { useState, useEffect } from 'react';

interface Product {
  name: string;
  slug: string;
  price: number | null;
  imagePaths: string[];
  category: string;
}

export default function AllProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 24;

  useEffect(() => {
    async function loadProducts() {
      try {
        const query = searchTerm
          ? `/api/products?q=${encodeURIComponent(searchTerm)}&limit=200`
          : '/api/products?limit=200';
        const res = await fetch(query);
        const data = await res.json();
        setProducts(data);
        setPage(1);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, [searchTerm]);

  const paginated = products.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />

      <main className="flex-1">
        {/* Header */}
        <section className="border-b border-ink/15 pt-20 pb-14">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <div className="eyebrow text-gold mb-5 flex items-center gap-3">
              <span>The Entire</span>
              <span className="w-10 h-px bg-ink/40" />
              <span>Atelier</span>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <h1 className="sd-rise display text-6xl md:text-8xl font-light leading-[0.92] tracking-[-0.02em]">
                Every <span className="italiana italic text-moss">composition</span>
              </h1>
              <p className="serif text-lg text-ink/70 max-w-md">
                {loading ? 'Gathering compositions…' : `${products.length} arrangements, sorted from the studio bench.`}
              </p>
            </div>
          </div>
        </section>

        {/* Search bar */}
        <section className="border-b border-ink/15 py-6 bg-bone/60">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 flex items-center gap-4">
            <span className="eyebrow text-ink/50 shrink-0">Search</span>
            <input
              type="text"
              placeholder="roses, sympathy, anniversary…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent serif text-xl md:text-2xl text-ink placeholder:text-ink/30 placeholder:italic focus:outline-none py-2"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="eyebrow text-ink/60 hover:text-ink">
                clear
              </button>
            )}
          </div>
        </section>

        {/* Grid */}
        <section className="py-20">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            {!loading && paginated.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                  {paginated.map((product, i) => (
                    <div key={product.slug} style={{ animationDelay: `${(i % 4) * 0.08}s` }} className="sd-rise">
                      <ProductCard
                        name={product.name}
                        slug={product.slug}
                        price={product.price}
                        imagePath={product.imagePaths?.[0]}
                        category={product.category}
                        index={(page - 1) * itemsPerPage + i}
                      />
                    </div>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="mt-20 flex flex-wrap items-center justify-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`eyebrow w-10 h-10 rounded-full border transition-colors ${
                          page === p
                            ? 'bg-ink text-cream border-ink'
                            : 'border-ink/30 text-ink/70 hover:border-ink hover:text-ink'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="py-32 text-center">
                <p className="display italic text-3xl text-ink/60">
                  {loading ? 'Gathering compositions…' : 'No arrangements match that search.'}
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
