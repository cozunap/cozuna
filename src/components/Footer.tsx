import Link from "next/link";
import { Mail } from "lucide-react";

type FooterProps = {
  lang: string;
  dict: any;
};

export default function Footer({ lang, dict }: FooterProps) {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          
          <div className="col-span-1 md:col-span-2">
            <Link href={`/${lang}`} className="inline-block mb-6">
              <span className="sr-only">COzuna Web Design & Printing</span>
              <div className="text-3xl font-black text-white tracking-tighter">
                CO<span className="text-brand-primary">zuna</span>.
              </div>
            </Link>
            <p className="text-zinc-400 text-lg max-w-sm mb-8 leading-relaxed">
              {dict.footer.tagline}
            </p>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 text-sm tracking-wider uppercase">{dict.footer.connect}</h3>
            <ul className="space-y-4">
              <li><Link href={`/${lang}/services`} className="text-zinc-400 hover:text-brand-primary transition-colors">{dict.navigation.services}</Link></li>
              <li><Link href={`/${lang}/what-we-do`} className="text-zinc-400 hover:text-brand-primary transition-colors">{dict.navigation.whatWeDo}</Link></li>
              <li><Link href={`/${lang}/about-us`} className="text-zinc-400 hover:text-brand-primary transition-colors">{dict.navigation.aboutUs}</Link></li>
              <li><Link href={`/${lang}/get-a-quote`} className="text-zinc-400 hover:text-brand-primary transition-colors">{dict.navigation.getAQuote}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 text-sm tracking-wider uppercase">{dict.footer.legal}</h3>
            <ul className="space-y-4">
              <li><Link href={`/${lang}/privacy-policy`} className="text-zinc-400 hover:text-brand-primary transition-colors">{dict.footer.privacy}</Link></li>
              <li><Link href={`/${lang}/terms-of-service`} className="text-zinc-400 hover:text-brand-primary transition-colors">{dict.footer.terms}</Link></li>
              <li>
                <a href="mailto:ozunaprinting@gmail.com" className="inline-flex items-center text-zinc-400 hover:text-white transition-colors mt-4 group">
                  <Mail className="w-4 h-4 mr-2 group-hover:text-brand-primary transition-colors" />
                  ozunaprinting@gmail.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between">
          <p className="text-zinc-600 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} COzuna. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-zinc-600">
            <span>Designed in New Jersey</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
