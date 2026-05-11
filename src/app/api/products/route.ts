import { readFileSync } from 'fs';
import { join } from 'path';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const category = searchParams.get('category');
    const search = searchParams.get('q');

    const filePath = join(process.cwd(), 'data', 'products.json');
    const data = readFileSync(filePath, 'utf-8');
    let products = JSON.parse(data);

    // Filter by category if provided
    if (category && category !== 'all') {
      products = products.filter((p: any) => p.category === category || p.slug === category);
    }

    // Filter by search if provided
    if (search) {
      const searchLower = search.toLowerCase();
      products = products.filter((p: any) =>
        p.name.toLowerCase().includes(searchLower) ||
        p.fullDescription.toLowerCase().includes(searchLower)
      );
    }

    // Apply limit
    products = products.slice(0, limit);

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
