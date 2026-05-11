'use client';

import React from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AnnouncementBar } from '@/components/announcement-bar';
import { Section } from '@/components/section';

export default function WeddingEventsPage() {
  return (
    <main className="min-h-screen bg-white">
      <AnnouncementBar />
      <Header />
      
      <Section className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif mb-6">Weddings & Events</h1>
          <p className="text-gray-600 text-lg mb-12">
            Elevating your special moments with bespoke floral design and artistic curation.
          </p>
        </div>
      </Section>

      <Section className="pb-24">
        <div className="max-w-6xl mx-auto space-y-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
               <img 
                src="https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                alt="Wedding Florals" 
                className="w-full aspect-[4/5] object-cover shadow-sm"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-serif mb-6">Wedding Design</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                From intimate elopements to grand celebrations, we specialize in creating a cohesive floral story for your wedding day. Our approach is collaborative, detail-oriented, and inspired by nature's effortless beauty.
              </p>
              <ul className="space-y-3 text-gray-600 mb-8 list-disc pl-5">
                <li>Bespoke Bridal Bouquets</li>
                <li>Ceremony Installations & Arches</li>
                <li>Reception Centerpieces</li>
                <li>Full-service Setup & Strike</li>
              </ul>
              <a href="/contact" className="inline-block bg-black text-white px-8 py-3 hover:bg-gray-800 transition-colors">
                Book a Consultation
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-serif mb-6">Corporate & Private Events</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Make your event unforgettable with our signature floral designs. Whether it's a product launch, gala, dinner party, or holiday celebration, we provide aesthetic solutions that align with your brand or personal vision.
              </p>
              <ul className="space-y-3 text-gray-600 mb-8 list-disc pl-5">
                <li>Custom Event Installations</li>
                <li>Table Styling & Florals</li>
                <li>Weekly Office Subscriptions</li>
                <li>Gifting Programs</li>
              </ul>
            </div>
             <div>
               <img 
                src="https://images.unsplash.com/photo-1464366442605-5e70df5144ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                alt="Event Florals" 
                className="w-full aspect-[4/5] object-cover shadow-sm"
              />
            </div>
          </div>

          <div className="bg-stone-50 p-12 md:p-20 text-center">
            <h2 className="text-3xl font-serif mb-6">Our Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
              <div>
                <div className="text-2xl font-serif mb-4">01</div>
                <h3 className="font-semibold mb-2 uppercase tracking-wide text-sm">Consultation</h3>
                <p className="text-gray-600 text-sm">We begin with a conversation about your vision, color palette, and preferred styles.</p>
              </div>
              <div>
                <div className="text-2xl font-serif mb-4">02</div>
                <h3 className="font-semibold mb-2 uppercase tracking-wide text-sm">Proposal</h3>
                <p className="text-gray-600 text-sm">We provide a visual mood board and transparent pricing for your review.</p>
              </div>
              <div>
                <div className="text-2xl font-serif mb-4">03</div>
                <h3 className="font-semibold mb-2 uppercase tracking-wide text-sm">Execution</h3>
                <p className="text-gray-600 text-sm">Our team handles all floral logistics, ensuring every detail is perfect on the day.</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Footer />
    </main>
  );
}
