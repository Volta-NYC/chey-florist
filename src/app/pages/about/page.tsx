'use client';

import { Header, Footer, AnnouncementBar } from '@/components';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-transparent">
      <AnnouncementBar />
      <Header />

      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-light mb-4">About Chey Florist</h1>
            <p className="text-xl text-ink/70">
              Premium floral design in Staten Island since the beginning
            </p>
          </div>

          {/* Main Content */}
          <div className="prose prose-lg max-w-none mb-16">
            <h2 className="text-2xl font-light mb-6">Our Story</h2>
            <p className="mb-6 text-ink/80 leading-relaxed">
              Chey Florist proudly serves the Staten Island area with a commitment to providing great customer service, the finest floral arrangements, beautiful floral designs, gift baskets, and much more.
            </p>
            <p className="mb-6 text-ink/80 leading-relaxed">
              Our customers are important to us, and our friendly staff is dedicated to making your experience a pleasant one. We will always go the extra mile to make your floral gift perfect.
            </p>

            <h2 className="text-2xl font-light mb-6 mt-12">What We Offer</h2>
            <ul className="space-y-4 text-ink/80 mb-6">
              <li className="flex gap-3">
                <span className="text-oxblood font-bold">•</span>
                <span>Large inventory of fresh flowers for any occasion</span>
              </li>
              <li className="flex gap-3">
                <span className="text-oxblood font-bold">•</span>
                <span>Birthday, Get Well, Anniversary, and all occasion flowers</span>
              </li>
              <li className="flex gap-3">
                <span className="text-oxblood font-bold">•</span>
                <span>Modern and traditional flower arrangements</span>
              </li>
              <li className="flex gap-3">
                <span className="text-oxblood font-bold">•</span>
                <span>Custom arrangements and gift baskets</span>
              </li>
              <li className="flex gap-3">
                <span className="text-oxblood font-bold">•</span>
                <span>Weddings, events, and sympathy services</span>
              </li>
              <li className="flex gap-3">
                <span className="text-oxblood font-bold">•</span>
                <span>Local and nationwide delivery</span>
              </li>
            </ul>

            <h2 className="text-2xl font-light mb-6 mt-12">Why Choose Us?</h2>
            <p className="mb-6 text-ink/80 leading-relaxed">
              At Chey Florist, we believe that fresh flowers deserve expert care. Every arrangement is hand-crafted by our skilled florists with premium blooms. We personally arrange and deliver flowers locally in Staten Island, ensuring your recipient receives beautiful, fresh flowers with a personal touch.
            </p>
            <p className="text-ink/80 leading-relaxed">
              Whether it's a special occasion or a last-minute gift, Chey Florist is here to help make the moment memorable with stunning floral design.
            </p>

            <h2 className="text-2xl font-light mb-6 mt-12">Delivery Information</h2>
            <p className="mb-4 text-ink/80 leading-relaxed">
              We provide local delivery with a $15.00 delivery fee for each address in our service area.
            </p>
            <ul className="space-y-3 text-ink/80 mb-6">
              <li><strong>Same-Day Delivery:</strong> Orders must be received before 1:00 PM in the recipient's time zone</li>
              <li><strong>Service Area:</strong> All of Staten Island, NY including area hospitals and funeral homes</li>
              <li><strong>Operating Hours:</strong> Sunday 9 AM – 4 PM; Monday-Tuesday, Thursday 10 AM – 6 PM; Friday-Saturday 10 AM – 7 PM; Wednesday Closed</li>
            </ul>
          </div>

          {/* CTA Section */}
          <div className="bg-bone/60 rounded-2xl px-8 md:px-12 py-12 text-center">
            <h3 className="text-2xl font-light mb-4">Ready to Order?</h3>
            <p className="text-ink/70 mb-6">
              Browse our collection or contact us for custom orders and personalized recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/collections/all"
                className="px-8 py-3 bg-oxblood text-white font-medium rounded-lg hover:bg-ink transition"
              >
                Shop Flowers
              </Link>
              <a
                href="tel:(929) 216-7775"
                className="px-8 py-3 border border-gray-900 text-ink font-medium rounded-lg hover:bg-bone/60 transition"
              >
                Call (929) 216-7775
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
