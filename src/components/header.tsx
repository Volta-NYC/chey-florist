'use client';

import Link from 'next/link';
import { useState } from 'react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-xl font-light tracking-tight">
              Chey <span className="font-serif italic">Florist</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/collections/all" className="text-sm text-gray-700 hover:text-gray-900 transition">
              Shop
            </Link>
            <Link href="/collections/wedding-events" className="text-sm text-gray-700 hover:text-gray-900 transition">
              Weddings
            </Link>
            <Link href="/collections/sympathy" className="text-sm text-gray-700 hover:text-gray-900 transition">
              Sympathy
            </Link>
            <Link href="/about" className="text-sm text-gray-700 hover:text-gray-900 transition">
              About
            </Link>
            <Link href="/contact" className="text-sm text-gray-700 hover:text-gray-900 transition">
              Contact
            </Link>
          </nav>

          {/* Contact CTA */}
          <div className="hidden sm:flex items-center gap-4">
            <a href="tel:(929) 216-7775" className="text-sm font-medium text-gray-900">
              (929) 216-7775
            </a>
            <button className="px-4 py-2 bg-rose-600 text-white text-sm rounded-md hover:bg-rose-700 transition">
              Order
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            <Link href="/collections/all" className="block px-2 py-2 text-sm text-gray-700 hover:bg-gray-50">
              Shop
            </Link>
            <Link href="/collections/wedding-events" className="block px-2 py-2 text-sm text-gray-700 hover:bg-gray-50">
              Weddings
            </Link>
            <Link href="/collections/sympathy" className="block px-2 py-2 text-sm text-gray-700 hover:bg-gray-50">
              Sympathy
            </Link>
            <Link href="/about" className="block px-2 py-2 text-sm text-gray-700 hover:bg-gray-50">
              About
            </Link>
            <Link href="/contact" className="block px-2 py-2 text-sm text-gray-700 hover:bg-gray-50">
              Contact
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
