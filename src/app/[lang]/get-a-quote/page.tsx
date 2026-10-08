import { getPageData, getQuoteSettings } from "@/lib/cms";
import PageHero from "@/components/PageHero";
import GetAQuoteClient from "./GetAQuoteClient";
import { getDictionary } from "@/lib/dictionaries";

import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.lang || 'en';

  const title = lang === 'fr'
    ? "Demander un Devis Gratuit | Agence Web COzuna"
    : lang === 'es'
    ? "Solicitar Cotización | Agencia Web COzuna"
    : "Get a Free Quote | Web Design, Branding & Print | COzuna";

  const description = lang === 'fr'
    ? "Demandez une soumission gratuite pour la conception de votre site Web, design graphique ou impression à Laval, Montréal et ailleurs."
    : lang === 'es'
    ? "Solicita una cotización personalizada para tu sitio web, diseño gráfico o impresión en Laval, Montreal o internacionalmente."
    : "Request a personalized quote for your next custom web design, branding, or high-quality printing project.";

  return {
    title,
    description,
    alternates: {
      canonical: `/${lang}/get-a-quote`
    }
  };
}

export default async function GetAQuotePage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang || 'en';
  
  const cmsData = await getPageData('contact');
  const quoteSettings = await getQuoteSettings();
  const dict = await getDictionary(lang as any);
  
  const heroTitle = cmsData?.heroTitle?.[lang] || (
    <>{dict.quote.step1.title}</>
  );
  const heroSubtitle = cmsData?.heroSubtitle?.[lang] || dict.quote.step1.subtitle;
  const heroImage = cmsData?.heroImage;

  return (
    <main className="flex min-h-screen flex-col bg-zinc-950">
      <PageHero 
        title={heroTitle} 
        subtitle={heroSubtitle} 
        backgroundImage={heroImage} 
      />
      <GetAQuoteClient 
        dynamicServices={quoteSettings?.services || []} 
        dynamicBudgets={quoteSettings?.budgets || []} 
        dict={dict.quote}
        lang={lang}
      />
    </main>
  );
}
