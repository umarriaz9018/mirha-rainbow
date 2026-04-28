'use client';
import { useState }  from 'react';
import Image         from 'next/image';
import Link          from 'next/link';
import { Product }   from '@/types';

export default function ProductCard({ product }: { product: Product }) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-amber-100">

      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,25vw"
        />

        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {!product.isAvailable && (
            <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded-full">Sold Out</span>
          )}
          {product.orderType === 'made-to-order' && (
            <span className="bg-amber-500 text-white text-xs px-2 py-1 rounded-full">Custom</span>
          )}
        </div>

        <button
          onClick={() => setLiked(!liked)}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform"
          aria-label="Like"
        >
          <svg className={`w-5 h-5 ${liked ? 'text-red-500 fill-current' : 'text-gray-400'}`}
               viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>

      <div className="p-4">
        <p className="text-xs text-amber-600 font-medium uppercase tracking-wide mb-1">{product.category}</p>
        <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{product.shortDescription}</p>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-amber-800">{product.priceDisplay}</span>
          <Link
            href={`/product/${product.id}`}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              product.isAvailable
                ? 'bg-amber-500 hover:bg-amber-600 text-white'
                : 'bg-gray-200 text-gray-400 pointer-events-none'
            }`}
          >
            {product.isAvailable ? 'View' : 'Unavailable'}
          </Link>
        </div>
      </div>
    </div>
  );
}
