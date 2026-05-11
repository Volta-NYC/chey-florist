'use client';

const items = [
  'Same-day delivery across Staten Island',
  'Atelier No. 509 · Forest Ave',
  'Hand-arranged · Never wired',
  'Est. — A decade of blooms',
  'Call the studio · (929) 216-7775',
];

export function AnnouncementBar() {
  const loop = [...items, ...items, ...items, ...items];
  return (
    <div className="bg-ink text-cream overflow-hidden border-b border-ink/40">
      <div className="marquee-track py-2.5">
        {loop.map((t, i) => (
          <span key={i} className="eyebrow flex items-center gap-6 px-6 whitespace-nowrap">
            <span>{t}</span>
            <span className="text-gold">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
