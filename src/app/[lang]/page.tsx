import HomeContent from "./HomeContent";
import { getDictionary } from "@/lib/dictionaries";
import { getPageData, getPortfolioProjects, getAEOFAQs } from "@/lib/cms";
import { Metadata } from 'next';

export const revalidate = 60; // ISR for SEO

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;

  const title = lang === 'fr'
    ? "Conception de sites Web à New York | COzuna"
    : lang === 'es'
    ? "Diseño Web en New York | COzuna Web Agency"
    : "Web Design New York NY | COzuna Web Design Agency";

  const description = lang === 'fr'
    ? "Conception de sites Web sur mesure, image de marque et impression professionnelle pour entreprises à New York."
    : lang === 'es'
    ? "Diseño de páginas web a medida, branding e impresión profesional para empresas en New York."
    : "Custom web design, branding, and printing services tailored for businesses in New York.";

  return {
    title,
    description,
    alternates: {
      canonical: `/${lang}`
    }
  };
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const dict = await getDictionary(lang as 'en' | 'es' | 'fr');
  
  const [cmsData, portfolioItems, aeoFaqs] = await Promise.all([
    getPageData('home'),
    getPortfolioProjects(),
    getAEOFAQs(lang)
  ]);

  return <HomeContent lang={lang} dict={dict} cmsData={cmsData} portfolioItems={portfolioItems || []} aeoFaqs={aeoFaqs} />;
}
