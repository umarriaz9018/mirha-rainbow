import { NextRequest, NextResponse }    from 'next/server';
import { createInstagramBoostCampaign } from '@/lib/metaAdsApi';
import { generateInstagramShare }       from '@/lib/instagramShare';
import { fetchProductById }             from '@/lib/googleSheets';

export async function POST(req: NextRequest) {
  try {
    const { productId, budget, durationDays, targetCities } = await req.json();

    if (!productId || !budget || !durationDays)
      return NextResponse.json({ error: 'productId, budget, and durationDays are required' }, { status: 400 });

    if (budget < 500)
      return NextResponse.json({ error: 'Minimum daily budget is PKR 500' }, { status: 400 });

    const product = await fetchProductById(productId);
    if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 });

    const siteUrl  = process.env.NEXT_PUBLIC_SITE_URL        ?? '';
    const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '';
    const share    = generateInstagramShare(product, siteUrl, waNumber);

    const result = await createInstagramBoostCampaign({
      productId:    product.id,
      productName:  product.name,
      productImage: product.images[0],
      productUrl:   `${siteUrl}/product/${product.id}`,
      caption:      share.caption,
      budget,
      durationDays,
      targetCities,
    });

    if (!result.success) return NextResponse.json({ error: result.error }, { status: 500 });

    return NextResponse.json({ success: true, ...result });
  } catch (err) {
    console.error('[Boost API]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
