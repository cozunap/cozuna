"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Monitor, PenTool, Printer, Presentation, ArrowUpRight, Sparkles, CheckCircle2 } from "lucide-react";
import DynamicTestimonials from '@/components/DynamicTestimonials';
import FAQSection from '@/components/FAQSection';

export default function HomeContent({ lang, dict, cmsData, portfolioItems = [], aeoFaqs = [] }: { lang: string, dict: any, cmsData: any, portfolioItems?: any[], aeoFaqs?: any[] }) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] } }
  };

  const heroTitle = cmsData?.heroTitle?.[lang] || dict.home.heroTitle;
  const heroSubtitle = cmsData?.heroSubtitle?.[lang] || dict.home.heroSubtitle;
  
  const heroMediaType = cmsData?.heroMediaType || 'video';
  const heroImage = cmsData?.heroImage || '/assets/images/2024/10/main-photo.webp';
  const heroVideo = cmsData?.heroVideo?.[lang] || "/videos/designer-working.mp4";

  const heroOverlayOpacity = cmsData?.heroOverlayOpacity !== undefined ? cmsData.heroOverlayOpacity : 82;
  const overlayOpacityDecimal = heroOverlayOpacity / 100;

  const titleWords = heroTitle.split(' ');
  const titleStart = titleWords.slice(0, -2).join(' ');
  const titleEnd = titleWords.slice(-2).join(' ');

  const badgeText = lang === 'fr' 
    ? 'Agence Web & Impression Haute Fidélité' 
    : lang === 'es' 
    ? 'Agencia de Diseño Web e Imprenta de Alto Nivel' 
    : 'Premium Web Design & High-Volume Print Agency';

  const servicesList = [
    {
      icon: Monitor,
      title: dict.home.services.web.title,
      description: dict.home.services.web.description,
      href: `/${lang}/affordable-web-development`,
      tag: 'Next.js & React',
      gradient: 'from-blue-600/20 to-cyan-500/10'
    },
    {
      icon: PenTool,
      title: dict.home.services.graphic.title,
      description: dict.home.services.graphic.description,
      href: `/${lang}/graphic-design-for-small-business`,
      tag: 'Brand Identity',
      gradient: 'from-purple-600/20 to-pink-500/10'
    },
    {
      icon: Printer,
      title: dict.home.services.print.title,
      description: dict.home.services.print.description,
      href: `/${lang}/services`,
      tag: 'High-Volume Print',
      gradient: 'from-amber-600/20 to-orange-500/10'
    },
    {
      icon: Presentation,
      title: dict.home.services.signage.title,
      description: dict.home.services.signage.description,
      href: `/${lang}/landing-page-design`,
      tag: 'Coroplast & Large Format',
      gradient: 'from-emerald-600/20 to-teal-500/10'
    }
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-between overflow-x-hidden">
      
      {/* Hero Section with Ambient Glow (Supahero style) - Full 100vh Screen */}
      <section className="relative w-full min-h-[100vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-zinc-950 px-4 sm:px-6 lg:px-8 -mt-[82px] pt-[82px] pb-16">
        
        {/* Ambient Radial Lights (GPU accelerated) */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-600/15 rounded-full blur-[90px] pointer-events-none transform-gpu" />
        <div className="absolute bottom-10 right-1/4 w-[350px] h-[300px] bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none transform-gpu" />

        {/* Media Background */}
        <div className="absolute inset-0 z-0 w-full h-full bg-black">
          {heroMediaType === 'video' && heroVideo ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-screen transform-gpu"
            >
              <source src={heroVideo} type="video/mp4" />
            </video>
          ) : (
            <Image
              src={heroImage}
              alt="Hero Background"
              fill
              className="object-cover object-center"
              priority
            />
          )}
          <div 
            className="absolute inset-0 bg-gradient-to-b from-zinc-950/60 via-zinc-950/80 to-zinc-950 pointer-events-none" 
            style={{ opacity: overlayOpacityDecimal }}
          />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative z-10 mx-auto max-w-5xl text-center flex flex-col items-center"
        >
          {/* Shimmer Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md mb-8 shimmer-badge shadow-[0_0_20px_rgba(255,255,255,0.05)]">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-200">
              {badgeText}
            </span>
          </div>

          <h1 className="font-fluid-hero font-black tracking-tight text-white mb-6 text-balance">
            {titleStart}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-300 text-glow">
              {titleEnd}
            </span>
          </h1>

          <p className="mt-4 font-fluid-body text-zinc-300 max-w-3xl mx-auto text-balance font-light whitespace-pre-wrap">
            {heroSubtitle}
          </p>

          {/* Action Row */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={`/${lang}/get-a-quote`}
              className="group relative inline-flex items-center gap-2 rounded-full bg-brand-primary px-8 py-4 text-sm font-bold tracking-wide uppercase text-white shadow-xl shadow-brand-primary/30 hover:bg-blue-600 hover:shadow-brand-primary/50 hover:scale-[1.04] transition-all duration-300 btn-kinetic-roll"
            >
              <span className="roll-track">
                <span className="roll-text">{dict.navigation.getAQuote}</span>
                <span className="roll-text text-cyan-200">{dict.navigation.getAQuote}</span>
              </span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
            
            <Link 
              href={`/${lang}/what-we-do`} 
              className="inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-semibold text-zinc-300 bg-white/[0.03] border border-white/10 hover:border-white/20 hover:text-white hover:bg-white/[0.06] backdrop-blur-md transition-all duration-300 btn-kinetic-roll"
            >
              <span className="roll-track">
                <span className="roll-text">{dict.home.ctaSecondary}</span>
                <span className="roll-text text-white">{dict.home.ctaSecondary}</span>
              </span>
              <span aria-hidden="true" className="text-zinc-500 group-hover:text-white transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          </div>

          {/* Trust Metrics Pill Bar */}
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 gap-6 pt-8 border-t border-white/10 max-w-2xl w-full">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-black text-white">100%</span>
              <span className="text-xs uppercase tracking-wider text-zinc-400 font-medium">Custom Tailored</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-black text-white">2-4 Days</span>
              <span className="text-xs uppercase tracking-wider text-zinc-400 font-medium">Print Turnaround</span>
            </div>
            <div className="col-span-2 sm:col-span-1 flex flex-col items-center">
              <span className="text-2xl font-black text-white">5.0 ★★★★★</span>
              <span className="text-xs uppercase tracking-wider text-zinc-400 font-medium">Client Rating</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Services Section with Bento Spotlight Cards (Refero Style) */}
      <section id="services" className="w-full py-28 bg-zinc-950 px-4 sm:px-6 lg:px-8 border-t border-zinc-900 relative">
        <div className="mx-auto max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center mb-16"
          >
            <p className="text-xs font-bold leading-6 text-brand-primary tracking-widest uppercase">
              {dict.home.expertise}
            </p>
            <h2 className="mt-2 text-4xl sm:text-5xl font-black tracking-tight text-white">
              {dict.home.expertiseTitle}
            </h2>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto"
          >
            {servicesList.map((service, idx) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  variants={itemVariants}
                  className="group relative rounded-3xl p-8 glass-card glass-card-hover overflow-hidden flex flex-col justify-between"
                >
                  {/* Subtle Card Glow */}
                  <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${service.gradient} rounded-full blur-3xl pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-500`} />

                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-zinc-900/90 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-blue-500/40 transition-all duration-300">
                        <Icon className="w-7 h-7 text-blue-400" />
                      </div>
                      <span className="text-xs uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-400">
                        {service.tag}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-blue-400 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                      {service.description}
                    </p>
                  </div>

                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-400 hover:text-white transition-colors pt-4 border-t border-white/5"
                  >
                    <span>Learn More</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="w-full py-28 bg-zinc-950 px-4 sm:px-6 lg:px-8 border-t border-zinc-900 relative">
        <div className="mx-auto max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-14"
          >
            <div>
              <p className="text-xs font-bold leading-6 text-brand-primary tracking-widest uppercase">Our Work</p>
              <h2 className="mt-2 font-fluid-h2 font-black tracking-tight text-white">Featured Projects</h2>
            </div>
            <Link 
              href={`/${lang}/what-we-do`} 
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white px-4 py-2 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/[0.08] transition-all"
            >
              <span>View All Projects</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {portfolioItems.slice(0, 6).map((project, index) => {
              const hasVideo = project.slug === "la-casa-del-mofongo" || project.slug === "crossway-driving-school";
              const videoSrc = "/videos/designer-working.mp4";
              const projectLink = project.slug ? `/${lang}/what-we-do/${project.slug}` : `/${lang}/what-we-do`;

              return (
                <motion.div 
                  key={project.id || index} 
                  variants={itemVariants} 
                  className="w-full"
                >
                  <Link 
                    href={projectLink}
                    prefetch={true}
                    className="block group relative aspect-[4/3] overflow-hidden rounded-2xl mask-chamfer-corner bg-zinc-900 border border-white/10 hover:border-blue-500/50 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500"
                  >
                    <Image 
                      src={project.image || "/assets/images/2024/10/la-casa-del-mofongo.webp"} 
                      alt={project.title} 
                      fill 
                      className={`object-cover transition-transform duration-700 group-hover:scale-105 ${
                        hasVideo ? 'group-hover:opacity-0 transition-opacity duration-500' : ''
                      }`} 
                    />

                    {/* Interactive Video Snippet on hover */}
                    {hasVideo && (
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none transform-gpu"
                      >
                        <source src={videoSrc} type="video/mp4" />
                      </video>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />
                    
                    {/* Verified Badges & Client Trust Chips */}
                    <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between gap-2 pointer-events-none">
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-950/80 border border-white/10 backdrop-blur-md shadow-lg">
                        <div className="w-5 h-5 rounded-full bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-[10px] font-black text-blue-300 uppercase">
                          {(project.title || "CO").charAt(0)}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                          <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-200">Verified Client</span>
                        </div>
                      </div>

                      {hasVideo && (
                        <div className="px-2.5 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-[10px] font-bold uppercase tracking-wider text-blue-300 backdrop-blur-md flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                          <span>Live Preview</span>
                        </div>
                      )}
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                      <span className="text-blue-400 text-xs font-bold tracking-widest uppercase mb-1.5 inline-block">{project.category}</span>
                      <h3 className="text-xl font-bold text-white flex items-center justify-between">
                        <span>{project.title}</span>
                        <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
                      </h3>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <DynamicTestimonials />

      <FAQSection items={aeoFaqs} lang={lang} />

      {/* Pre-Footer Mega CTA (CTA Gallery style) */}
      <section className="w-full relative px-4 sm:px-6 lg:px-8 py-24 bg-zinc-950 border-t border-zinc-900 overflow-hidden">
        <div className="max-w-6xl mx-auto relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-b from-zinc-900/90 via-zinc-950 to-zinc-950 p-10 sm:p-16 lg:p-20 text-center shadow-2xl">
          
          {/* Ambient center spotlight */}
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />

          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative z-10 max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available For New Projects</span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white text-balance leading-tight mb-6">
              {lang === 'fr' ? "Prêt à propulser votre entreprise vers l'avant ?" : lang === 'es' ? "¿Listo para llevar tu marca al siguiente nivel?" : "Ready to Elevate Your Brand to the Next Level?"}
            </h2>

            <p className="text-lg sm:text-xl text-zinc-300 font-light max-w-2xl mx-auto mb-10 leading-relaxed">
              {lang === 'fr' 
                ? "Conception de sites Web sur mesure, image de marque et impression professionnelle pour entreprises à Laval, Montréal et à l'international."
                : lang === 'es'
                ? "Diseño web a medida, branding e imprenta comercial para negocios en Laval, Montreal y el mundo."
                : "High-converting websites, corporate identity, and commercial printing tailored for modern businesses."}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href={`/${lang}/get-a-quote`}
                className="group relative inline-flex items-center gap-2 rounded-full bg-brand-primary px-8 py-4 text-sm font-bold tracking-wide uppercase text-white shadow-xl shadow-brand-primary/30 hover:bg-blue-600 hover:shadow-brand-primary/50 hover:scale-[1.04] transition-all duration-300 btn-kinetic-roll"
              >
                <span className="roll-track">
                  <span className="roll-text">{lang === 'fr' ? "Demander un devis gratuit" : lang === 'es' ? "Solicitar cotización" : "Get a Free Quote"}</span>
                  <span className="roll-text text-cyan-200">{lang === 'fr' ? "Demander un devis gratuit" : lang === 'es' ? "Solicitar cotización" : "Get a Free Quote"}</span>
                </span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
              <a
                href="tel:+14383939465"
                className="inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-semibold text-zinc-300 bg-zinc-900 border border-white/10 hover:border-white/20 hover:text-white transition-all duration-300"
              >
                <span>📞 +1 (438) 393-9465</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
