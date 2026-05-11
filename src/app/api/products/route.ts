import { NextRequest, NextResponse } from 'next/server';
import { getCollectionBySlug, getProductsForCollection, products, searchProducts } from '@/lib/data';
import type { Product } from '@/lib/types';

function parseLimit(value: string | null): number {
  const parsed = Number(value ?? 50);
  if (!Number.isFinite(parsed)) return 50;
  return Math.max(1, Math.min(200, Math.trunc(parsed)));
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseLimit(searchParams.get('limit'));
    const category = searchParams.get('category');
    const search = searchParams.get('q');

    let result: Product[] = products;

    // Filter by category if provided
    if (category && category !== 'all') {
      const collection = getCollectionBySlug(category);
      result = collection
        ? getProductsForCollection(collection.slug)
        : result.filter((p) => p.category === category || p.slug === category);
    }

    // Filter by search if provided
    if (search) {
      const matches = new Set(searchProducts(search).map((p) => p.slug));
      result = result.filter((p) => matches.has(p.slug));
    }

    // Apply limit
    result = result.slice(0, limit);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
