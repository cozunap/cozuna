import Image from "next/image";
import Link from "next/link";
import ClientPortfolio from "./ClientPortfolio";
const fallbackPortfolioItems = [
  {
    title: "La Casa Del Mofongo MD",
    category: "Web & Print",
    image: "/assets/images/2024/10/la-casa-del-mofongo.webp",
    slug: "la-casa-del-mofongo"
  },
  {
    title: "Monica Nails Spa",
    category: "Brand Identity",
    image: "/assets/images/2024/10/spa.webp",
  },
  {
    title: "La Shisha Restaurant",
    category: "Web Design",
    image: "/assets/images/2024/10/lashisha.webp",
  },
  {
    title: "Elsy Leonso",
    category: "Graphic Design",
    image: "/assets/images/2024/10/elsyleonso.webp",
  },
  {
    title: "Crossway Driving School",
    category: "Printing",
    image: "/assets/images/2024/10/crossway_business_card.webp",
  },
  {
    title: "City Shields NY",
    category: "Brand Identity",
    image: "/assets/images/2024/10/cityshieldsny.webp",
  },
  {
    title: "Overall HVAC NJ",
    category: "Web Development",
    image: "/assets/images/2024/10/overallhvacnj.webp",
  },
  {
    title: "Jacinthe Studio",
    category: "Graphic Design",
    image: "/assets/images/2024/10/jacinthestudio.webp",
  },
  {
    title: "TBS Tax Services",
    category: "Brand Identity & Print",
    image: "/assets/images/2024/10/tbstax.webp",
  },
];

export const metadata = {
  title: "What We Do - Portfolio | COzuna Web Design & Printing",
  description: "Explore our portfolio of successful web design, graphic design, and printing projects.",
};

export const revalidate = 60; // Revalidate every 60 seconds (ISR)

export default async function WhatWeDoPage() {
  const portfolioItems = fallbackPortfolioItems;

  return (
    <main className="flex min-h-screen flex-col bg-zinc-950">
      {/* Header */}
      <section className="relative py-24 sm:py-32 px-6 lg:px-8 border-b border-zinc-900 bg-brand-dark overflow-hidden">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl mb-6">What We Do</h1>
          <p className="mt-6 text-xl leading-8 text-zinc-300 max-w-2xl mx-auto font-light">
            A showcase of our best work. We let our results speak for themselves.
          </p>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-24 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ClientPortfolio items={portfolioItems} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-brand-dark px-6 lg:px-8 text-center mt-auto border-t border-zinc-900">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-6">
            Want to see your project here?
          </h2>
          <p className="text-lg text-zinc-400 mb-10 max-w-xl mx-auto">
            Contact us today for a free consultation and let's start building your digital identity.
          </p>
          <Link
            href="/get-a-quote"
            className="inline-block rounded-full bg-brand-primary px-8 py-4 text-sm font-bold text-white shadow-lg hover:bg-red-500 transition-colors"
          >
            Start Your Project
          </Link>
        </div>
      </section>
    </main>
  );
}
