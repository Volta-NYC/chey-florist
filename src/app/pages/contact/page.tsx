'use client';

import { Header, Footer, AnnouncementBar } from '@/components';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd send this to an email service
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-transparent">
      <AnnouncementBar />
      <Header />

      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-light mb-4">Contact Us</h1>
            <p className="text-xl text-ink/70">
              We'd love to hear from you. Get in touch with our team.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-light mb-3">Phone</h3>
                <a
                  href="tel:(929) 216-7775"
                  className="text-2xl font-semibold text-oxblood hover:text-rose-700"
                >
                  (929) 216-7775
                </a>
                <p className="text-ink/70 text-sm mt-2">
                  Call us for same-day orders and custom requests
                </p>
              </div>

              <div>
                <h3 className="text-lg font-light mb-3">Email</h3>
                <a
                  href="mailto:cheyflorist509@gmail.com"
                  className="text-2xl font-semibold text-oxblood hover:text-rose-700 break-all"
                >
                  cheyflorist509@gmail.com
                </a>
              </div>

              <div>
                <h3 className="text-lg font-light mb-3">Address</h3>
                <p className="text-ink/80 leading-relaxed">
                  Chey Florist<br />
                  509 Forest Ave<br />
                  Staten Island, NY 10310
                </p>
              </div>

              <div>
                <h3 className="text-lg font-light mb-3">Hours</h3>
                <div className="space-y-1 text-ink/80">
                  <div className="flex justify-between"><span>Sunday</span><span>9 AM – 4 PM</span></div>
                  <div className="flex justify-between"><span>Monday</span><span>10 AM – 6 PM</span></div>
                  <div className="flex justify-between"><span>Tuesday</span><span>10 AM – 6 PM</span></div>
                  <div className="flex justify-between"><span>Wednesday</span><span>Closed</span></div>
                  <div className="flex justify-between"><span>Thursday</span><span>10 AM – 6 PM</span></div>
                  <div className="flex justify-between"><span>Friday</span><span>10 AM – 7 PM</span></div>
                  <div className="flex justify-between"><span>Saturday</span><span>10 AM – 7 PM</span></div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                {submitted && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
                    Thank you! We'll get back to you soon.
                  </div>
                )}

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-ink mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-ink/25 rounded-lg focus:ring-2 focus:ring-rose-600 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-ink mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-ink/25 rounded-lg focus:ring-2 focus:ring-rose-600 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-ink mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-ink/25 rounded-lg focus:ring-2 focus:ring-rose-600 focus:border-transparent"
                    placeholder="(555) 000-0000"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-ink mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-ink/25 rounded-lg focus:ring-2 focus:ring-rose-600 focus:border-transparent resize-none"
                    placeholder="How can we help?"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-oxblood text-white font-medium rounded-lg hover:bg-ink transition"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Service Areas */}
          <div className="bg-bone/60 rounded-2xl px-8 md:px-12 py-12">
            <h3 className="text-2xl font-light mb-6">Our Service Areas</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-ink mb-3">Hospital Delivery</h4>
                <p className="text-sm text-ink/70 mb-3">
                  We deliver to the following hospitals in Staten Island:
                </p>
                <ul className="space-y-2 text-sm text-ink/80">
                  <li>• Richmond University Medical Center</li>
                  <li>• Bayley Seton Hospital</li>
                  <li>• Richmond Center for Rehab and Specialty Healthcare</li>
                </ul>
                <p className="text-xs text-ink/50 mt-3">
                  If your hospital isn't listed, please call us to confirm delivery.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-ink mb-3">Funeral Home Delivery</h4>
                <p className="text-sm text-ink/70 mb-3">
                  We deliver to the following funeral homes:
                </p>
                <ul className="space-y-2 text-sm text-ink/80">
                  <li>• John Vincent Scalia Home for Funerals</li>
                  <li>• Casey McCallum Rice South Shore Funeral Home</li>
                </ul>
                <p className="text-xs text-ink/50 mt-3">
                  Contact us for other funeral home delivery options.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
