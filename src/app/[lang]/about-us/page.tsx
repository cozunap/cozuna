import Image from "next/image";
import Link from "next/link";
import { getPageData } from "@/lib/cms";

export const metadata = {
  title: "About Us | COzuna Web Design & Printing",
  description: "Learn more about COzuna, our mission, and our passion for building digital and print identities.",
};

export const revalidate = 60; // ISR for SEO

export default async function AboutUsPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const cmsData = await getPageData('about');

  const heroTitle = cmsData?.heroTitle?.[lang] || (lang === 'es' ? "Quiénes " : lang === 'fr' ? "Qui Nous " : "Who We ");
  const heroTitleHighlight = lang === 'es' ? "Somos" : lang === 'fr' ? "Sommes" : "Are";
  const heroSubtitle = cmsData?.heroSubtitle?.[lang] || "We are a passionate team of designers, developers, and print specialists dedicated to bringing your brand's vision to life.";
  const philosophyTitle = cmsData?.philosophyTitle?.[lang] || "What Drives Us";
  const mainImage = cmsData?.image || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000&auto=format&fit=crop";

  return (
    <main className="flex min-h-screen flex-col bg-zinc-950">
      {/* Hero Section */}
      <section className="relative py-32 px-6 lg:px-8 overflow-hidden bg-brand-dark">
        {/* Glow Effects */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
          <div className="absolute w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-brand-primary/10 rounded-full blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl mb-6">
              {heroTitle} <span className="text-brand-primary">{heroTitleHighlight}</span>
            </h1>
            <p className="text-xl leading-8 text-zinc-300 mb-8 font-light whitespace-pre-wrap">
              {heroSubtitle}
            </p>
            <div className="flex gap-4">
              <div className="flex flex-col">
                <span className="text-4xl font-black text-brand-primary">10+</span>
                <span className="text-sm text-zinc-500 uppercase tracking-wider font-bold mt-1">Years Experience</span>
              </div>
              <div className="w-px h-16 bg-zinc-800 mx-4"></div>
              <div className="flex flex-col">
                <span className="text-4xl font-black text-white">500+</span>
                <span className="text-sm text-zinc-500 uppercase tracking-wider font-bold mt-1">Projects Delivered</span>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 relative aspect-square lg:aspect-auto lg:h-[600px] rounded-3xl overflow-hidden border border-zinc-800">
            <img
              src={mainImage}
              alt="About COzuna"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 px-6 lg:px-8 bg-zinc-900 border-t border-zinc-800">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-brand-primary tracking-widest uppercase">Our Philosophy</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">{philosophyTitle}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-zinc-950 p-10 rounded-3xl border border-zinc-800 hover:border-brand-primary/50 transition-colors">
              <div className="w-12 h-12 bg-brand-primary/20 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Innovation First</h3>
              <p className="text-zinc-400">We constantly push boundaries to deliver modern, cutting-edge solutions that keep our clients ahead of the curve.</p>
            </div>
            
            <div className="bg-zinc-950 p-10 rounded-3xl border border-zinc-800 hover:border-brand-primary/50 transition-colors">
              <div className="w-12 h-12 bg-brand-primary/20 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Fast Execution</h3>
              <p className="text-zinc-400">We respect your time. Our streamlined processes ensure high-quality delivery without unnecessary delays.</p>
            </div>
            
            <div className="bg-zinc-950 p-10 rounded-3xl border border-zinc-800 hover:border-brand-primary/50 transition-colors">
              <div className="w-12 h-12 bg-brand-primary/20 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.514" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Client Success</h3>
              <p className="text-zinc-400">Your success is our success. We build long-term relationships by consistently over-delivering on our promises.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 lg:px-8 text-center mt-auto border-t border-zinc-900">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-6">
            Join Our Story
          </h2>
          <p className="text-lg text-zinc-400 mb-10 max-w-xl mx-auto">
            Ready to work with a team that cares about your brand as much as you do?
          </p>
          <Link
            href="/get-a-quote"
            className="inline-block rounded-full bg-brand-primary px-8 py-4 text-sm font-bold text-white shadow-lg hover:bg-red-500 transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </main>
  );
}
