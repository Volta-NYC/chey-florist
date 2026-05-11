'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-cream/85 backdrop-blur-md border-b border-ink/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-3 items-center h-20">
          {/* Left nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/collections/all" className="eyebrow link-edit text-ink/80 hover:text-ink">Atelier</Link>
            <Link href="/collections/wedding-events" className="eyebrow link-edit text-ink/80 hover:text-ink">Weddings</Link>
            <Link href="/collections/sympathy" className="eyebrow link-edit text-ink/80 hover:text-ink">Sympathy</Link>
          </nav>

          {/* Logo center */}
          <Link href="/" className="flex flex-col items-center justify-center text-center group">
            <span className="eyebrow text-gold mb-1">Est. Staten Island</span>
            <span className="display text-2xl md:text-[28px] tracking-tight leading-none">
              Chey <span className="italiana italic font-normal">Florist</span>
            </span>
          </Link>

          {/* Right nav */}
          <nav className="hidden md:flex items-center gap-8 justify-end">
            <Link href="/about" className="eyebrow link-edit text-ink/80 hover:text-ink">Maison</Link>
            <Link href="/contact" className="eyebrow link-edit text-ink/80 hover:text-ink">Contact</Link>
            <a
              href="tel:(929) 216-7775"
              className="eyebrow text-ink border border-ink rounded-full px-4 py-2 hover:bg-ink hover:text-cream transition-colors duration-500"
            >
              Reserve
            </a>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden col-start-3 justify-self-end">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="eyebrow border border-ink/50 rounded-full px-4 py-2"
            >
              {isMenuOpen ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden pb-6 pt-2 space-y-3 border-t border-ink/10">
            {[
              ['Atelier', '/collections/all'],
              ['Weddings', '/collections/wedding-events'],
              ['Sympathy', '/collections/sympathy'],
              ['Maison', '/about'],
              ['Contact', '/contact'],
            ].map(([label, href]) => (
              <Link key={href} href={href} className="block display text-2xl text-ink/90 hover:text-moss">
                {label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
