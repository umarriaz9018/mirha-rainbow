import HeroSection      from '@/components/home/HeroSection';
import CategoryShowcase from '@/components/home/CategoryShowcase';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import HowItWorks       from '@/components/home/HowItWorks';
import InstagramCTA     from '@/components/home/InstagramCTA';
import { fetchFeaturedProducts } from '@/lib/googleSheets';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:       'Handmade Art & Decor - Ceramics, Painting, Calligraphy & More',
  description: 'Beautiful handcrafted art from Pakistan. Shop ceramics, paintings, calligraphy, pottery, and more. Custom orders available. Nationwide delivery.',
};

export const revalidate = 600;

export default async function HomePage() {
  const featured = await fetchFeaturedProducts();
  return (
    <>
      <HeroSection />
      <CategoryShowcase />
      <FeaturedProducts products={featured} />
      <HowItWorks />
      <InstagramCTA />
    </>
  );
}
