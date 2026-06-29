import Image from "next/image";
import Link from "next/link";
import ClientPortfolio from "./ClientPortfolio";
import { getPortfolioProjects, getPageData } from "@/lib/cms";
import { getDictionary } from "@/lib/dictionaries";

export const metadata = {
  title: "What We Do - Portfolio | COzuna Web Design & Printing",
  description: "Explore our portfolio of successful web design, graphic design, and printing projects.",
};

export const revalidate = 60; // Revalidate every 60 seconds (ISR)

export default async function WhatWeDoPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const cmsData = await getPageData('portfolio');
  const dict = await getDictionary(lang as any);
  
  const fallbackPortfolioItems = [
    {
      title: "La Casa Del Mofongo MD",
      category: dict.portfolio.categories.web,
      image: "/assets/images/2024/10/la-casa-del-mofongo.webp",
      slug: "la-casa-del-mofongo"
    },
    {
      title: "Monica Nails Spa",
      category: dict.portfolio.categories.graphic,
      image: "/assets/images/2024/10/spa.webp",
    },
    {
      title: "La Shisha Restaurant",
      category: dict.portfolio.categories.web,
      image: "/assets/images/2024/10/lashisha.webp",
    },
    {
      title: "Elsy Leonso",
      category: dict.portfolio.categories.graphic,
      image: "/assets/images/2024/10/elsyleonso.webp",
    },
    {
      title: "Crossway Driving School",
      category: dict.portfolio.categories.graphic,
      image: "/assets/images/2024/10/crossway_business_card.webp",
    },
    {
      title: "City Shields NY",
      category: dict.portfolio.categories.graphic,
      image: "/assets/images/2024/10/cityshieldsny.webp",
    },
    {
      title: "Overall HVAC NJ",
      category: dict.portfolio.categories.web,
      image: "/assets/images/2024/10/overallhvacnj.webp",
    },
    {
      title: "Jacinthe Studio",
      category: dict.portfolio.categories.graphic,
      image: "/assets/images/2024/10/jacinthestudio.webp",
    },
    {
      title: "TBS Tax Services",
      category: dict.portfolio.categories.graphic,
      image: "/assets/images/2024/10/tbstax.webp",
    },
  ];

  let portfolioItems = await getPortfolioProjects();
  if (!portfolioItems || portfolioItems.length === 0) {
    portfolioItems = fallbackPortfolioItems;
  }

  // Update categories using dictionary values
  portfolioItems = portfolioItems.map((item: any) => {
    let cat = item.category || item.category_en;
    if (cat?.includes('Web')) cat = dict.portfolio.categories.web;
    else if (cat?.includes('Graphic') || cat?.includes('Branding')) cat = dict.portfolio.categories.graphic;
    else if (cat?.includes('Print')) cat = dict.portfolio.categories.print;
    else if (cat?.includes('Signage')) cat = dict.portfolio.categories.signage;
    
    return { ...item, category: cat };
  });

  const heroTitleStart = dict.portfolio.heroTitleStart;
  const heroTitleHighlight = dict.portfolio.heroTitleHighlight;
  const heroSubtitle = cmsData?.heroSubtitle?.[lang] || dict.portfolio.heroSubtitle;

  return (
    <main className="flex min-h-screen flex-col bg-zinc-950">
      {/* Minimal Hero Section */}
      <section className="relative pt-32 pb-16 px-6 lg:px-8 border-b border-zinc-800 bg-brand-dark">
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-brand-primary/20 to-transparent top-0"></div>
          <div className="absolute w-[800px] h-[400px] bg-brand-primary/5 rounded-full blur-[100px] -top-[200px] left-1/2 -translate-x-1/2"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl mb-6">
            {heroTitleStart} <span className="text-brand-primary">{heroTitleHighlight}</span>
          </h1>
          <p className="mt-4 text-xl leading-8 text-zinc-400 max-w-2xl mx-auto font-light">
            {heroSubtitle}
          </p>
        </div>
      </section>

      {/* Portfolio Grid Client Component */}
      <ClientPortfolio initialItems={portfolioItems} dict={dict} />

      {/* CTA Section */}
      <section className="py-24 bg-brand-dark px-6 lg:px-8 text-center mt-auto border-t border-zinc-900">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-6">
            {dict.portfolio.cta.title}
          </h2>
          <p className="text-lg text-zinc-400 mb-10 max-w-xl mx-auto">
            {dict.portfolio.cta.description}
          </p>
          <Link
            href="/get-a-quote"
            className="inline-block rounded-full bg-brand-primary px-8 py-4 text-sm font-bold text-white shadow-lg hover:bg-red-500 transition-colors"
          >
            {dict.portfolio.cta.button}
          </Link>
        </div>
      </section>
    </main>
  );
}
