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
    <div className="relative h-[500px] md:h-[600px] overflow-hidden rounded-2xl mb-16">
      {imagePath && (
        <Image
          src={imagePath}
          alt={title}
          fill
          className="object-cover"
          priority
        />
      )}
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-6xl font-light text-white mb-4 max-w-3xl">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
            {subtitle}
          </p>
        )}
        {ctaText && ctaLink && (
          <Link
            href={ctaLink}
            className="px-8 py-3 bg-rose-600 text-white font-medium rounded-lg hover:bg-rose-700 transition"
          >
            {ctaText}
          </Link>
        )}
      </div>
    </div>
  );
}
