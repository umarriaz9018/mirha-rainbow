'use client';
import Link          from 'next/link';
import { motion }    from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const STEPS = [
  { n:'01', title:'Browse or Describe',   desc:'Browse our gallery for ready-made pieces, or describe what you want for a custom order.',         grad:'from-amber-400 to-orange-400' },
  { n:'02', title:'We Get in Touch',      desc:"Fill our simple order form. We will contact you on WhatsApp or email within 24 hours.",           grad:'from-orange-400 to-red-400'   },
  { n:'03', title:'Handcrafted for You',  desc:'Your piece is handcrafted with love. We share progress photos for custom orders!',                grad:'from-red-400 to-pink-400'     },
  { n:'04', title:'Delivered Nationwide', desc:'Carefully packaged and delivered to your door anywhere in Pakistan via trusted courier.',          grad:'from-pink-400 to-purple-400'  },
];

export default function HowItWorks() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <section ref={ref} className="py-20 bg-[#fdf8f4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity:0, y:20 }} animate={inView ? { opacity:1, y:0 } : {}}
            className="font-playfair text-4xl sm:text-5xl font-bold text-gray-900 mb-4"
          >
            How It Works
          </motion.h2>
          <motion.p
            initial={{ opacity:0, y:20 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ delay:0.1 }}
            className="text-gray-500 max-w-lg mx-auto"
          >
            Getting your perfect handcrafted piece is simple and easy
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity:0, y:40 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ delay: i * 0.12 }}
              className="flex flex-col items-center text-center"
            >
              <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${s.grad} flex items-center justify-center
                               text-white font-bold text-2xl shadow-lg mb-5 hover:scale-110 transition-transform`}>
                {s.n}
              </div>
              <h3 className="font-semibold text-gray-800 text-lg mb-2">{s.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity:0, y:20 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ delay:0.6 }}
          className="text-center mt-14"
        >
          <Link href="/order" className="btn-primary">Place Your Order Now</Link>
        </motion.div>
      </div>
    </section>
  );
}
