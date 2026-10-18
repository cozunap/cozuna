"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

type PortfolioItem = {
  id?: string;
  title: string;
  category: string;
  image: string;
  slug?: string;
};

export default function ClientPortfolio({ items, dict, lang }: { items: PortfolioItem[], dict: any, lang: string }) {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<string>(dict.portfolio.categories.all);

  const categories = [
    dict.portfolio.categories.all, 
    dict.portfolio.categories.graphic, 
    dict.portfolio.categories.web
  ];

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

  const filteredItems = activeCategory === dict.portfolio.categories.all 
    ? items 
    : items.filter(item => item.category === activeCategory);

  return (
    <div className="pt-10 pb-20 max-w-7xl mx-auto px-6 lg:px-8 w-full">
      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-16">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              activeCategory === cat
                ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20 scale-105"
                : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <motion.div 
        key={activeCategory}
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {filteredItems.map((item, index) => {
          const itemKey = item.id || item.slug || `${item.title}-${index}`;
          const safeImage = item.image || "/assets/images/2024/10/la-casa-del-mofongo.webp";
          const itemHref = item.slug ? `/${lang}/what-we-do/${item.slug}` : `/${lang}/what-we-do`;
          
          const cardInner = (
            <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl mask-chamfer-corner bg-zinc-900 border border-zinc-800 w-full hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500">
              <Image 
                src={safeImage} 
                alt={item.title || "Portfolio Item"} 
                fill 
                className={`object-cover transition-transform duration-700 group-hover:scale-105 ${
                  safeImage.includes('crossway') || safeImage.includes('overall') || safeImage.includes('tbstax') ? 'object-contain bg-white p-4' : ''
                }`} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
              
              {/* Trust Badge */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-950/80 border border-white/10 backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-300">Case Study</span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-brand-primary text-xs font-bold tracking-wider mb-2 uppercase">{item.category}</p>
                <h3 className="text-2xl font-bold text-white flex items-center justify-between">
                  <span>{item.title}</span>
                  <span className="text-zinc-500 group-hover:text-white transition-colors">↗</span>
                </h3>
              </div>
            </div>
          );

          return (
            <motion.div 
              variants={itemVariants} 
              key={itemKey}
              className="w-full"
            >
              {item.slug ? (
                <Link 
                  href={itemHref} 
                  prefetch={true}
                  className="block w-full cursor-pointer transform transition-transform duration-300 hover:-translate-y-1.5"
                >
                  {cardInner}
                </Link>
              ) : (
                <div className="block w-full">
                  {cardInner}
                </div>
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
