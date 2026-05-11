'use client';

import { Header, Footer, AnnouncementBar, Section, ProductCard } from '@/components';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Product {
  name: string;
  slug: string;
  price: number;
  imagePaths: string[];
  category: string;
}

export default function AllProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 20;

  useEffect(() => {
    async function loadProducts() {
      try {
        const query = searchTerm ? `/api/products?q=${encodeURIComponent(searchTerm)}&limit=100` : '/api/products?limit=100';
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

  const paginatedProducts = products.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <AnnouncementBar />
      <Header />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-light mb-4">
              All Arrangements
            </h1>
            <p className="text-lg text-gray-600">
              Browse our complete collection of fresh flower arrangements
            </p>
          </div>

          {/* Search */}
          <div className="mb-12">
            <input
              type="text"
              placeholder="Search arrangements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-600 focus:border-transparent"
            />
          </div>

          {/* Results count */}
          <p className="text-gray-600 mb-8">
            Showing {paginatedProducts.length} of {products.length} arrangements
          </p>

          {/* Products Grid */}
          {!loading && paginatedProducts.length > 0 ? (
            <>
              <div className="grid md:grid-cols-4 gap-8 mb-12">
                {paginatedProducts.map((product) => (
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

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`px-4 py-2 rounded-lg transition ${
                        page === p
                          ? 'bg-rose-600 text-white'
                          : 'border border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-600 text-lg">
                {loading ? 'Loading...' : 'No products found.'}
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
