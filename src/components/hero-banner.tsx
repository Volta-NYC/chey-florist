'use client';

import Image from 'next/image';
import Link from 'next/link';

interface HeroBannerProps {
  title: string;
  subtitle?: string;
  imagePath?: string;
  ctaText?: string;
  ctaLink?: string;
}

export function HeroBanner({ title, subtitle, imagePath, ctaText, ctaLink }: HeroBannerProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 pt-6 pb-20 lg:pb-32">
        {/* Top meta row */}
        <div className="flex items-center justify-between eyebrow text-ink/60 mb-10">
          <span>Vol. XII · Spring Edition</span>
          <span className="hidden md:inline">No. 509 — Forest Ave, NY</span>
          <span>MMXXVI</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          {/* Headline column */}
          <div className="lg:col-span-7 relative">
            <div className="eyebrow text-moss mb-6 flex items-center gap-3">
              <span className="w-12 h-px bg-moss" />
              An Atelier of Fresh Blooms
            </div>
            <h1 className="display font-light leading-[0.92] tracking-[-0.02em] text-ink">
              <span className="block text-[14vw] lg:text-[8.5rem] reveal-up" style={{ animationDelay: '0.1s' }}>
                Le Jardin
              </span>
              <span className="block italiana italic text-moss text-[14vw] lg:text-[8.5rem] -mt-4 lg:-mt-6 reveal-up" style={{ animationDelay: '0.25s' }}>
                Privé
              </span>
            </h1>

            <div className="mt-10 max-w-md reveal-up" style={{ animationDelay: '0.45s' }}>
              <p className="serif text-xl lg:text-2xl text-ink/80 leading-snug">
                Hand-arranged compositions of seasonal flowers, gathered with patience and
                <span className="italiana italic text-oxblood"> delivered the same afternoon </span>
                across Staten Island.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-5 reveal-up" style={{ animationDelay: '0.6s' }}>
              {ctaText && ctaLink && (
                <Link
                  href={ctaLink}
                  className="group inline-flex items-center gap-3 bg-ink text-cream px-7 py-4 rounded-full btn-press"
                >
                  <span className="eyebrow">{ctaText}</span>
                  <span className="w-6 h-px bg-cream group-hover:w-10 transition-all duration-500" />
                </Link>
              )}
              <Link href="/about" className="eyebrow link-edit text-ink/80">
                Read our story
              </Link>
            </div>
          </div>

          {/* Image column */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -top-10 -left-6 hidden lg:block">
              <div className="w-28 h-28 rounded-full border border-ink/40 flex items-center justify-center animate-slow-spin">
                <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0">
                  <defs>
                    <path id="circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
                  </defs>
                  <text className="eyebrow fill-ink" style={{ fontSize: '9px', letterSpacing: '0.32em' }}>
                    <textPath href="#circle">
                      FRESH · SEASONAL · HAND-TIED · STATEN ISLAND ·
                    </textPath>
                  </text>
                </svg>
                <span className="display italic text-moss text-xl">✿</span>
              </div>
            </div>

            <div className="relative aspect-[4/5] overflow-hidden">
              {imagePath && (
                <Image
                  src={imagePath}
                  alt={title}
                  fill
                  priority
                  className="object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/20 via-transparent to-transparent" />
              {/* Vertical caption */}
              <div className="absolute right-3 top-6 origin-top-right rotate-90 translate-x-full eyebrow text-cream/90">
                Plate I — Garden Roses, Anemone, Eucalyptus
              </div>
            </div>

            {/* Index card */}
            <div className="absolute -bottom-10 -left-6 lg:-left-12 bg-cream border border-ink/15 px-6 py-5 max-w-[220px] shadow-[0_30px_60px_-30px_rgba(26,22,18,0.4)]">
              <div className="eyebrow text-gold mb-2">Studio Hours</div>
              <div className="serif text-ink leading-snug">
                Mon – Sat · 10am – 7pm<br/>
                Sun · 9am – 4pm
              </div>
              <div className="mt-3 ornament-divider text-moss text-xs">✿</div>
              <a href="tel:(929) 216-7775" className="block mt-2 eyebrow text-ink hover:text-oxblood transition">
                (929) 216-7775
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom marquee with type */}
      <div className="border-y border-ink/15 overflow-hidden bg-bone/40">
        <div className="marquee-track py-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="display italic text-moss text-3xl md:text-5xl px-8 whitespace-nowrap">
              roses · peonies · ranunculus · anemone · garden dahlia · sweet pea · lisianthus · eucalyptus ·
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
