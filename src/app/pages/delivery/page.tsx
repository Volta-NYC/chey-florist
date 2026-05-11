'use client';

import { Header, Footer, AnnouncementBar } from '@/components';
import Link from 'next/link';

export default function DeliveryPage() {
  return (
    <div className="min-h-screen flex flex-col bg-transparent">
      <AnnouncementBar />
      <Header />

      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-light mb-4">Delivery Information</h1>
            <p className="text-xl text-ink/70">
              Fast, reliable delivery for Staten Island and beyond
            </p>
          </div>

          {/* Local Delivery */}
          <div className="space-y-12">
            <section>
              <h2 className="text-3xl font-light mb-6">Local Delivery</h2>
              <div className="bg-bone/60 rounded-2xl p-8 space-y-4 mb-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <svg className="w-6 h-6 text-oxblood" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-ink">Service Area</h3>
                    <p className="text-ink/80">All of Staten Island, NY including area hospitals and funeral homes</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <svg className="w-6 h-6 text-oxblood" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-ink">Local Delivery Fee</h3>
                    <p className="text-ink/80">$15.00 for each address</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <svg className="w-6 h-6 text-oxblood" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-ink">Same-Day Delivery Cutoff</h3>
                    <p className="text-ink/80">Orders must be received before 1:00 PM to assure same-day delivery</p>
                  </div>
                </div>
              </div>
              <p className="text-ink/80">
                We personally deliver fresh arrangements directly to your recipient in Staten Island, ensuring they receive beautiful flowers with a personal touch.
              </p>
            </section>

            {/* Nationwide Delivery */}
            <section className="pt-8 border-t border-ink/15">
              <h2 className="text-3xl font-light mb-6">Nationwide Delivery</h2>
              <div className="bg-blue-50 rounded-2xl p-8 mb-6">
                <p className="text-ink/80">
                  We offer nationwide delivery through our reliable florist network. This allows us to send beautiful fresh flowers to any location in the United States.
                </p>
              </div>
              <p className="text-ink/80">
                For nationwide orders, pricing and delivery times may vary. Contact us for specific delivery details and pricing for locations outside Staten Island.
              </p>
            </section>

            {/* Special Delivery */}
            <section className="pt-8 border-t border-ink/15">
              <h2 className="text-3xl font-light mb-6">Special Deliveries</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-light mb-3">Hospital Delivery</h3>
                  <p className="text-ink/80 mb-3">
                    We deliver to the following hospitals in Staten Island:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-ink/80 ml-2">
                    <li>Richmond University Medical Center</li>
                    <li>Bayley Seton Hospital</li>
                    <li>Richmond Center for Rehab and Specialty Healthcare</li>
                  </ul>
                  <p className="text-sm text-ink/70 mt-3">
                    If your hospital isn't listed, please call us at (929) 216-7775 to confirm delivery availability.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-light mb-3">Funeral Home Delivery</h3>
                  <p className="text-ink/80 mb-3">
                    We deliver to the following funeral homes:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-ink/80 ml-2">
                    <li>John Vincent Scalia Home for Funerals, Inc.</li>
                    <li>Casey McCallum Rice South Shore Funeral Home</li>
                  </ul>
                  <p className="text-sm text-ink/70 mt-3">
                    We deliver to local funeral homes daily. For other funeral homes, please call (929) 216-7775 to arrange delivery.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-light mb-3">Cemetery & Rural Delivery</h3>
                  <p className="text-ink/80">
                    Delivery of orders to cemeteries and rural route addresses cannot be guaranteed. Please contact us to discuss your specific delivery needs.
                  </p>
                </div>
              </div>
            </section>

            {/* Delivery Policies */}
            <section className="pt-8 border-t border-ink/15">
              <h2 className="text-3xl font-light mb-6">Delivery Policies</h2>
              <div className="space-y-4 text-ink/80">
                <p>
                  <strong>Same-Day Delivery:</strong> U.S. orders must be received before 1:00 PM in the recipient's time zone to assure same-day delivery. Orders received after that time will be delivered the following day.
                </p>
                <p>
                  <strong>Specific Times:</strong> We will do our best to accommodate deliveries at specific times of day, but we cannot guarantee a specific time window. We deliver during our regular business hours.
                </p>
                <p>
                  <strong>Sunday Delivery:</strong> We are unable to make deliveries on Sundays. Deliveries requested on this day will be delivered the following business day.
                </p>
                <p>
                  <strong>Delivery Area Changes:</strong> For deliveries outside our local delivery area, delivery fees may vary. Please contact us for pricing details.
                </p>
              </div>
            </section>

            {/* Hours */}
            <section className="pt-8 border-t border-ink/15">
              <h2 className="text-3xl font-light mb-6">Delivery Hours</h2>
              <div className="bg-bone/60 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="flex justify-between mb-2"><span className="font-medium">Sunday</span><span>9 AM – 4 PM</span></div>
                    <div className="flex justify-between mb-2"><span className="font-medium">Monday</span><span>10 AM – 6 PM</span></div>
                    <div className="flex justify-between mb-2"><span className="font-medium">Tuesday</span><span>10 AM – 6 PM</span></div>
                    <div className="flex justify-between"><span className="font-medium">Wednesday</span><span>Closed</span></div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2"><span className="font-medium">Thursday</span><span>10 AM – 6 PM</span></div>
                    <div className="flex justify-between mb-2"><span className="font-medium">Friday</span><span>10 AM – 7 PM</span></div>
                    <div className="flex justify-between"><span className="font-medium">Saturday</span><span>10 AM – 7 PM</span></div>
                  </div>
                </div>
              </div>
            </section>

            {/* CTA */}
            <section className="pt-8 border-t border-ink/15">
              <div className="bg-bone rounded-2xl px-8 md:px-12 py-12 text-center">
                <h3 className="text-2xl font-light mb-4">Questions About Delivery?</h3>
                <p className="text-ink/80 mb-6">
                  Our team is ready to help with any delivery questions or special requests.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="tel:(929) 216-7775"
                    className="px-8 py-3 bg-oxblood text-white font-medium rounded-lg hover:bg-ink transition"
                  >
                    Call (929) 216-7775
                  </a>
                  <Link
                    href="/collections/all"
                    className="px-8 py-3 border border-gray-900 text-ink font-medium rounded-lg hover:bg-bone/60 transition"
                  >
                    Shop Flowers
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
