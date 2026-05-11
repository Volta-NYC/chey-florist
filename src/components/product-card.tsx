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
        {/* Corner index badges */}
        <div className="absolute top-4 left-4 z-10 eyebrow text-cream/95 flex items-center gap-2">
          <span className="w-5 h-px bg-cream/80" />
          <span>№ {num}</span>
        </div>
        {badges.length > 0 && (
          <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
            {badges.map((badge) => (
              <span key={badge} className="eyebrow bg-oxblood text-cream px-2.5 py-1 rounded-full">
                {badge}
              </span>
            ))}
          </div>
        )}

        {/* Image with duotone wash */}
        <div className="img-wrap relative aspect-[4/5] overflow-hidden bg-bone">
          <Image src={imagePath} alt={name} fill className="object-cover" sizes="(min-width: 1024px) 25vw, 50vw" />
        </div>

        {/* Drawn-in cream frame (4 lines) */}
        <span className="frame" aria-hidden="true"><span /></span>

        {/* Sliding caption plate */}
        <div className="plate">
          <span className="eyebrow text-ink">View Composition</span>
          <span className="display italic text-moss text-lg leading-none">↗</span>
        </div>
      </div>

      {/* Meta below */}
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow text-ink/50 mb-2">{category}</p>
          <h3 className="display text-2xl leading-tight text-ink group-hover:text-moss transition-colors">
            <span className="title-link">{name}</span>
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
