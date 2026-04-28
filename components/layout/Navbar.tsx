'use client';
import { useState, useEffect } from 'react';
import Link                     from 'next/link';
import { usePathname }          from 'next/navigation';

const LINKS = [
  { label: 'Home',      href: '/' },
  { label: 'Gallery',   href: '/gallery' },
  { label: 'About',     href: '/about' },
  { label: 'Order Now', href: '/order', highlight: true },
];

export default function Navbar() {
  const [open,     setOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 via-red-400 to-purple-500
                            flex items-center justify-center text-white font-bold text-lg shadow-md
                            group-hover:scale-110 transition-transform">
              M
            </div>
            <div className="hidden sm:block">
              <p className="font-playfair font-bold text-gray-800 text-lg leading-tight">Mirha Rainbow</p>
              <p className="text-xs text-amber-600 font-medium leading-tight">Handmade Interiors &amp; Art</p>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  l.highlight
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:shadow-md hover:scale-105'
                    : pathname === l.href
                    ? 'text-amber-700 bg-amber-50'
                    : 'text-gray-600 hover:text-amber-700 hover:bg-amber-50'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition"
            aria-label="Toggle menu"
          >
            <span className="block w-5 h-0.5 bg-gray-600 mb-1" />
            <span className="block w-5 h-0.5 bg-gray-600 mb-1" />
            <span className="block w-5 h-0.5 bg-gray-600" />
          </button>
        </div>

        {open && (
          <div className="md:hidden border-t border-gray-100 py-4 space-y-1">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href}
                className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  l.highlight
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white text-center'
                    : pathname === l.href
                    ? 'text-amber-700 bg-amber-50'
                    : 'text-gray-600 hover:bg-amber-50 hover:text-amber-700'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
