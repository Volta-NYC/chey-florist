'use client';

import React from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AnnouncementBar } from '@/components/announcement-bar';
import { Section } from '@/components/section';

export default function DeliveryPage() {
  return (
    <main className="min-h-screen bg-white">
      <AnnouncementBar />
      <Header />
      
      <Section title="" className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif mb-6">Delivery Information</h1>
          <p className="text-gray-600 text-lg mb-12">
            Fresh blooms, delivered with care to your doorstep.
          </p>
        </div>
      </Section>

      <Section title="" className="pb-24">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-serif mb-6">Same-Day Delivery</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We offer same-day delivery for all orders placed before 1:00 PM local time. This ensures that our florists have enough time to hand-craft your arrangement and our delivery team can reach the destination while the flowers are at their freshest.
              </p>
              <p className="text-gray-600 leading-relaxed">
                For orders placed after 1:00 PM, we offer guaranteed next-day delivery. If you have an urgent request, please call our studio and we will do our best to accommodate you.
              </p>
            </div>
            <div className="h-80 bg-stone-100 overflow-hidden">
               <img 
                src="https://images.unsplash.com/photo-1549490349-8643362247b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                alt="Flower Delivery" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border border-stone-200 p-8">
              <h3 className="font-serif text-xl mb-4">Delivery Area</h3>
              <p className="text-gray-600 text-sm">
                We deliver to all addresses within a 25-mile radius of our Manhattan studio, including Brooklyn, Queens, and parts of Jersey City.
              </p>
            </div>
            <div className="border border-stone-200 p-8">
              <h3 className="font-serif text-xl mb-4">Delivery Fees</h3>
              <p className="text-gray-600 text-sm">
                Standard local delivery is $15. Delivery fees for outer zones are calculated at checkout based on the destination zip code.
              </p>
            </div>
            <div className="border border-stone-200 p-8">
              <h3 className="font-serif text-xl mb-4">Care on Arrival</h3>
              <p className="text-gray-600 text-sm">
                Our arrangements are delivered in water or with a hydration source to ensure they remain beautiful during transport and upon arrival.
              </p>
            </div>
          </div>

          <div className="bg-stone-50 p-12 text-center">
            <h2 className="text-2xl font-serif mb-4">Tracking Your Delivery</h2>
            <p className="text-gray-600 mb-0">
              Once your order has been hand-crafted and is on its way, you will receive a confirmation email with a photo of the actual arrangement and an estimated delivery time.
            </p>
          </div>
        </div>
      </Section>

      <Footer />
    </main>
  );
}
