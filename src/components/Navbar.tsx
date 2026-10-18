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

  return (
    <header className="sticky top-0 z-[100] w-full px-4 sm:px-6 lg:px-8 pt-4 pb-2">
      <nav
        className={`max-w-6xl mx-auto flex items-center justify-between px-5 py-3 rounded-full backdrop-blur-2xl transition-colors duration-300 ${
          isScrolled 
            ? "bg-zinc-950/95 border border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.7)]" 
            : "bg-zinc-950/60 border border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.3)]"
        }`}
        aria-label="Global"
      >
        {/* Logo */}
        <Link href={`/${lang}`} className="flex items-center gap-2 group z-10">
          <span className="sr-only">COzuna Web Design Agency</span>
          <div className="text-2xl font-black text-white tracking-tighter transition-transform duration-300 group-hover:scale-105">
            CO<span className="text-brand-primary">zuna</span>.
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 bg-white/[0.03] border border-white/5 px-3 py-1.5 rounded-full z-10">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`relative px-4 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "text-white bg-white/10 shadow-sm"
                    : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Right Actions: Quote Button */}
        <div className="hidden lg:flex items-center gap-3 z-10">
          {/* CTA Button with Kinetic Roll & Glow */}
          <Link
            href={`/${lang}/get-a-quote`}
            className="group relative inline-flex items-center gap-2 rounded-full bg-brand-primary px-5 py-2 text-xs font-bold tracking-wide uppercase text-white shadow-lg shadow-brand-primary/25 hover:bg-blue-600 hover:shadow-brand-primary/40 hover:scale-[1.03] transition-all duration-300 btn-kinetic-roll"
          >
            <span className="roll-track">
              <span className="roll-text">{dict.navigation.getAQuote}</span>
              <span className="roll-text text-cyan-200">{dict.navigation.getAQuote}</span>
            </span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
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
                <Link href={`/${lang}`} className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                  <div className="text-2xl font-black text-white tracking-tighter">
                    CO<span className="text-brand-primary">zuna</span>.
                  </div>
                </Link>
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
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block rounded-xl px-4 py-3 text-sm font-semibold tracking-wide uppercase transition-colors ${
                      pathname === item.href
                        ? "text-brand-primary bg-zinc-900/80 border border-brand-primary/20"
                        : "text-zinc-300 hover:bg-zinc-900 hover:text-white"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-900 space-y-3">
              <Link
                href={`/${lang}/get-a-quote`}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-brand-primary text-white font-bold text-sm tracking-wide uppercase shadow-lg shadow-brand-primary/30"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>{dict.navigation.getAQuote}</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:+14383939465"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 font-semibold text-xs"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>📞 +1 (438) 393-9465</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
