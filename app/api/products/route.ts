import { NextRequest, NextResponse }             from 'next/server';
import { fetchProducts, fetchProductsByCategory } from '@/lib/googleSheets';
import type { ProductCategory }                   from '@/types';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category') as ProductCategory | null;

    const products = category && category !== 'All'
      ? await fetchProductsByCategory(category)
      : await fetchProducts();

    return NextResponse.json({ success: true, products, count: products.length });
  } catch (err) {
    console.error('[Products API]', err);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
