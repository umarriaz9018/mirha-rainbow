import Link        from 'next/link';
import ProductCard  from '@/components/products/ProductCard';
import { Product }  from '@/types';

export default function FeaturedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-2">Handpicked for You</p>
            <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-gray-900">Featured Pieces</h2>
          </div>
          <Link href="/gallery" className="hidden sm:inline-flex items-center gap-2 text-amber-600 font-semibold hover:text-amber-800 transition-colors">
            View all &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>

        <div className="text-center mt-10 sm:hidden">
          <Link href="/gallery" className="btn-primary">View All Products</Link>
        </div>
      </div>
    </section>
  );
}
