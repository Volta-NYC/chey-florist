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
}

export function ProductCard({ name, slug, price, imagePath, category, badges = [] }: ProductCardProps) {
  return (
    <Link href={`/products/${slug}`}>
      <div className="group cursor-pointer">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 mb-4">
          <Image
            src={imagePath}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {badges.length > 0 && (
            <div className="absolute top-3 right-3 space-y-2">
              {badges.map((badge) => (
                <span
                  key={badge}
                  className="inline-block px-3 py-1 bg-rose-600 text-white text-xs font-medium rounded-full"
                >
                  {badge}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="space-y-2">
          <p className="text-xs text-gray-500 uppercase tracking-widest">{category}</p>
          <h3 className="text-base font-light leading-snug group-hover:text-rose-600 transition">
            {name}
          </h3>
          <p className="text-lg font-semibold text-gray-900">
            ${price.toFixed(2)}
          </p>
        </div>
      </div>
    </Link>
  );
}
