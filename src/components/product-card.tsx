'use client';

import Link from 'next/link';
import Image from 'next/image';

interface ProductCardProps {
  name: string;
  slug: string;
  price: number;
  imagePath: string;
  category: string;
  badges?: string[];
  index?: number;
}

export function ProductCard({ name, slug, price, imagePath, category, badges = [], index = 0 }: ProductCardProps) {
  const num = String(index + 1).padStart(2, '0');
  return (
    <Link href={`/products/${slug}`} className="flower-card group block">
      <div className="relative">
        <div className="absolute top-3 left-3 z-10 eyebrow text-cream mix-blend-difference">№ {num}</div>
        {badges.length > 0 && (
          <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
            {badges.map((badge) => (
              <span key={badge} className="eyebrow bg-oxblood text-cream px-2.5 py-1 rounded-full">
                {badge}
              </span>
            ))}
          </div>
        )}
        <div className="img-wrap relative aspect-[4/5] overflow-hidden bg-bone">
          <Image src={imagePath} alt={name} fill className="object-cover" />
        </div>
        <div className="reveal absolute inset-0 bg-ink/30 flex items-end p-5">
          <div className="eyebrow text-cream flex items-center gap-3">
            View Composition
            <span className="w-6 h-px bg-cream" />
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow text-ink/50 mb-2">{category}</p>
          <h3 className="display text-2xl leading-tight text-ink group-hover:text-moss transition-colors">
            {name}
          </h3>
        </div>
        <div className="text-right shrink-0">
          <div className="eyebrow text-ink/40 mb-1">From</div>
          <div className="display italic text-xl text-oxblood">${price.toFixed(0)}</div>
        </div>
      </div>
    </Link>
  );
}
