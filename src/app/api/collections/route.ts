import { NextResponse } from 'next/server';
import { collections } from '@/lib/data';

export async function GET() {
  try {
    return NextResponse.json(collections);
  } catch (error) {
    console.error('Error fetching collections:', error);
    return NextResponse.json({ error: 'Failed to fetch collections' }, { status: 500 });
  }
}
