import Link from "next/link";
import { MessageSquare, Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";

type FooterProps = {
  lang: string;
  dict: any;
};

export default function Footer({ lang, dict }: FooterProps) {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 pt-20 pb-12 relative overflow-hidden">
      {/* Subtle top ambient accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          <div className="md:col-span-5">
            <Link href={`/${lang}`} className="inline-block mb-6 group">
              <span className="sr-only">COzuna Web Design Agency</span>
              <div className="text-3xl font-black text-white tracking-tighter transition-transform group-hover:scale-105">
                CO<span className="text-brand-primary">zuna</span>.
              </div>
            </Link>
            
            <p className="text-zinc-300 text-sm max-w-md mb-4 leading-relaxed font-light">
              {dict?.about?.heroSubtitle || "We are a passionate team of designers, developers, and print specialists dedicated to bringing your brand's vision to life."}
            </p>

            <p className="text-zinc-500 text-xs max-w-md mb-6 leading-relaxed">
              {lang === 'fr' 
                ? "De la conception web sur mesure et le commerce électronique à l'impression grand format de haute qualité, nous concevons des solutions numériques et imprimées de premier ordre conçues pour faire évoluer votre marque."
                : lang === 'es'
                ? "Desde sitios web a medida y comercio electrónico hasta imprenta de alto volumen y gran formato, construimos soluciones que posicionan tu marca con distinción."
                : "From bespoke web applications and high-converting e-commerce to premium print and large-format signage, we craft end-to-end digital and physical solutions engineered to scale modern businesses."}
            </p>

            <div className="flex items-center gap-3">
              <a
                href="https://www.behance.net/cozuna"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="COzuna on Behance"
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800/80 hover:border-brand-primary/50 text-zinc-300 hover:text-white transition-all text-xs font-semibold tracking-wide group"
              >
                <svg className="w-4 h-4 fill-current group-hover:text-brand-primary transition-colors" viewBox="0 0 24 24">
                  <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.171 3-3.455 0-5.555-2.585-5.555-5.836 0-3.199 2.052-5.764 5.485-5.764 3.382 0 5.078 2.378 4.887 5.764h-7.618c.092 1.761 1.267 2.658 2.879 2.658 1.488 0 2.298-.598 2.657-1.422h2.436zm-7.91-4.015h4.922c-.104-1.391-.977-2.185-2.39-2.185-1.479 0-2.377.828-2.532 2.185zm-10.816-4.985h5.594c2.871 0 4.195 1.298 4.195 3.011 0 1.229-.691 2.26-2.021 2.653 1.711.442 2.502 1.636 2.502 3.123 0 2.138-1.748 3.213-4.498 3.213h-5.772v-12zm2.84 4.542h2.158c.954 0 1.839-.272 1.839-1.309 0-.974-.829-1.282-1.782-1.282h-2.215v2.591zm0 5.409h2.365c1.173 0 2.148-.364 2.148-1.503 0-1.121-.996-1.463-2.133-1.463h-2.38v2.966z"/>
                </svg>
                <span>Behance Portfolio</span>
                <ArrowUpRight className="w-3 h-3 text-zinc-500 group-hover:text-white" />
              </a>
            </div>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-white font-bold mb-5 text-xs tracking-widest uppercase">{dict.footer.connect}</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href={`/${lang}/services`} className="text-zinc-400 hover:text-brand-primary transition-colors">{dict.navigation.services}</Link></li>
              <li><Link href={`/${lang}/what-we-do`} className="text-zinc-400 hover:text-brand-primary transition-colors">{dict.navigation.whatWeDo}</Link></li>
              <li><Link href={`/${lang}/about-us`} className="text-zinc-400 hover:text-brand-primary transition-colors">{dict.navigation.aboutUs}</Link></li>
              <li><Link href={`/${lang}/blog`} className="text-zinc-400 hover:text-brand-primary transition-colors">Blog</Link></li>
              <li><Link href={`/${lang}/get-a-quote`} className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">{dict.navigation.getAQuote}</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-white font-bold mb-5 text-xs tracking-widest uppercase">Solutions</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href={`/${lang}/affordable-web-development`} className="text-zinc-400 hover:text-brand-primary transition-colors">Affordable Web Design</Link></li>
              <li><Link href={`/${lang}/ecommerce-web-design`} className="text-zinc-400 hover:text-brand-primary transition-colors">E-Commerce Design</Link></li>
              <li><Link href={`/${lang}/landing-page-design`} className="text-zinc-400 hover:text-brand-primary transition-colors">Landing Pages</Link></li>
              <li><Link href={`/${lang}/graphic-design-for-small-business`} className="text-zinc-400 hover:text-brand-primary transition-colors">Graphic Design</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-white font-bold mb-5 text-xs tracking-widest uppercase">{dict.footer.legal}</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href={`/${lang}/privacy-policy`} className="text-zinc-400 hover:text-brand-primary transition-colors">{dict.footer.privacy}</Link></li>
              <li><Link href={`/${lang}/terms-of-service`} className="text-zinc-400 hover:text-brand-primary transition-colors">{dict.footer.terms}</Link></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between text-xs text-zinc-500">
          <p className="mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} COzuna. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <span>516 W 136th St Apt. #3, New York, NY 10031</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
