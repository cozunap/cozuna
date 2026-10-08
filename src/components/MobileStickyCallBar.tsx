'use client';

import { Phone } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MobileStickyCallBar({ lang = 'en' }: { lang?: string }) {
  const callText = lang === 'fr' 
    ? 'Appelez-nous' 
    : lang === 'es' 
    ? 'Llámanos' 
    : 'Call Us';

  const handleClick = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'phone_call_click', {
        event_category: 'engagement',
        event_label: '+14383939465',
      });
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-zinc-950/95 backdrop-blur-md border-t border-zinc-800 p-3 px-4 shadow-2xl">
      <motion.a
        href="tel:+14383939465"
        onClick={handleClick}
        className="w-full flex items-center justify-center gap-3 bg-brand-primary text-white py-3.5 px-6 rounded-full font-bold text-base shadow-lg shadow-brand-primary/40 active:scale-95 transition-transform"
        whileTap={{ scale: 0.96 }}
      >
        <Phone className="w-5 h-5 animate-pulse" />
        <span>{callText}: +1 (438) 393-9465</span>
      </motion.a>
    </div>
  );
}
