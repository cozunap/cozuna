import HomeContent from "./HomeContent";
import { getDictionary } from "@/lib/dictionaries";
import { getPageData, getPortfolioProjects, getAEOFAQs } from "@/lib/cms";
import { Metadata } from 'next';

export const revalidate = 60; // ISR for SEO

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;

  const title = lang === 'fr'
    ? "Conception de sites Web à Laval et Montréal | COzuna"
    : lang === 'es'
    ? "Diseño Web en Laval y Montreal | COzuna Web Agency"
    : "Web Design Laval & Montreal | COzuna";

  const description = lang === 'fr'
    ? "Conception de sites Web sur mesure, image de marque et impression professionnelle pour entreprises à Laval et Montréal."
    : lang === 'es'
    ? "Diseño de páginas web a medida, branding e impresión profesional para empresas en Laval, Montreal y globalmente."
    : "Custom web design, branding, and printing services tailored for businesses in Laval, Montreal, and worldwide.";

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
