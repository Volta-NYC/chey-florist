'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-ink text-cream relative overflow-hidden mt-32">
      {/* Giant wordmark backdrop */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none select-none opacity-[0.07] flex justify-center">
        <span className="display italic font-light text-[28vw] leading-[0.8] text-cream">Chey</span>
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 pt-24 pb-12">
        {/* Top: invitation */}
        <div className="grid lg:grid-cols-12 gap-10 mb-20">
          <div className="lg:col-span-7">
            <div className="eyebrow text-gold mb-6">An Invitation</div>
            <h2 className="display text-5xl md:text-7xl font-light leading-[0.95]">
              Compose <span className="italiana italic text-blush">something</span><br />
              unforgettable.
            </h2>
          </div>
          <div className="lg:col-span-5 flex flex-col justify-end gap-5">
            <p className="serif text-xl text-cream/80 leading-snug max-w-md">
              Tell us the occasion, the colors you adore, the person you'd like to move — we'll arrange the rest by hand.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a href="tel:(929) 216-7775" className="eyebrow border border-cream/40 rounded-full px-6 py-3 hover:bg-cream hover:text-ink transition-all duration-500">
                Call the studio
              </a>
              <Link href="/contact" className="eyebrow bg-cream text-ink rounded-full px-6 py-3 hover:bg-blush transition-all duration-500">
                Send a note ↗
              </Link>
            </div>
          </div>
        </div>

        <div className="hairline opacity-30 mb-12" />

        {/* Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div>
            <h4 className="eyebrow text-gold mb-5">The Atelier</h4>
            <ul className="space-y-3 serif text-cream/80">
              <li><Link href="/collections/all" className="link-edit">All compositions</Link></li>
              <li><Link href="/collections/birthday" className="link-edit">Birthday</Link></li>
              <li><Link href="/collections/anniversary" className="link-edit">Anniversary</Link></li>
              <li><Link href="/sympathy" className="link-edit">Sympathy</Link></li>
              <li><Link href="/wedding-events" className="link-edit">Weddings & events</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="eyebrow text-gold mb-5">Maison</h4>
            <ul className="space-y-3 serif text-cream/80">
              <li><Link href="/about" className="link-edit">Our story</Link></li>
              <li><Link href="/faq" className="link-edit">Questions</Link></li>
              <li><Link href="/delivery" className="link-edit">Delivery</Link></li>
              <li><Link href="/contact" className="link-edit">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="eyebrow text-gold mb-5">Studio</h4>
            <p className="serif text-cream/80 leading-relaxed">
              509 Forest Avenue<br />
              Staten Island, NY 10310<br />
              <a href="tel:(929) 216-7775" className="link-edit mt-3 inline-block">(929) 216-7775</a><br />
              <a href="mailto:cheyflorist509@gmail.com" className="link-edit">cheyflorist509@gmail.com</a>
            </p>
          </div>
          <div>
            <h4 className="eyebrow text-gold mb-5">Hours</h4>
            <ul className="serif text-cream/80 space-y-1.5">
              <li className="flex justify-between"><span>Sun</span><span className="text-cream/60">9 – 4</span></li>
              <li className="flex justify-between"><span>Mon</span><span className="text-cream/60">10 – 6</span></li>
              <li className="flex justify-between"><span>Tue</span><span className="text-cream/60">10 – 6</span></li>
              <li className="flex justify-between"><span>Wed</span><span className="text-oxblood/80 italic">closed</span></li>
              <li className="flex justify-between"><span>Thu</span><span className="text-cream/60">10 – 6</span></li>
              <li className="flex justify-between"><span>Fri</span><span className="text-cream/60">10 – 7</span></li>
              <li className="flex justify-between"><span>Sat</span><span className="text-cream/60">10 – 7</span></li>
            </ul>
          </div>
        </div>

        <div className="hairline opacity-30 mb-8" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 eyebrow text-cream/50">
          <span>© MMXXVI · Chey Florist · Staten Island, NY</span>
          <span className="display italic text-cream/80">Le Jardin Privé</span>
          <span>Hand-arranged. Never wired.</span>
        </div>
      </div>
    </footer>
  );
}
