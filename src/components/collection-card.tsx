'use client';

import Link from 'next/link';
import Image from 'next/image';

interface CollectionCardProps {
  name: string;
  slug: string;
  imagePath?: string;
  productCount?: number;
}

export function CollectionCard({ name, slug, imagePath, productCount }: CollectionCardProps) {
  return (
    <Link href={`/collections/${slug}`}>
      <div className="group cursor-pointer">
        {imagePath && (
          <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 mb-4">
            <Image
              src={imagePath}
              alt={name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <h3 className="text-lg font-light group-hover:text-rose-600 transition mb-2">
          {name}
        </h3>
        {productCount !== undefined && (
          <p className="text-sm text-gray-600">
            {productCount} {productCount === 1 ? 'product' : 'products'}
          </p>
        )}
      </div>
    </Link>
  );
}
