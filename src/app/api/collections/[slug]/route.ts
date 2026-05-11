import { readFileSync } from 'fs';
import { join } from 'path';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;

    // Read collections
    const collectionsPath = join(process.cwd(), 'data', 'collections.json');
    const collectionsData = readFileSync(collectionsPath, 'utf-8');
    const collections = JSON.parse(collectionsData);

    const collection = collections.find((c: any) => c.slug === slug);

    if (!collection) {
      return NextResponse.json({ error: 'Collection not found' }, { status: 404 });
    }

    // Read products and filter by category
    const productsPath = join(process.cwd(), 'data', 'products.json');
    const productsData = readFileSync(productsPath, 'utf-8');
    let products = JSON.parse(productsData);

    // Filter products by matching collection slug to category or creating matches
    if (slug === 'all') {
      // All collection shows all products
      products = products;
    } else if (collection.productSlugs && collection.productSlugs.length > 0) {
      // Use product slugs if they exist in the collection
      products = products.filter((p: any) => collection.productSlugs.includes(p.slug));
    } else {
      // Otherwise try to match by category name
      const categoryName = collection.name
        .toLowerCase()
        .replace('flowers delivery staten island ny - chey florist', '')
        .replace('flowers in staten island, ny | chey florist', '')
        .replace(' delivery staten island ny', '')
        .replace('|', '')
        .trim();

      products = products.filter((p: any) => {
        const productCategory = p.category.toLowerCase();
        const collectionName = collection.name.toLowerCase();
        return productCategory.includes(slug) || collectionName.includes(productCategory);
      });
    }

    return NextResponse.json({
      ...collection,
      products: products.slice(0, 100), // Return first 100 products
    });
  } catch (error) {
    console.error('Error fetching collection:', error);
    return NextResponse.json({ error: 'Failed to fetch collection' }, { status: 500 });
  }
}
