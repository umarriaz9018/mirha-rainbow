import { notFound }           from 'next/navigation';
import Image                   from 'next/image';
import Link                    from 'next/link';
import { fetchProductById, fetchProducts } from '@/lib/googleSheets';
import InstagramShareButton    from '@/components/products/InstagramShareButton';
import type { Metadata }       from 'next';

interface Props { params: { id: string } }

export async function generateStaticParams() {
  const products = await fetchProducts();
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await fetchProductById(params.id);
  if (!p) return { title: 'Product Not Found' };
  return {
    title:       p.name,
    description: p.shortDescription || p.description,
    openGraph:   { images: [{ url: p.images[0] }] },
  };
}

export const revalidate = 600;

export default async function ProductPage({ params }: Props) {
  const product = await fetchProductById(params.id);
  if (!product) notFound();

  const orderLabel =
    product.orderType === 'ready-made'    ? 'Ready to Ship'              :
    product.orderType === 'made-to-order' ? 'Made-to-Order'              :
    'Ready-Made & Custom Available';

  const waText   = encodeURIComponent(`Hi! I am interested in ${product.name}. Is it available?`);
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '';

  return (
    <div className="min-h-screen bg-[#fdf8f4]">
      <div className="max-w-6xl mx-auto px-4 py-12">

        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8 flex-wrap">
          <Link href="/"        className="hover:text-amber-600">Home</Link>
          <span>/</span>
          <Link href="/gallery" className="hover:text-amber-600">Gallery</Link>
          <span>/</span>
          <Link href={`/gallery?category=${product.category}`} className="hover:text-amber-600">{product.category}</Link>
          <span>/</span>
          <span className="text-gray-700 font-medium truncate">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-white shadow-sm">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width:1024px) 100vw, 50vw"
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.slice(1).map((img, i) => (
                  <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-white shadow-sm">
                    <Image src={img} alt={`${product.name} ${i + 2}`} fill className="object-cover" sizes="25vw" />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <span className="text-sm font-semibold text-amber-600 uppercase tracking-widest">
                {product.category}
              </span>
              <h1 className="font-playfair text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-3">
                {product.name}
              </h1>
              <p className="text-gray-500 leading-relaxed">{product.description}</p>
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-3xl font-bold text-amber-700">{product.priceDisplay}</span>
              <span className="px-3 py-1.5 bg-amber-100 text-amber-800 text-sm font-semibold rounded-full">
                {orderLabel}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {product.materials    && <DetailCard label="Materials"  value={product.materials}    />}
              {product.dimensions   && <DetailCard label="Dimensions" value={product.dimensions}   />}
              {product.deliveryTime && <DetailCard label="Delivery"   value={product.deliveryTime} />}
              <DetailCard label="Ships to" value="All Pakistan" />
            </div>

            {product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href={`/order?product=${product.id}&name=${encodeURIComponent(product.name)}&category=${product.category}`}
                className="flex-1 text-center py-4 bg-gradient-to-r from-amber-500 to-orange-500
                           text-white font-bold rounded-2xl shadow-lg hover:shadow-xl
                           hover:scale-[1.02] transition-all"
              >
                Order This Product
              </Link>
              <a
                href={`https://wa.me/${waNumber}?text=${waText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center py-4 bg-green-500 hover:bg-green-600
                           text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all"
              >
                Ask on WhatsApp
              </a>
            </div>

            <InstagramShareButton product={product} />

            {product.instagramPostUrl && (
              <a
                href={product.instagramPostUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-purple-600 hover:text-purple-800 transition-colors"
              >
                View original Instagram post
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white rounded-xl p-3 border border-gray-100">
      <p className="text-xs text-gray-400 mb-0.5">{label}</p>
      <p className="text-sm font-semibold text-gray-700">{value}</p>
    </div>
  );
}
