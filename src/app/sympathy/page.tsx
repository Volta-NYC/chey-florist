'use client';

import { Header, Footer, AnnouncementBar, ProductCard } from '@/components';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Product {
  name: string;
  slug: string;
  price: number;
  imagePaths: string[];
  category: string;
}

export default function SympathyPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/products?limit=40');
        const data: Product[] = await res.json();
        const filtered = data.filter((p) => {
          const c = (p.category || '').toLowerCase();
          const n = (p.name || '').toLowerCase();
          return (
            c.includes('sympathy') ||
            c.includes('casket') ||
            c.includes('spray') ||
            c.includes('funeral') ||
            n.includes('memorial') ||
            n.includes('peace')
          );
        }).slice(0, 8);
        setProducts(filtered.length > 0 ? filtered : data.slice(0, 8));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const subCollections = [
    { name: 'Funeral Service Bouquets', slug: 'funeral-service-bouquets', img: '/media/category-banner-easter-bd3aabf223.webp', n: 'I' },
    { name: 'Sympathy Bouquets', slug: 'sympathy-bouquets', img: '/media/beautiful-memories-collection-banner-ec7f6dd5b8.webp', n: 'II' },
    { name: 'Casket Sprays', slug: 'casket-sprays', img: '/media/ef-sympathy-spray-wreath-fts-116be2a707.webp', n: 'III' },
    { name: 'Standing Sprays & Wreaths', slug: 'standing-sprays-wreaths', img: '/media/ef-sympathy-bouquet-fts-326a94947d.webp', n: 'IV' },
    { name: 'Sympathy Plants', slug: 'sympathy-plants', img: '/media/category-banner-just-because-36edc515de.webp', n: 'V' },
    { name: 'Tender Remembrance', slug: 'tender-remembrance-collection', img: '/media/beautiful-memories-collection-banner-ec7f6dd5b8.webp', n: 'VI' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative pt-12 pb-20 md:pb-28">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <div className="eyebrow text-ink/50 mb-8 flex items-center gap-3">
              <Link href="/" className="link-edit">Home</Link><span>/</span><span className="text-ink">Sympathy</span>
            </div>

            <div className="grid lg:grid-cols-12 gap-10 items-end">
              <div className="lg:col-span-7">
                <div className="eyebrow text-gold mb-6 flex items-center gap-3">
                  <span className="w-12 h-px bg-gold" />
                  With Quiet Care
                </div>
                <h1 className="sd-rise display font-light leading-[0.92] tracking-[-0.02em]">
                  <span className="block text-[12vw] lg:text-[7.5rem]">Sympathy</span>
                  <span className="block italiana italic text-moss text-[12vw] lg:text-[7.5rem] -mt-2 lg:-mt-4">&amp; Funeral</span>
                </h1>
                <p className="sd-rise-soft serif text-xl text-ink/80 max-w-xl mt-8 leading-snug">
                  Service-ready flowers designed with care, respect, and a soft hand.
                  Hand-arranged and coordinated directly with funeral homes across Staten Island.
                </p>
              </div>
              <div className="lg:col-span-5 relative">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <div className="absolute inset-0 sd-zoom">
                    <Image
                      src="/media/ef-sympathy-bouquet-fts-326a94947d.webp"
                      alt="Sympathy arrangement"
                      fill
                      priority
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute right-3 top-6 origin-top-right rotate-90 translate-x-full eyebrow text-cream/90">
                    Plate II — Lilies, White Roses, Eucalyptus
                  </div>
                </div>
                <div className="absolute -bottom-8 -left-6 bg-cream border border-ink/15 px-6 py-5 max-w-[240px] shadow-[0_30px_60px_-30px_rgba(26,22,18,0.4)]">
                  <div className="eyebrow text-gold mb-2">Call for guidance</div>
                  <a href="tel:(929) 216-7775" className="display text-2xl text-ink hover:text-oxblood transition">
                    (929) 216-7775
                  </a>
                  <p className="serif text-sm text-ink/70 mt-2 leading-snug">
                    We'll coordinate timing with the funeral home.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Editorial body */}
        <section className="border-y border-ink/15 bg-bone/50 py-24">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <div className="eyebrow text-gold mb-4">№ 01</div>
              <div className="eyebrow text-ink/60">A Note on Sending Flowers</div>
            </div>
            <div className="lg:col-span-8">
              <p className="sd-rise-soft serif text-2xl md:text-3xl text-ink leading-[1.3] mb-10">
                Honor a life with flowers <span className="italiana italic text-moss">designed for a service</span> &mdash; thoughtful palettes, respectful presentation, delivered with the timing a service requires.
              </p>
              <div className="grid md:grid-cols-2 gap-10 serif text-lg text-ink/80 leading-relaxed">
                <p>
                  Funeral flowers are sent to a church service or funeral home to honor the departed's religious or cultural beliefs &mdash; with arrangements appropriate for a viewing, wake, funeral, cremation, or graveside service. When you order from Chey Florist, our florist works directly with the funeral home to ensure timely, accurate delivery.
                </p>
                <p>
                  Sympathy arrangements may also be sent to the family home or to a service of remembrance. If you'd like guidance on what to send &mdash; or if you're sending from outside Staten Island &mdash; please call us at (929) 216-7775. Same-day delivery is available across Staten Island.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sub-collections grid */}
        <section className="py-24 md:py-32">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
              <div>
                <div className="eyebrow text-gold mb-5 flex items-center gap-3">
                  <span>№ 02</span><span className="w-10 h-px bg-ink/40" /><span>By Service</span>
                </div>
                <h2 className="sd-rise display text-5xl md:text-7xl font-light leading-[0.95] tracking-[-0.02em]">
                  Six <span className="italiana italic text-moss">tributes</span>.
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-7">
              {subCollections.map((c, i) => (
                <Link
                  key={c.slug}
                  href={`/collections/${c.slug}`}
                  style={{ animationDelay: `${(i % 3) * 0.1}s` }}
                  className={`sd-rise group block relative aspect-[3/4] overflow-hidden bg-moss ${i % 2 === 1 ? 'lg:translate-y-10' : ''}`}
                >
                  <div className="absolute inset-0 sd-parallax">
                    <Image src={c.img} alt={c.name} fill className="object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1200ms]" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />
                  <div className="absolute top-5 left-5 right-5 flex items-center justify-between eyebrow text-cream/90">
                    <span>{c.n}</span><span className="opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="display text-2xl md:text-3xl font-light text-cream leading-tight">{c.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured products */}
        {!loading && products.length > 0 && (
          <section className="pb-24 md:pb-32">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
                <div>
                  <div className="eyebrow text-gold mb-5 flex items-center gap-3">
                    <span>№ 03</span><span className="w-10 h-px bg-ink/40" /><span>Featured Arrangements</span>
                  </div>
                  <h2 className="sd-rise display text-5xl md:text-6xl font-light leading-[0.95]">
                    From the <span className="italiana italic text-moss">studio</span>
                  </h2>
                </div>
                <Link href="/collections/sympathy-bouquets" className="eyebrow link-edit text-ink shrink-0">
                  Browse every sympathy arrangement →
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                {products.slice(0, 8).map((p, i) => (
                  <div key={p.slug} style={{ animationDelay: `${(i % 4) * 0.1}s` }} className={`sd-rise ${i % 4 === 1 || i % 4 === 2 ? 'lg:translate-y-12' : ''}`}>
                    <ProductCard
                      name={p.name}
                      slug={p.slug}
                      price={p.price}
                      imagePath={p.imagePaths?.[0] || '/media/placeholder.webp'}
                      category={p.category}
                      index={i}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="pb-24">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <div className="relative bg-ink text-cream overflow-hidden">
              <div className="absolute inset-0 opacity-25 sd-parallax">
                <Image src="/media/beautiful-memories-collection-banner-ec7f6dd5b8.webp" alt="" fill className="object-cover scale-110" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/30" />
              <div className="relative grid lg:grid-cols-12 gap-10 p-10 md:p-20">
                <div className="lg:col-span-8">
                  <div className="eyebrow text-gold mb-6">When you need a hand</div>
                  <h2 className="sd-rise display text-5xl md:text-7xl font-light leading-[0.95] tracking-[-0.02em]">
                    Let us <span className="italiana italic text-blush">help</span> you honor someone.
                  </h2>
                </div>
                <div className="lg:col-span-4 flex flex-col justify-end gap-4">
                  <p className="serif text-lg text-cream/80 leading-snug">
                    A compassionate florist will help you choose &mdash; and coordinate everything with the service.
                  </p>
                  <a href="tel:(929) 216-7775" className="group flex items-center justify-between gap-3 bg-cream text-ink rounded-full px-7 py-4 btn-press">
                    <span className="eyebrow">Call (929) 216-7775</span>
                    <span className="w-6 h-px bg-ink group-hover:w-12 transition-all duration-500" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
