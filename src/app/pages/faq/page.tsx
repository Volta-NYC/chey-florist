'use client';

import { Header, Footer, AnnouncementBar } from '@/components';
import { useState } from 'react';

const faqs = [
  {
    question: 'What areas do you deliver to?',
    answer: 'We provide same-day local delivery throughout Staten Island, NY. We also offer nationwide delivery through our reliable florist network. A local delivery fee of $15.00 will be added to each order for each address in our local delivery area.',
  },
  {
    question: 'Do you deliver to hospitals?',
    answer: 'Yes! We deliver to Richmond University Medical Center, Bayley Seton Hospital, and Richmond Center for Rehab and Specialty Healthcare. For other hospitals, please call us at (929) 216-7775 to confirm delivery availability.',
  },
  {
    question: 'Do you deliver to funeral homes?',
    answer: 'Yes, we deliver to John Vincent Scalia Home for Funerals and Casey McCallum Rice South Shore Funeral Home. For other funeral homes, please contact us to arrange delivery.',
  },
  {
    question: 'Can I get same-day delivery?',
    answer: 'Yes! U.S. orders must be received before 1:00 PM in the recipient\'s time zone to assure same-day delivery. Orders received after that time will be delivered the following day.',
  },
  {
    question: 'Do you deliver on Sundays?',
    answer: 'We are unable to make deliveries on Sundays. Deliveries requested on this day will be delivered the following business day.',
  },
  {
    question: 'Can I specify a delivery time?',
    answer: 'We will do our best to accommodate deliveries at specific times of day, but we cannot guarantee a specific time window. We deliver during our business hours.',
  },
  {
    question: 'Can you deliver to cemeteries?',
    answer: 'Delivery of orders to cemeteries cannot be guaranteed. Please call us at (929) 216-7775 to discuss your specific needs.',
  },
  {
    question: 'Do you offer custom arrangements?',
    answer: 'Absolutely! We specialize in custom arrangements tailored to your specific needs, budget, and preferences. Call us at (929) 216-7775 to discuss your custom order.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept major credit cards, PayPal, and other secure payment methods through our online checkout. For phone orders, we also accept credit cards and other payment options.',
  },
  {
    question: 'Can I order flowers for a wedding or event?',
    answer: 'Yes! We offer comprehensive wedding and event floral services. Contact us at (929) 216-7775 to discuss your event florals and schedule a consultation.',
  },
  {
    question: 'Do you offer corporate orders or bulk discounts?',
    answer: 'Yes, we\'re happy to discuss corporate orders and volume pricing. Please call us at (929) 216-7775 for more information.',
  },
  {
    question: 'What is your refund policy?',
    answer: 'We stand behind the quality of our arrangements. If you\'re not satisfied with your order, please contact us immediately at (929) 216-7775 to discuss options.',
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col bg-transparent">
      <AnnouncementBar />
      <Header />

      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-light mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-ink/70">
              Find answers to common questions about our service
            </p>
          </div>

          {/* FAQs */}
          <div className="space-y-4 mb-16">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-ink/15 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-bone/60 transition"
                >
                  <h3 className="font-light text-lg text-ink">{faq.question}</h3>
                  <svg
                    className={`w-5 h-5 text-ink/70 transition-transform ${
                      openIndex === index ? 'transform rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </button>
                {openIndex === index && (
                  <div className="px-6 py-4 bg-bone/60 border-t border-ink/15">
                    <p className="text-ink/80 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="bg-bone/60 rounded-2xl px-8 md:px-12 py-12 text-center">
            <h3 className="text-2xl font-light mb-4">Didn't find your answer?</h3>
            <p className="text-ink/70 mb-6">
              Our team is happy to help. Reach out to us directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:(929) 216-7775"
                className="px-8 py-3 bg-oxblood text-white font-medium rounded-lg hover:bg-ink transition"
              >
                Call (929) 216-7775
              </a>
              <a
                href="mailto:cheyflorist509@gmail.com"
                className="px-8 py-3 border border-gray-900 text-ink font-medium rounded-lg hover:bg-bone/60 transition"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
