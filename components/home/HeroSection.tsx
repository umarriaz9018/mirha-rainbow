'use client';
import Link        from 'next/link';
import { motion }  from 'framer-motion';

const TAGS = [
  'Ceramics', 'Painting', 'Calligraphy',
  'Aviation Art', 'Pottery', 'Plants', 'Trinkets', 'Sketching',
];

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-purple-50" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-amber-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl">

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-amber-200
                       rounded-full px-4 py-2 mb-6 shadow-sm"
          >
            <span className="text-sm font-medium text-amber-800">Handcrafted with love in Pakistan</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-playfair text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6"
          >
            Art that tells{' '}
            <span className="bg-gradient-to-r from-amber-500 via-red-500 to-purple-600 bg-clip-text text-transparent">
              your story
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed"
          >
            Unique handmade ceramics, paintings, calligraphy, pottery, and more.
            Ready-made pieces and fully custom orders - delivered nationwide across Pakistan.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <Link href="/gallery" className="btn-primary">Browse Collection</Link>
            <Link href="/order"   className="btn-secondary">Custom Order</Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap gap-2"
          >
            {TAGS.map((tag) => (
              <span key={tag}
                className="px-3 py-1.5 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-full text-sm text-gray-600 shadow-sm">
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
