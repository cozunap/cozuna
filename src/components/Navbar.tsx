"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavbarProps = {
  lang: string;
  dict: any;
};

export default function Navbar({ lang, dict }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: dict.navigation.home, href: `/${lang}` },
    { name: dict.navigation.services, href: `/${lang}/services` },
    { name: dict.navigation.aboutUs, href: `/${lang}/about-us` },
    { name: dict.navigation.whatWeDo, href: `/${lang}/what-we-do` },
  ];

  return (
    <header className="sticky top-0 z-50 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-900 shadow-sm">
      <nav className="flex items-center justify-between p-6 lg:px-8 max-w-7xl mx-auto" aria-label="Global">
        
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link href={`/${lang}`} className="-m-1.5 p-1.5 flex items-center gap-3">
            <span className="sr-only">COzuna Web Design & Printing</span>
            <div className="text-2xl font-black text-white tracking-tighter">
              CO<span className="text-brand-primary">zuna</span>.
            </div>
          </Link>
        </div>

        {/* Right Aligned Links & CTA */}
        <div className="hidden lg:flex lg:items-center lg:gap-x-8 lg:justify-end">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-semibold leading-6 transition-colors ${
                pathname === item.href ? "text-brand-primary" : "text-zinc-300 hover:text-white"
              }`}
            >
              {item.name}
            </Link>
          ))}
          
          <div className="hidden lg:block w-px h-6 bg-zinc-800 mx-2"></div>

          <div className="hidden lg:block w-px h-6 bg-zinc-800 mx-2"></div>
          
          <Link href={`/${lang}/get-a-quote`} className="animate-pulse-glow rounded-full bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-brand-primary/50">
            {dict.navigation.getAQuote}
          </Link>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-zinc-400 hover:text-white"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>

      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden" role="dialog" aria-modal="true">
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-zinc-950 px-6 py-6 sm:max-w-sm border-l border-zinc-800">
            <div className="flex items-center justify-between">
              <Link href={`/${lang}`} className="-m-1.5 p-1.5 flex items-center gap-3" onClick={() => setMobileMenuOpen(false)}>
                <span className="sr-only">COzuna</span>
                <div className="text-2xl font-black text-white tracking-tighter">
                  CO<span className="text-brand-primary">zuna</span>.
                </div>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-zinc-400 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-zinc-800">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 ${
                        pathname === item.href ? "text-brand-primary bg-zinc-900" : "text-zinc-300 hover:bg-zinc-900 hover:text-white"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
