'use client';

import { Header, Footer, AnnouncementBar } from '@/components';
import Image from 'next/image';
import Link from 'next/link';

export default function WeddingEventsPage() {
  const sub = [
    { name: 'Wedding Ceremony', slug: 'wedding-ceremony', img: '/media/category-banner-love-and-romance-3661532b6f.webp', n: 'I' },
    { name: 'Wedding Party', slug: 'wedding-party', img: '/media/category-banner-anniversary-09371ef61a.webp', n: 'II' },
    { name: 'Wedding Reception', slug: 'wedding-reception', img: '/media/dod-cat-banner-mothers-day-845b64e123.webp', n: 'III' },
  ];

  const process = [
    {
      n: '01',
      title: 'Conversation',
      body: 'We begin with an unhurried call or studio visit. Talk through your colors, your venue, the people you love, the season your stems will be cut.',
    },
    {
      n: '02',
      title: 'Composition',
      body: 'A small mood-board with palette swatches, stem-by-stem proposals for each piece, and transparent pricing — never a templated package.',
    },
    {
      n: '03',
      title: 'Execution',
      body: 'On the day, we arrive, install, fluff, photograph for our archive, and strike at the end. Bouquets, boutonnières, ceremony arches, centerpieces.',
    },
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
              <Link href="/" className="link-edit">Home</Link><span>/</span><span className="text-ink">Weddings & Events</span>
            </div>
            <div className="grid lg:grid-cols-12 gap-10 items-end">
              <div className="lg:col-span-7">
                <div className="eyebrow text-gold mb-6 flex items-center gap-3">
                  <span className="w-12 h-px bg-gold" />
                  By Bespoke Commission
                </div>
                <h1 className="sd-rise display font-light leading-[0.92] tracking-[-0.02em]">
                  <span className="block text-[12vw] lg:text-[8rem]">Weddings</span>
                  <span className="block italiana italic text-moss text-[12vw] lg:text-[8rem] -mt-2 lg:-mt-4">&amp; Events</span>
                </h1>
                <p className="sd-rise-soft serif text-xl text-ink/80 max-w-xl mt-8 leading-snug">
                  From a courthouse posy to a thousand-stem installation &mdash; we compose
                  weddings and events the way we compose every bouquet: by hand, at the bench,
                  with whatever is in season the week of your day.
                </p>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <Link href="/contact" className="group inline-flex items-center gap-3 bg-ink text-cream px-7 py-4 rounded-full btn-press">
                    <span className="eyebrow">Book a consultation</span>
                    <span className="w-6 h-px bg-cream group-hover:w-10 transition-all duration-500" />
                  </Link>
                  <a href="tel:(929) 216-7775" className="eyebrow link-edit">or call (929) 216-7775</a>
                </div>
              </div>
              <div className="lg:col-span-5 relative">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <div className="absolute inset-0 sd-zoom">
                    <Image
                      src="/media/category-banner-love-and-romance-3661532b6f.webp"
                      alt="Wedding florals"
                      fill
                      priority
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute right-3 top-6 origin-top-right rotate-90 translate-x-full eyebrow text-cream/90">
                    Plate III — Garden Roses, Ranunculus, Trailing Smilax
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sub categories */}
        <section className="border-y border-ink/15 bg-bone/50 py-24">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
              <div>
                <div className="eyebrow text-gold mb-5 flex items-center gap-3">
                  <span>№ 01</span><span className="w-10 h-px bg-ink/40" /><span>The Three Moments</span>
                </div>
                <h2 className="sd-rise display text-5xl md:text-7xl font-light leading-[0.95] tracking-[-0.02em]">
                  Ceremony. Party. <span className="italiana italic text-moss">Reception</span>.
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {sub.map((c, i) => (
                <Link
                  key={c.slug}
                  href={`/collections/${c.slug}`}
                  style={{ animationDelay: `${i * 0.12}s` }}
                  className={`sd-rise group block relative aspect-[3/4] overflow-hidden bg-moss ${i === 1 ? 'md:translate-y-10' : ''}`}
                >
                  <div className="absolute inset-0 sd-parallax">
                    <Image src={c.img} alt={c.name} fill className="object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1200ms]" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
                  <div className="absolute top-5 left-5 right-5 flex items-center justify-between eyebrow text-cream/90">
                    <span>{c.n}</span><span className="opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="display text-3xl md:text-4xl font-light text-cream leading-tight">{c.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Specialties */}
        <section className="py-24 md:py-32">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <div className="eyebrow text-gold mb-4">№ 02</div>
              <div className="eyebrow text-ink/60">Specialties</div>
              <div className="mt-8 relative aspect-[4/5] overflow-hidden">
                <div className="absolute inset-0 sd-parallax">
                  <Image src="/media/category-banner-anniversary-09371ef61a.webp" alt="" fill className="object-cover" />
                </div>
              </div>
            </div>
            <div className="lg:col-span-8">
              <h2 className="sd-rise display text-4xl md:text-6xl font-light leading-[1.0] mb-10">
                What we make for the people getting <span className="italiana italic text-moss">married</span>.
              </h2>
              <ul className="grid sm:grid-cols-2 gap-x-10 gap-y-5 serif text-xl text-ink/85">
                {[
                  'Bridal bouquets, bridesmaid posies, flower-girl crowns',
                  'Boutonnières, corsages, hair flowers',
                  'Ceremony arches, chuppahs, aisle markers',
                  'Centerpieces, low gardens, tall trumpets',
                  'Cake florals, sweetheart table garlands',
                  'Full-service install & strike, on the day',
                  'Weekly office and restaurant arrangements',
                  'Corporate events, galas, private dinners',
                ].map((s, i) => (
                  <li key={i} className="sd-rise-soft flex items-baseline gap-3" style={{ animationDelay: `${i * 0.05}s` }}>
                    <span className="display italic text-moss">✿</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="border-y border-ink/15 bg-moss text-cream py-24 md:py-32 relative overflow-hidden">
          <div className="absolute -top-32 -right-32 w-[480px] h-[480px] blob bg-moss2 opacity-50" />
          <div className="absolute -bottom-40 -left-32 w-[520px] h-[520px] blob bg-ink opacity-40" />
          <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10">
            <div className="mb-14">
              <div className="eyebrow text-blush mb-5 flex items-center gap-3">
                <span>№ 03</span><span className="w-10 h-px bg-cream/40" /><span>Our Process</span>
              </div>
              <h2 className="sd-rise display text-5xl md:text-7xl font-light leading-[0.95] tracking-[-0.02em]">
                A wedding is <span className="italiana italic text-blush">three conversations</span>.
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-10">
              {process.map((p, i) => (
                <div key={p.n} style={{ animationDelay: `${i * 0.15}s` }} className="sd-rise">
                  <div className="flex items-baseline gap-4 mb-6">
                    <span className="display italic text-7xl text-blush leading-none">{p.n}</span>
                    <span className="h-px flex-1 bg-cream/30 mb-3" />
                  </div>
                  <h3 className="display text-3xl text-cream mb-4 leading-tight">{p.title}</h3>
                  <p className="serif text-lg text-cream/80 leading-relaxed">{p.body}</p>
                </div>
              ))}
            </div>
            <div className="mt-16 flex flex-wrap gap-4">
              <Link href="/contact" className="eyebrow bg-cream text-ink rounded-full px-6 py-3 hover:bg-blush transition-colors duration-500">
                Begin the conversation ↗
              </Link>
              <a href="tel:(929) 216-7775" className="eyebrow border border-cream/40 rounded-full px-6 py-3 hover:bg-cream/10 transition-colors duration-500">
                (929) 216-7775
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
