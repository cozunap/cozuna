"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import DynamicTestimonials from '@/components/DynamicTestimonials';

export default function HomeContent({ lang, dict, cmsData }: { lang: string, dict: any, cmsData: any }) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const heroTitle = cmsData?.heroTitle?.[lang] || dict.home.heroTitle;
  const heroSubtitle = cmsData?.heroSubtitle?.[lang] || dict.home.heroSubtitle;
  
  const heroMediaType = cmsData?.heroMediaType || 'video';
  const heroImage = cmsData?.heroImage || '/assets/images/2024/10/main-photo.webp';
  const heroVideo = cmsData?.heroVideo?.[lang] || "/videos/designer-working.mp4";

  const heroOverlayOpacity = cmsData?.heroOverlayOpacity !== undefined ? cmsData.heroOverlayOpacity : 80;
  const overlayOpacityDecimal = heroOverlayOpacity / 100;

  const titleWords = heroTitle.split(' ');
  const titleStart = titleWords.slice(0, -2).join(' ');
  const titleEnd = titleWords.slice(-2).join(' ');

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      
      {/* Hero Section */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-zinc-950 px-6 lg:px-8">
        
        {/* Media Background */}
        <div className="absolute inset-0 z-0 w-full h-full bg-black">
          {heroMediaType === 'video' && heroVideo ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen"
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
            className="absolute inset-0 bg-black pointer-events-none" 
            style={{ opacity: overlayOpacityDecimal }}
          ></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 mx-auto max-w-4xl text-center"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 text-balance">
            {titleStart}{' '}
            <span className="text-brand-primary">{titleEnd}</span>
          </h1>
          <p className="mt-6 text-xl md:text-2xl leading-8 text-zinc-300 max-w-3xl mx-auto text-balance font-light whitespace-pre-wrap">
            {heroSubtitle}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href={`/${lang}/get-a-quote`}
              className="animate-pulse-glow rounded-full bg-brand-primary px-8 py-4 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-brand-primary/50"
            >
              {dict.navigation.getAQuote}
            </Link>
            <Link href={`/${lang}/what-we-do`} className="text-sm font-semibold leading-6 text-white hover:text-zinc-300 transition-colors">
              {dict.home.ctaSecondary} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services" className="w-full py-32 bg-zinc-900 px-6 lg:px-8 overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl lg:text-center"
          >
            <h2 className="text-base font-semibold leading-7 text-brand-primary tracking-widest uppercase">Our Expertise</h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Everything Your Brand Needs
            </p>
          </motion.div>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none"
          >
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-12 lg:max-w-none lg:grid-cols-4">
              {/* Service 1 */}
              <motion.div variants={itemVariants} className="flex flex-col bg-zinc-950 p-8 rounded-3xl border border-zinc-800 hover:border-brand-primary/50 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-primary/20 transition-all duration-500 group">
                <div className="mb-6 overflow-hidden rounded-xl h-48 relative">
                  <Image src="/assets/images/2024/10/web-design.jpg" alt="Web Design" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                </div>
                <dt className="text-2xl font-bold leading-7 text-white mb-4">
                  Web Design
                </dt>
                <dd className="flex flex-auto flex-col text-base leading-7 text-zinc-400">
                  <p className="flex-auto">Stunning, fast, and responsive websites engineered to convert visitors into loyal customers.</p>
                </dd>
              </motion.div>
              {/* Service 2 */}
              <motion.div variants={itemVariants} className="flex flex-col bg-zinc-950 p-8 rounded-3xl border border-zinc-800 hover:border-brand-primary/50 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-primary/20 transition-all duration-500 group">
                <div className="mb-6 overflow-hidden rounded-xl h-48 relative">
                  <Image src="/assets/images/2024/10/graphic-design.webp" alt="Graphic Design" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                </div>
                <dt className="text-2xl font-bold leading-7 text-white mb-4">
                  Graphic Design
                </dt>
                <dd className="flex flex-auto flex-col text-base leading-7 text-zinc-400">
                  <p className="flex-auto">From striking logos to complete brand identities, we make your visual communication unforgettable.</p>
                </dd>
              </motion.div>
              {/* Service 3 */}
              <motion.div variants={itemVariants} className="flex flex-col bg-zinc-950 p-8 rounded-3xl border border-zinc-800 hover:border-brand-primary/50 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-primary/20 transition-all duration-500 group">
                <div className="mb-6 overflow-hidden rounded-xl h-48 relative">
                  <Image src="/assets/images/2024/10/printing.webp" alt="Printing" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                </div>
                <dt className="text-2xl font-bold leading-7 text-white mb-4">
                  Printing
                </dt>
                <dd className="flex flex-auto flex-col text-base leading-7 text-zinc-400">
                  <p className="flex-auto">High-quality business cards, flyers, and menus. We bridge the gap between digital and physical.</p>
                </dd>
              </motion.div>
              {/* Service 4 */}
              <motion.div variants={itemVariants} className="flex flex-col bg-zinc-950 p-8 rounded-3xl border border-zinc-800 hover:border-brand-primary/50 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-primary/20 transition-all duration-500 group">
                <div className="mb-6 overflow-hidden rounded-xl h-48 relative">
                  <Image src="/assets/images/2024/10/signage.webp" alt="Signage" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                </div>
                <dt className="text-2xl font-bold leading-7 text-white mb-4">
                  Signage
                </dt>
                <dd className="flex flex-auto flex-col text-base leading-7 text-zinc-400">
                  <p className="flex-auto">Eye-catching indoor and outdoor signage solutions that ensure your business gets noticed instantly.</p>
                </dd>
              </motion.div>
            </dl>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="w-full py-32 bg-zinc-950 px-6 lg:px-8 border-t border-zinc-900 overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex justify-between items-end mb-16"
          >
            <div>
              <h2 className="text-base font-semibold leading-7 text-brand-primary tracking-widest uppercase">Our Work</h2>
              <p className="mt-2 text-4xl font-bold tracking-tight text-white">Featured Projects</p>
            </div>
            <Link href={`/${lang}/what-we-do`} className="hidden sm:block text-sm font-semibold text-white hover:text-brand-primary transition-colors">
              View All Projects <span aria-hidden="true">→</span>
            </Link>
          </motion.div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {/* Project 1 */}
            <motion.div variants={itemVariants} className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-primary/20 transition-all duration-500">
              <Image src="/assets/images/2024/10/la-casa-del-mofongo.webp" alt="La Casa Del Mofongo" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-brand-primary text-sm font-bold tracking-wider mb-2 uppercase">Web & Print</p>
                <h3 className="text-2xl font-bold text-white">La Casa Del Mofongo MD</h3>
              </div>
            </motion.div>

            {/* Project 2 */}
            <motion.div variants={itemVariants} className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-primary/20 transition-all duration-500">
              <Image src="/assets/images/2024/10/spa.webp" alt="Monica Nails Spa" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-brand-primary text-sm font-bold tracking-wider mb-2 uppercase">Brand Identity</p>
                <h3 className="text-2xl font-bold text-white">Monica Nails Spa</h3>
              </div>
            </motion.div>

            {/* Project 3 */}
            <motion.div variants={itemVariants} className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-primary/20 transition-all duration-500">
              <Image src="/assets/images/2024/10/lashisha.webp" alt="La Shisha Restaurant" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-brand-primary text-sm font-bold tracking-wider mb-2 uppercase">Web Design</p>
                <h3 className="text-2xl font-bold text-white">La Shisha Restaurant</h3>
              </div>
            </motion.div>
            
            {/* Project 4 */}
            <motion.div variants={itemVariants} className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-primary/20 transition-all duration-500">
              <Image src="/assets/images/2024/10/elsyleonso.webp" alt="Elsy Leonso" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-brand-primary text-sm font-bold tracking-wider mb-2 uppercase">Graphic Design</p>
                <h3 className="text-2xl font-bold text-white">Elsy Leonso</h3>
              </div>
            </motion.div>

            {/* Project 5 */}
            <motion.div variants={itemVariants} className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-primary/20 transition-all duration-500">
              <Image src="/assets/images/2024/10/crossway_business_card.webp" alt="Crossway Driving School" fill className="object-contain bg-white transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-brand-primary text-sm font-bold tracking-wider mb-2 uppercase">Printing</p>
                <h3 className="text-2xl font-bold text-white">Crossway Driving School</h3>
              </div>
            </motion.div>

            {/* Project 6 */}
            <motion.div variants={itemVariants} className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-primary/20 transition-all duration-500">
              <Image src="/assets/images/2024/10/cityshieldsny.webp" alt="City Shields NY" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-brand-primary text-sm font-bold tracking-wider mb-2 uppercase">Brand Identity</p>
                <h3 className="text-2xl font-bold text-white">City Shields NY</h3>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <DynamicTestimonials />

      {/* Contact / CTA Section */}
      <section className="w-full relative isolate overflow-hidden bg-brand-dark px-6 py-32 lg:px-8 border-t border-zinc-900">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.zinc.900),theme(colors.zinc.950))] opacity-50" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Let's Build Something Great.</h2>
          <p className="mx-auto mt-6 max-w-xl text-xl leading-8 text-zinc-300 font-light">
            Whether you need a complete rebrand, high-quality printing, or a modern website, we are ready to help your business grow.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/get-a-quote"
              className="animate-pulse-glow rounded-full bg-white px-10 py-5 text-sm font-bold text-brand-dark shadow-sm hover:bg-zinc-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-brand-primary/50"
            >
              Start Your Project
            </Link>
          </div>
        </motion.div>
      </section>

    </main>
  );
}
