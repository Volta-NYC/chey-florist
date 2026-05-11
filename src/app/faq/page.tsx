'use client';

import React, { useState } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AnnouncementBar } from '@/components/announcement-bar';
import { Section } from '@/components/section';

const faqs = [
  {
    question: "How do I care for my flowers?",
    answer: "To keep your flowers fresh, trim the stems at an angle every 2-3 days, change the water daily, and keep them away from direct sunlight and heat. We also provide a packet of flower food with every delivery."
  },
  {
    question: "Do you offer same-day delivery?",
    answer: "Yes, we offer same-day delivery for orders placed before 1:00 PM local time. After 1:00 PM, we'll do our best to accommodate your request, but next-day delivery is more likely."
  },
  {
    question: "Can I customize an arrangement?",
    answer: "Absolutely! We love creating bespoke arrangements. Please contact us directly or visit our studio to discuss your specific needs and preferences."
  },
  {
    question: "What is your return policy?",
    answer: "Since flowers are perishable, we cannot accept returns. However, if you are not satisfied with the quality of your arrangement, please contact us within 24 hours and we will work to make it right."
  },
  {
    question: "Where do you deliver?",
    answer: "We currently deliver to the greater metropolitan area and surrounding suburbs. Enter your zip code at checkout to confirm if we deliver to your location."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-white">
      <AnnouncementBar />
      <Header />
      
      <Section title="" className="pt-24 pb-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif mb-6">Frequently Asked Questions</h1>
          <p className="text-gray-600 text-lg">
            Everything you need to know about our flowers, delivery, and services.
          </p>
        </div>
      </Section>

      <Section title="" className="pb-24">
        <div className="max-w-3xl mx-auto border-t border-gray-200">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 py-6">
              <button 
                className="flex justify-between items-center w-full text-left focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-lg font-medium">{faq.question}</span>
                <span className="text-2xl ml-4">{openIndex === index ? '−' : '+'}</span>
              </button>
              {openIndex === index && (
                <div className="mt-4 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>

      <Footer />
    </main>
  );
}
