import { google }                    from 'googleapis';
import { Product, ProductCategory, OrderType } from '@/types';

let cachedProducts: Product[] | null = null;
let cacheTimestamp: number           = 0;
const CACHE_DURATION                 = 5 * 60 * 1000;

async function getSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      private_key:  process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });
  const client = await auth.getClient();
  return google.sheets({ version: 'v4', auth: client as any });
}

export async function fetchProducts(): Promise<Product[]> {
  const now = Date.now();
  if (cachedProducts && now - cacheTimestamp < CACHE_DURATION) return cachedProducts;

  try {
    const sheets   = await getSheetsClient();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
      range:         'Products!A2:P1000',
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) return [];

    const products: Product[] = rows
      .filter((row) => row[0] && row[1])
      .map((row): Product => ({
        id:               row[0]?.trim()  || '',
        name:             row[1]?.trim()  || '',
        category:         (row[2]?.trim() || 'Ceramics') as ProductCategory,
        price:            row[3] ? parseFloat(row[3]) : null,
        priceDisplay:     row[4]?.trim()  || 'Contact for price',
        shortDescription: row[5]?.trim()  || '',
        description:      row[6]?.trim()  || '',
        images:           row[7]
          ? row[7].split(',').map((u: string) => u.trim()).filter(Boolean)
          : ['/images/placeholder.svg'],
        orderType:    (row[8]?.trim()  || 'both') as OrderType,
        isAvailable:   row[9]?.toLowerCase()  !== 'false',
        isFeatured:    row[10]?.toLowerCase() === 'true',
        tags:          row[11]
          ? row[11].split(',').map((t: string) => t.trim()).filter(Boolean)
          : [],
        materials:        row[12]?.trim() || undefined,
        dimensions:       row[13]?.trim() || undefined,
        deliveryTime:     row[14]?.trim() || undefined,
        instagramPostUrl: row[15]?.trim() || undefined,
      }));

    cachedProducts = products;
    cacheTimestamp = now;
    console.log(`[Sheets] Loaded ${products.length} products`);
    return products;
  } catch (err) {
    console.error('[Sheets] Error fetching products:', err);
    return cachedProducts ?? [];
  }
}

export async function fetchProductById(id: string): Promise<Product | null> {
  const products = await fetchProducts();
  return products.find((p) => p.id === id) ?? null;
}

export async function fetchProductsByCategory(category: ProductCategory): Promise<Product[]> {
  const products = await fetchProducts();
  if (category === 'All') return products.filter((p) => p.isAvailable);
  return products.filter((p) => p.category === category && p.isAvailable);
}

export async function fetchFeaturedProducts(): Promise<Product[]> {
  const products = await fetchProducts();
  return products.filter((p) => p.isFeatured && p.isAvailable).slice(0, 8);
}

export function invalidateProductCache(): void {
  cachedProducts = null;
  cacheTimestamp = 0;
}
