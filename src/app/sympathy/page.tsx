'use client';

import React from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AnnouncementBar } from '@/components/announcement-bar';
import { Section } from '@/components/section';
import { ProductCard } from '@/components/product-card';

const products = [
  { id: '1', name: 'White Serenity Wreath', price: 185, image: 'https://images.unsplash.com/photo-1594910413521-026858a74136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'A peaceful tribute for services.' },
  { id: '2', name: 'Peaceful Lilies', price: 120, image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', description: 'Graceful white lilies for comfort.' },
  { id: '3', name: 'Memory Basket', price: 95, image: 'https://images.unsplash.com/photo-1519336367661-eba9c1dfa5e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Warm colors to remember a loved one.' },
];

export default function SympathyPage() {
  return (
    <main className="min-h-screen bg-white">
      <AnnouncementBar />
      <Header />
      
      <Section title="" className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif mb-6">Sympathy & Funeral Flowers</h1>
          <p className="text-gray-600 text-lg mb-12">
            Express your deepest condolences with our collection of elegant and respectful floral arrangements. We handle every sympathy order with care and compassion.
          </p>
        </div>
      </Section>

      <Section title="" className="pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard 
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>
      </Section>

      <Section title="" className="bg-stone-50 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-serif mb-6">Custom Tributes</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            For specific requests or custom funeral pieces, please contact our studio directly. We work closely with local funeral homes to ensure timely and respectful delivery.
          </p>
          <a href="/contact" className="inline-block border-b-2 border-black pb-1 font-medium hover:text-gray-600 transition-colors">
            Inquire About Custom Services
          </a>
        </div>
      </Section>

      <Footer />
    </main>
  );
}
