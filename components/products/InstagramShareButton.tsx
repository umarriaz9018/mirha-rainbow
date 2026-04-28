'use client';
import { useState }               from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast                       from 'react-hot-toast';
import { generateInstagramShare }  from '@/lib/instagramShare';
import { Product }                 from '@/types';

export default function InstagramShareButton({ product }: { product: Product }) {
  const [open,   setOpen]   = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const siteUrl  = process.env.NEXT_PUBLIC_SITE_URL        ?? '';
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '';
  const content  = generateInstagramShare(product, siteUrl, waNumber);

  const copy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      toast.success(`${label} copied!`);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      toast.error('Could not copy - please select text manually.');
    }
  };

  const SECTIONS = [
    { step: '1', title: 'Product Link',            desc: 'Add to bio or link-in-bio tool', text: content.websiteLink,  label: 'Link'         },
    { step: '2', title: 'Post Caption',            desc: 'Copy for your Instagram post',   text: content.caption,      label: 'Caption'      },
    { step: '3', title: 'Hashtags (30 optimized)', desc: 'Paste at end of caption',        text: content.hashtags,     label: 'Hashtags'     },
    { step: '4', title: 'Full Caption + Hashtags', desc: 'Everything in one go!',          text: content.fullCaption,  label: 'Full Caption' },
    { step: '5', title: 'Story Text',              desc: 'Short text for Stories',         text: content.storyText,    label: 'Story'        },
  ];

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-purple-300
                   text-purple-700 hover:bg-purple-50 font-medium text-sm transition-all hover:scale-105"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
        </svg>
        Share on Instagram
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity:0, scale:0.9, y:20 }}
              animate={{ opacity:1, scale:1,   y:0  }}
              exit={{   opacity:0, scale:0.9,  y:20 }}
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 max-w-2xl mx-auto
                         bg-white rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-3xl">
                <h3 className="font-bold text-gray-900">Share on Instagram</h3>
                <button onClick={() => setOpen(false)} className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
                  &#x2715;
                </button>
              </div>

              <div className="p-6 space-y-4">
                {SECTIONS.map((s) => (
                  <div
                    key={s.step}
                    className={`rounded-2xl border p-4 ${s.step === '4' ? 'border-amber-300 bg-amber-50' : 'border-gray-200 bg-gray-50'}`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${s.step === '4' ? 'bg-amber-500 text-white' : 'bg-gray-300 text-gray-700'}`}>
                            Step {s.step}
                          </span>
                          <span className="font-semibold text-gray-800 text-sm">{s.title}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">{s.desc}</p>
                      </div>
                      <button
                        onClick={() => copy(s.text, s.label)}
                        className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                          copied === s.label
                            ? 'bg-green-500 text-white'
                            : 'bg-white border border-gray-300 text-gray-700 hover:border-amber-400'
                        }`}
                      >
                        {copied === s.label ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <div className="mt-2 p-3 bg-white rounded-xl text-xs font-mono leading-relaxed max-h-28 overflow-y-auto whitespace-pre-wrap break-all text-gray-600">
                      {s.text}
                    </div>
                  </div>
                ))}

                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-4
                             bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400
                             text-white font-bold rounded-2xl hover:opacity-90 transition-all"
                >
                  Open Instagram to Post
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
