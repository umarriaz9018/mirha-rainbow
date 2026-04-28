'use client';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useCallback }   from 'react';
import { CATEGORIES }    from '@/types';
import type { ProductCategory } from '@/types';

interface Props {
  activeCategory: ProductCategory;
  searchQuery:    string;
  totalResults:   number;
}

export default function ProductFilter({ activeCategory, searchQuery, totalResults }: Props) {
  const router       = useRouter();
  const pathname     = usePathname();
  const searchParams = useSearchParams();

  const update = useCallback((key: string, value: string) => {
    const p = new URLSearchParams(searchParams.toString());
    if (value) p.set(key, value); else p.delete(key);
    router.push(`${pathname}?${p.toString()}`);
  }, [router, pathname, searchParams]);

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Search products..."
          defaultValue={searchQuery}
          onChange={(e) => update('search', e.target.value)}
          className="w-full max-w-md px-4 py-2.5 border border-amber-300 rounded-full
                     focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white text-sm"
        />
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button
          onClick={() => update('category', '')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeCategory === 'All'
              ? 'bg-amber-500 text-white shadow-sm'
              : 'bg-white border border-gray-200 text-gray-600 hover:border-amber-400'
          }`}
        >
          All
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.name}
            onClick={() => update('category', cat.name)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === cat.name
                ? 'bg-amber-500 text-white shadow-sm'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-amber-400'
            }`}
          >
            {cat.emoji} {cat.name}
          </button>
        ))}
      </div>

      <p className="text-center text-sm text-gray-400">
        Showing <strong className="text-gray-700">{totalResults}</strong> products
        {activeCategory !== 'All' && (
          <> in <strong className="text-amber-600">{activeCategory}</strong></>
        )}
      </p>
    </div>
  );
}
