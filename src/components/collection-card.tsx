'use client';

import Link from 'next/link';
import Image from 'next/image';

interface CollectionCardProps {
  name: string;
  slug: string;
  imagePath?: string;
  productCount?: number;
  number?: string;
}

export function CollectionCard({ name, slug, imagePath, productCount, number }: CollectionCardProps) {
  return (
    <Link href={`/collections/${slug}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-moss">
        {imagePath ? (
          <Image
            src={imagePath}
            alt={name}
            fill
            className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1200ms]"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-moss to-ink" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />

        <div className="absolute top-5 left-5 right-5 flex items-center justify-between eyebrow text-cream/85">
          <span>{number ?? '—'}</span>
          <span>↗</span>
        </div>

        <div className="absolute bottom-6 left-6 right-6">
          <h3 className="display text-3xl md:text-4xl font-light text-cream leading-tight">
            {name.split(' ').map((w, i, arr) =>
              i === arr.length - 1 ? (
                <span key={i} className="italiana italic text-blush"> {w}</span>
              ) : (
                <span key={i}>{w} </span>
              )
            )}
          </h3>
          {productCount !== undefined && (
            <p className="eyebrow text-cream/70 mt-3">{productCount} compositions</p>
          )}
        </div>
      </div>
    </Link>
  );
}
