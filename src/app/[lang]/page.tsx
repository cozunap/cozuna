import HomeContent from "./HomeContent";
import { getDictionary } from "@/lib/dictionaries";
import { getPageData, getPortfolioProjects } from "@/lib/cms";
import { Metadata } from 'next';

export const revalidate = 60; // ISR for SEO

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  return {
    alternates: {
      canonical: `/${resolvedParams.lang}`
    }
  };
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const dict = await getDictionary(lang as 'en' | 'es' | 'fr');
  
  const [cmsData, portfolioItems] = await Promise.all([
    getPageData('home'),
    getPortfolioProjects()
  ]);

  return <HomeContent lang={lang} dict={dict} cmsData={cmsData} portfolioItems={portfolioItems || []} />;
}
