import { getPageData, getQuoteSettings } from "@/lib/cms";
import PageHero from "@/components/PageHero";
import GetAQuoteClient from "./GetAQuoteClient";
import { getDictionary } from "@/lib/dictionaries";

export const metadata = {
  title: "Get a Quote | COzuna Web Design & Printing",
  description: "Request a personalized quote for your next digital or print project.",
};

export default async function GetAQuotePage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang || 'en';
  
  const cmsData = await getPageData('contact');
  const quoteSettings = await getQuoteSettings();
  const dict = await getDictionary(lang as any);
  
  const heroTitle = cmsData?.heroTitle?.[lang] || (
    <>Start Your <span className="text-brand-primary">Project</span></>
  );
  const heroSubtitle = cmsData?.heroSubtitle?.[lang] || "Let's build something amazing together. Complete the steps below to request a personalized quote.";
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
