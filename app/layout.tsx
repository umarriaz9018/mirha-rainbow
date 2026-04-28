import type { Metadata }            from 'next';
import { Inter, Playfair_Display }   from 'next/font/google';
import './globals.css';
import Navbar         from '@/components/layout/Navbar';
import Footer         from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import { Toaster }    from 'react-hot-toast';

const inter    = Inter({             subsets: ['latin'], variable: '--font-inter',    display: 'swap' });
const playfair = Playfair_Display({  subsets: ['latin'], variable: '--font-playfair', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  ),
  title: {
    default:  'Mirha Rainbow Interiors | Handmade Art & Decor',
    template: '%s | Mirha Rainbow Interiors',
  },
  description: 'Discover handcrafted ceramics, paintings, calligraphy, pottery, aviation art and more. Custom orders welcome. Nationwide delivery across Pakistan.',
  keywords:    ['handmade ceramics Pakistan', 'custom calligraphy', 'pottery Pakistan', 'handmade gifts', 'aviation art', 'Mirha Rainbow Interiors'],
  openGraph: {
    type:     'website',
    locale:   'en_PK',
    siteName: 'Mirha Rainbow Interiors',
    images:   [{ url: '/images/og-image.jpg', width: 1200, height: 630 }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-[#fdf8f4] text-gray-800 antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppButton />
        <Toaster
          position="top-center"
          toastOptions={{ duration: 4000, style: { borderRadius: '12px' } }}
        />
      </body>
    </html>
  );
}
