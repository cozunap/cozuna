import { getPageData } from "@/lib/cms";
import PageHero from "@/components/PageHero";
import GetAQuoteClient from "./GetAQuoteClient";

export const metadata = {
  title: "Get a Quote | COzuna Web Design & Printing",
  description: "Request a personalized quote for your next digital or print project.",
};

export default async function GetAQuotePage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang || 'en';
  
  const cmsData = await getPageData('contact');
  
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
      <GetAQuoteClient />
    </main>
  );
}
