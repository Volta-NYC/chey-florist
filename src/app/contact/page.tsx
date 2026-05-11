'use client';

import React from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AnnouncementBar } from '@/components/announcement-bar';
import { Section } from '@/components/section';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <AnnouncementBar />
      <Header />
      
      <Section className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif mb-6">Contact Us</h1>
          <p className="text-gray-600 text-lg mb-12">
            We'd love to hear from you. Whether you have a question about our arrangements, delivery, or a special event, our team is here to help.
          </p>
        </div>
      </Section>

      <Section className="pb-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-2xl font-serif mb-6">Get in Touch</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input type="text" id="first-name" className="w-full border-gray-300 border p-3 focus:ring-black focus:border-black" />
                </div>
                <div>
                  <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input type="text" id="last-name" className="w-full border-gray-300 border p-3 focus:ring-black focus:border-black" />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" id="email" className="w-full border-gray-300 border p-3 focus:ring-black focus:border-black" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea id="message" rows={6} className="w-full border-gray-300 border p-3 focus:ring-black focus:border-black"></textarea>
              </div>
              <button type="submit" className="bg-black text-white px-8 py-3 hover:bg-gray-800 transition-colors">
                Send Message
              </button>
            </form>
          </div>

          <div className="bg-stone-50 p-8 md:p-12">
            <h2 className="text-2xl font-serif mb-8">Visit Our Studio</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="font-semibold text-sm uppercase tracking-wider mb-2">Location</h3>
                <p className="text-gray-600">123 Floral Lane<br />Garden District, NY 10001</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-sm uppercase tracking-wider mb-2">Hours</h3>
                <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM<br />Saturday: 10:00 AM - 4:00 PM<br />Sunday: Closed</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-sm uppercase tracking-wider mb-2">Contact Info</h3>
                <p className="text-gray-600">
                  Email: hello@cheyflorist.com<br />
                  Phone: (555) 123-4567
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Footer />
    </main>
  );
}
