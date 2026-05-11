'use client';

import Link from 'next/link';

export function AnnouncementBar() {
  return (
    <div className="bg-rose-50 border-b border-rose-100 text-center text-sm text-rose-900 py-3">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
        <p className="font-medium">
          Fresh flowers for Staten Island — Same-day delivery available
        </p>
        <Link
          href="/collections/all"
          className="text-rose-700 hover:text-rose-900 font-medium underline"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
}
