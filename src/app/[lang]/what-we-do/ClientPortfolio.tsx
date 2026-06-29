"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { useState } from "react";

type PortfolioItem = {
  id?: string;
  title: string;
  category: string;
  image: string;
  slug?: string;
};

export default function ClientPortfolio({ items, dict, lang }: { items: PortfolioItem[], dict: any, lang: string }) {
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
    <div className="pt-[30px]">
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
        {filteredItems.map((item) => {
          const itemKey = item.id || item.slug || item.title;
          
          const cardContent = (
            <div className={`group relative aspect-[4/5] overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 w-full`}>
              <Image 
                src={item.image} 
                alt={item.title} 
                fill 
                className={`object-cover transition-transform duration-700 group-hover:scale-110 ${
                  item.image.includes('crossway') || item.image.includes('overall') || item.image.includes('tbstax') ? 'object-contain bg-white p-4' : ''
                }`} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-brand-primary text-sm font-bold tracking-wider mb-2 uppercase">{item.category}</p>
                <h3 className="text-2xl font-bold text-white">{item.title}</h3>
              </div>
            </div>
          );

          return (
            <motion.div variants={itemVariants} key={itemKey}>
              {item.slug ? (
                <Link href={`/${lang}/what-we-do/${item.slug}`} className="block cursor-pointer">
                  {cardContent}
                </Link>
              ) : (
                <div>{cardContent}</div>
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
