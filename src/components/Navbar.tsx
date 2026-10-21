"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";

type NavbarProps = {
  lang: string;
  dict: any;
};

export default function Navbar({ lang, dict }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { name: dict.navigation.home, href: `/${lang}` },
    { name: dict.navigation.services, href: `/${lang}/services` },
    { name: dict.navigation.whatWeDo, href: `/${lang}/what-we-do` },
    { name: dict.navigation.aboutUs, href: `/${lang}/about-us` },
    { name: 'Blog', href: `/${lang}/blog` },
  ];

  const isHomePage = pathname === `/${lang}` || pathname === `/${lang}/` || pathname === "/" || pathname === "";

  const handleNavClick = (href: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    // If clicking Home / Logo while already on the home page, smoothly scroll to top
    if (href === `/${lang}` && isHomePage) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      setMobileMenuOpen(false);
      return;
    }

    // If navigating between different pages, ensure browser scrolls to top immediately
    if (href !== pathname) {
      window.scrollTo(0, 0);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className={`${isHomePage ? 'fixed' : 'sticky'} top-0 z-[100] w-full px-4 sm:px-6 lg:px-8 pt-4 pb-2`}>
      <nav
        className={`max-w-6xl mx-auto flex items-center justify-between px-5 py-3 rounded-full transition-all duration-300 ${
          isHomePage
            ? isScrolled
              ? "bg-zinc-950/90 border border-white/15 backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.7)]"
              : "bg-transparent border-transparent backdrop-blur-none shadow-none"
            : isScrolled
              ? "bg-zinc-950/95 border border-white/15 backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.7)]"
              : "bg-zinc-950/85 border border-white/10 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
        }`}
        aria-label="Global"
      >
        {/* Logo */}
        <a
          href={`/${lang}`}
          onClick={(e) => handleNavClick(`/${lang}`, e)}
          className="flex items-center gap-2 group z-10 cursor-pointer"
        >
          <span className="sr-only">COzuna Web Design Agency</span>
          <div className="text-[1.875rem] leading-none font-black text-white tracking-tighter transition-transform duration-300 group-hover:scale-105">
            CO<span className="text-brand-primary">zuna</span>.
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 bg-white/[0.04] border border-white/10 px-3 py-1.5 rounded-full z-10 backdrop-blur-md">
          {navigation.map((item) => {
            const isHomeItem = item.href === `/${lang}`;
            const isActive = isHomeItem 
              ? (pathname === `/${lang}` || pathname === `/${lang}/` || pathname === "/" || pathname === "")
              : (pathname === item.href || (pathname?.startsWith(item.href + "/") ?? false));

            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(item.href, e)}
                className={`relative px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-200 cursor-pointer select-none ${
                  isActive
                    ? "text-white bg-brand-primary shadow-md shadow-brand-primary/40 border border-blue-400/30 scale-[1.03]"
                    : "text-zinc-400 hover:text-white hover:bg-white/[0.06]"
                }`}
              >
                {item.name}
              </a>
            );
          })}
        </div>

        {/* Right Actions: Quote Button */}
        <div className="hidden lg:flex items-center gap-3 z-10">
          {/* CTA Button with Kinetic Roll & Glow */}
          <a
            href={`/${lang}/get-a-quote`}
            className="group relative inline-flex items-center gap-2 rounded-full bg-brand-primary px-5 py-2 text-xs font-bold tracking-wide uppercase text-white shadow-lg shadow-brand-primary/25 hover:bg-blue-600 hover:shadow-brand-primary/40 hover:scale-[1.03] transition-all duration-300 btn-kinetic-roll"
          >
            <span className="roll-track">
              <span className="roll-text">{dict.navigation.getAQuote}</span>
              <span className="roll-text text-cyan-200">{dict.navigation.getAQuote}</span>
            </span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full p-2 text-zinc-300 bg-zinc-900 border border-white/10 hover:text-white hover:bg-zinc-800 transition-colors"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden" role="dialog" aria-modal="true">
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 z-50 w-full max-w-xs overflow-y-auto bg-zinc-950 p-6 border-l border-zinc-800/80 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-zinc-900">
                <a
                  href={`/${lang}`}
                  className="flex items-center gap-2"
                  onClick={(e) => handleNavClick(`/${lang}`, e)}
                >
                  <div className="text-[1.875rem] leading-none font-black text-white tracking-tighter">
                    CO<span className="text-brand-primary">zuna</span>.
                  </div>
                </a>
                <button
                  type="button"
                  className="rounded-full p-2 text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-6 flex flex-col gap-2">
                {navigation.map((item) => {
                  const isHomeItem = item.href === `/${lang}`;
                  const isActive = isHomeItem 
                    ? (pathname === `/${lang}` || pathname === `/${lang}/` || pathname === "/" || pathname === "")
                    : (pathname === item.href || (pathname?.startsWith(item.href + "/") ?? false));

                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      className={`block rounded-xl px-4 py-3 text-sm font-bold tracking-wide uppercase transition-all select-none ${
                        isActive
                          ? "text-white bg-brand-primary shadow-lg shadow-brand-primary/30 border border-blue-400/40"
                          : "text-zinc-300 hover:bg-zinc-900 hover:text-white"
                      }`}
                      onClick={(e) => handleNavClick(item.href, e)}
                    >
                      {item.name}
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-900 space-y-3">
              <a
                href={`/${lang}/get-a-quote`}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-brand-primary text-white font-bold text-sm tracking-wide uppercase shadow-lg shadow-brand-primary/30"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>{dict.navigation.getAQuote}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href="tel:+16468831869"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 font-semibold text-xs"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>📞 +1 (646) 883-1869</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
