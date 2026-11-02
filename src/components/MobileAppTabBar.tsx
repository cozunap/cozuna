'use client';

import { usePathname } from 'next/navigation';
import { Home, Layers, Briefcase, MessageCircle, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

type MobileAppTabBarProps = {
  lang: string;
};

export default function MobileAppTabBar({ lang }: MobileAppTabBarProps) {
  const pathname = usePathname();

  const labels = {
    en: {
      home: 'Home',
      services: 'Services',
      work: 'Portfolio',
      chat: 'WhatsApp',
      quote: 'Quote',
    },
    es: {
      home: 'Inicio',
      services: 'Servicios',
      work: 'Portafolio',
      chat: 'WhatsApp',
      quote: 'Cotizar',
    },
    fr: {
      home: 'Accueil',
      services: 'Services',
      work: 'Projets',
      chat: 'WhatsApp',
      quote: 'Devis',
    },
  }[lang as 'en' | 'es' | 'fr'] || {
    home: 'Home',
    services: 'Services',
    work: 'Portfolio',
    chat: 'WhatsApp',
    quote: 'Quote',
  };

  const isHomeActive =
    pathname === `/${lang}` ||
    pathname === `/${lang}/` ||
    pathname === '/' ||
    pathname === '';
  const isServicesActive = pathname?.startsWith(`/${lang}/services`) ?? false;
  const isWorkActive = pathname?.startsWith(`/${lang}/what-we-do`) ?? false;
  const isQuoteActive = pathname?.startsWith(`/${lang}/get-a-quote`) ?? false;

  const handleNav = (href: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href === `/${lang}` && isHomeActive) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (href === `/${lang}` && !isHomeActive) {
      e.preventDefault();
      window.location.assign(`/${lang}`);
      return;
    }
    if (href !== pathname) {
      window.scrollTo(0, 0);
    }
  };

  const whatsappUrl = `https://wa.me/16468831869?text=${encodeURIComponent(
    lang === 'fr'
      ? 'Bonjour COzuna, je souhaite obtenir des renseignements sur vos services.'
      : lang === 'es'
      ? 'Hola COzuna, me gustaría cotizar un proyecto web o de impresión.'
      : 'Hello COzuna, I would like to get a quote for web or printing services.'
  )}`;

  const tabs = [
    {
      id: 'home',
      label: labels.home,
      href: `/${lang}`,
      icon: Home,
      isActive: isHomeActive,
      isExternal: false,
    },
    {
      id: 'services',
      label: labels.services,
      href: `/${lang}/services`,
      icon: Layers,
      isActive: isServicesActive,
      isExternal: false,
    },
    {
      id: 'quote',
      label: labels.quote,
      href: `/${lang}/get-a-quote`,
      icon: Sparkles,
      isActive: isQuoteActive,
      isExternal: false,
      isHero: true,
    },
    {
      id: 'work',
      label: labels.work,
      href: `/${lang}/what-we-do`,
      icon: Briefcase,
      isActive: isWorkActive,
      isExternal: false,
    },
    {
      id: 'chat',
      label: labels.chat,
      href: whatsappUrl,
      icon: MessageCircle,
      isActive: false,
      isExternal: true,
      color: '#25D366',
    },
  ];

  return (
    <nav
      aria-label="Mobile Navigation Dock"
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-zinc-950/92 backdrop-blur-2xl border-t border-white/10 px-2 pt-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-[0_-10px_35px_rgba(0,0,0,0.85)] transition-all"
    >
      <div className="max-w-md mx-auto grid grid-cols-5 items-end justify-items-center">
        {tabs.map((tab) => {
          const Icon = tab.icon;

          if (tab.isHero) {
            return (
              <motion.a
                key={tab.id}
                href={tab.href}
                onClick={(e) => handleNav(tab.href, e)}
                whileTap={{ scale: 0.92 }}
                className="relative -top-3 flex flex-col items-center justify-center group focus:outline-none"
              >
                <div
                  className={`w-13 h-13 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-200 ${
                    tab.isActive
                      ? 'bg-gradient-to-tr from-brand-primary to-blue-400 text-white shadow-blue-500/50 ring-2 ring-blue-300/40 scale-105'
                      : 'bg-gradient-to-tr from-brand-primary to-blue-600 text-white shadow-brand-primary/40'
                  }`}
                >
                  <Icon className="w-6 h-6 stroke-[2.25]" />
                </div>
                <span className="text-[10px] font-bold tracking-tight text-brand-primary mt-1">
                  {tab.label}
                </span>
              </motion.a>
            );
          }

          if (tab.isExternal) {
            return (
              <motion.a
                key={tab.id}
                href={tab.href}
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.9 }}
                className="flex flex-col items-center justify-center py-1 px-2 w-full text-zinc-400 hover:text-white transition-colors focus:outline-none"
              >
                <div className="relative flex items-center justify-center w-7 h-7">
                  <Icon className="w-5 h-5 text-[#25D366] stroke-[2.25]" />
                </div>
                <span className="text-[10px] font-medium tracking-tight mt-0.5 text-zinc-400">
                  {tab.label}
                </span>
              </motion.a>
            );
          }

          return (
            <motion.a
              key={tab.id}
              href={tab.href}
              onClick={(e) => handleNav(tab.href, e)}
              whileTap={{ scale: 0.9 }}
              className={`flex flex-col items-center justify-center py-1 px-2 w-full transition-colors focus:outline-none ${
                tab.isActive
                  ? 'text-white font-bold'
                  : 'text-zinc-400 hover:text-zinc-200 font-medium'
              }`}
            >
              <div className="relative flex items-center justify-center w-7 h-7">
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 stroke-[2] ${
                    tab.isActive ? 'text-brand-primary scale-110' : 'text-zinc-400'
                  }`}
                />
                {tab.isActive && (
                  <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-brand-primary" />
                )}
              </div>
              <span
                className={`text-[10px] tracking-tight mt-0.5 ${
                  tab.isActive ? 'text-white' : 'text-zinc-400'
                }`}
              >
                {tab.label}
              </span>
            </motion.a>
          );
        })}
      </div>
    </nav>
  );
}
