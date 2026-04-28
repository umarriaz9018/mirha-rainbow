'use client';
import Link          from 'next/link';
import { motion }    from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CATEGORIES } from '@/types';

export default function CategoryShowcase() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <section ref={ref} className="py-20 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-14">
        <motion.p
          initial={{ opacity:0, y:10 }} animate={inView ? { opacity:1, y:0 } : {}}
          className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-3"
        >
          What We Create
        </motion.p>
        <motion.h2
          initial={{ opacity:0, y:20 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ delay:0.1 }}
          className="font-playfair text-4xl sm:text-5xl font-bold text-gray-900"
        >
          Our Categories
        </motion.h2>
        <motion.p
          initial={{ opacity:0, y:20 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ delay:0.2 }}
          className="mt-4 text-gray-500 max-w-xl mx-auto"
        >
          Every piece is made by hand with care, creativity, and a splash of color
        </motion.p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {CATEGORIES.map((cat, idx) => (
          <motion.div
            key={cat.name}
            initial={{ opacity:0, y:30 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ delay: idx * 0.07 }}
          >
            <Link
              href={`/gallery?category=${encodeURIComponent(cat.name)}`}
              className={`group flex flex-col items-center gap-3 p-6 rounded-2xl border-2 border-transparent
                          ${cat.bgColor} hover:border-current hover:shadow-lg transition-all duration-300 ${cat.color}`}
            >
              <span className="text-4xl group-hover:scale-125 transition-transform duration-300">
                {cat.emoji}
              </span>
              <div className="text-center">
                <p className="font-semibold text-sm">{cat.name}</p>
                <p className="text-xs mt-1 opacity-70 hidden sm:block">{cat.description}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
