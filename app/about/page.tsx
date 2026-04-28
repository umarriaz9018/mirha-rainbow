import Link          from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:       'About Us - Mirha Rainbow Interiors',
  description: 'Learn about Mirha Rainbow Interiors - handcrafted art, ceramics, calligraphy and more from Pakistan.',
};

const PRODUCTS = [
  'Ceramics', 'Aviation Art', 'Trinkets', 'Sketching',
  'Painting', 'Pottery', 'Plants', 'Calligraphy',
];

const PROMISES = [
  'Every piece is 100% handmade',
  'Custom orders are always welcome - we love creating something unique just for you',
  'We share progress photos for all custom orders',
  'Carefully packaged and delivered nationwide across Pakistan',
  'No payment required until you are satisfied with the design',
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#fdf8f4]">
      <div className="max-w-4xl mx-auto px-4 py-20">

        <div className="text-center mb-16">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 via-red-400 to-purple-500
                          flex items-center justify-center text-white text-4xl font-bold mx-auto mb-6 shadow-xl">
            M
          </div>
          <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Mirha Rainbow Interiors
          </h1>
          <p className="text-xl text-amber-600 font-medium">Handcrafted with love in Pakistan</p>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-gray-100 space-y-10">

          <div>
            <h2 className="font-playfair text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-gray-600 leading-relaxed">
              Mirha Rainbow Interiors was born from a passion for handcrafted art and a desire to bring color,
              warmth, and personality into every home. Every piece we create is made entirely by hand with love
              and attention to detail.
            </p>
          </div>

          <div>
            <h2 className="font-playfair text-2xl font-bold text-gray-900 mb-4">What We Create</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {PRODUCTS.map((name) => (
                <div key={name} className="text-center p-4 bg-amber-50 rounded-2xl">
                  <p className="text-sm font-medium text-amber-800 mt-2">{name}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-playfair text-2xl font-bold text-gray-900 mb-4">Our Promise</h2>
            <div className="space-y-3">
              {PROMISES.map((p) => (
                <div key={p} className="flex items-start gap-3">
                  <span className="text-amber-500 font-bold text-lg mt-0.5">&#x2713;</span>
                  <p className="text-gray-600">{p}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Link href="/gallery" className="btn-primary">Browse Our Collection</Link>
            <Link href="/order"   className="btn-secondary">Place a Custom Order</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
