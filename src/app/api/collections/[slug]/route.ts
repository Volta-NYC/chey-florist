import { NextRequest, NextResponse } from 'next/server';
import { getCollectionBySlug, getProductsForCollection, products } from '@/lib/data';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    if (slug === 'all') {
      return NextResponse.json({
        name: 'All Flowers',
        slug: 'all',
        description: 'Every available arrangement from the Chey Florist studio.',
        type: 'general',
        imagePaths: [],
        productSlugs: products.map((product) => product.slug),
        sourcePageUrl: '',
        sourceMarkdownFile: '',
        products: products.slice(0, 100),
      });
    }

    const collection = getCollectionBySlug(slug);
    if (!collection) {
      return NextResponse.json({ error: 'Collection not found' }, { status: 404 });
    }

    const collectionProducts = getProductsForCollection(slug);

    return NextResponse.json({
      ...collection,
      products: collectionProducts.slice(0, 100),
    });
  } catch (error) {
    console.error('Error fetching collection:', error);
    return NextResponse.json({ error: 'Failed to fetch collection' }, { status: 500 });
  }
}
