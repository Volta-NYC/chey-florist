'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-light tracking-tight mb-4">
              Chey <span className="font-serif italic">Florist</span>
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Premium floral arrangements for every occasion, hand-crafted with passion and delivered fresh to Staten Island.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Shop</h4>
            <ul className="space-y-2">
              <li><Link href="/collections/all" className="text-sm text-gray-600 hover:text-gray-900">All Products</Link></li>
              <li><Link href="/collections/birthday" className="text-sm text-gray-600 hover:text-gray-900">Birthday</Link></li>
              <li><Link href="/collections/anniversary" className="text-sm text-gray-600 hover:text-gray-900">Anniversary</Link></li>
              <li><Link href="/collections/sympathy" className="text-sm text-gray-600 hover:text-gray-900">Sympathy</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm text-gray-600 hover:text-gray-900">About Us</Link></li>
              <li><Link href="/faq" className="text-sm text-gray-600 hover:text-gray-900">FAQ</Link></li>
              <li><Link href="/contact" className="text-sm text-gray-600 hover:text-gray-900">Contact</Link></li>
              <li><Link href="/delivery" className="text-sm text-gray-600 hover:text-gray-900">Delivery Info</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a href="tel:(929) 216-7775" className="text-sm text-gray-600 hover:text-gray-900">
                  (929) 216-7775
                </a>
              </li>
              <li>
                <a href="mailto:cheyflorist509@gmail.com" className="text-sm text-gray-600 hover:text-gray-900">
                  cheyflorist509@gmail.com
                </a>
              </li>
              <li className="text-sm text-gray-600">
                509 Forest Ave<br />
                Staten Island, NY 10310
              </li>
            </ul>
          </div>
        </div>

        {/* Business Hours */}
        <div className="border-t border-gray-200 pt-8 mb-8">
          <h4 className="text-sm font-semibold text-gray-900 mb-4">Hours</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <div className="flex justify-between"><span>Sunday</span><span>9 AM – 4 PM</span></div>
              <div className="flex justify-between"><span>Monday</span><span>10 AM – 6 PM</span></div>
              <div className="flex justify-between"><span>Tuesday</span><span>10 AM – 6 PM</span></div>
              <div className="flex justify-between"><span>Wednesday</span><span>Closed</span></div>
            </div>
            <div>
              <div className="flex justify-between"><span>Thursday</span><span>10 AM – 6 PM</span></div>
              <div className="flex justify-between"><span>Friday</span><span>10 AM – 7 PM</span></div>
              <div className="flex justify-between"><span>Saturday</span><span>10 AM – 7 PM</span></div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-200 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs text-gray-500">
            © 2024 Chey Florist. All rights reserved.
          </p>
          <p className="text-xs text-gray-500 mt-4 sm:mt-0">
            Hand-crafted fresh flowers for Staten Island, NY
          </p>
        </div>
      </div>
    </footer>
  );
}
