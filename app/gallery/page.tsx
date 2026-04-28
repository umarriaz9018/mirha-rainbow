import { Suspense }           from 'react';
import { fetchProducts }       from '@/lib/googleSheets';
import ProductFilter           from '@/components/products/ProductFilter';
import ProductGrid             from '@/components/products/ProductGrid';
import type { Metadata }       from 'next';
import type { ProductCategory } from '@/types';

export const metadata: Metadata = {
  title:       'Gallery - Browse All Handmade Products',
  description: 'Browse our full collection of handmade ceramics, paintings, calligraphy, pottery, aviation art, and more.',
};

export const revalidate = 600;

interface Props { searchParams: { category?: string; search?: string } }

export default async function GalleryPage({ searchParams }: Props) {
  const all            = await fetchProducts();
  const activeCategory = (searchParams.category as ProductCategory) || 'All';
  const query          = searchParams.search?.toLowerCase() || '';

  const filtered = all.filter((p) => {
    const matchCat    = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch = !query ||
      p.name.toLowerCase().includes(query) ||
      p.tags.some((t) => t.toLowerCase().includes(query));
    return matchCat && matchSearch && p.isAvailable;
  });

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 py-16 px-4 text-center">
        <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Our Collection
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto text-lg">
          {all.length} handcrafted pieces - each one unique and made with love
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <Suspense fallback={<div className="text-center py-8 text-gray-400">Loading filters...</div>}>
          <ProductFilter
            activeCategory={activeCategory}
            searchQuery={searchParams.search || ''}
            totalResults={filtered.length}
          />
        </Suspense>

        <div className="mt-8">
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-6xl mb-4">&#x1F50D;</p>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
              <p className="text-gray-400">Try a different category or search term</p>
            </div>
          ) : (
            <ProductGrid products={filtered} />
          )}
        </div>
      </div>
    </div>
  );
}
