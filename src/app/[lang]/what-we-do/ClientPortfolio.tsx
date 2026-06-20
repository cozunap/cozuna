"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

type PortfolioItem = {
  title: string;
  category: string;
  image: string;
  slug?: string; // Optional for backward compatibility with hardcoded data
};

export default function ClientPortfolio({ items, lang }: { items: PortfolioItem[], lang: string }) {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(items);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(portfolioItems.map(item => item.category)))];

  useEffect(() => {
    async function fetchProjects() {
      try {
        const querySnapshot = await getDocs(collection(db, "projects"));
        if (!querySnapshot.empty) {
          const fetchedItems = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
              title: data.title || "Untitled Project",
              category: data.category || "Uncategorized",
              image: data.image || "/assets/images/2024/10/la-casa-del-mofongo.webp",
              slug: data.slug || doc.id
            };
          });
          setPortfolioItems(fetchedItems);
        }
      } catch (error) {
        console.error("Error fetching portfolio items", error);
      }
    }
    fetchProjects();
  }, []);
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

  const filteredItems = activeCategory === "All" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  return (
    <div>
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
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="columns-1 md:columns-2 lg:columns-3 gap-8"
        layout
      >
        {filteredItems.map((item, index) => {
        const cardContent = (
          <motion.div variants={itemVariants} className={`group relative ${index % 3 === 0 ? 'aspect-square' : 'aspect-[4/5]'} overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 mb-8 break-inside-avoid w-full inline-block`}>
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
          </motion.div>
        );

        return item.slug ? (
          <Link href={`/${lang}/what-we-do/${item.slug}`} key={item.slug || item.title} className="block cursor-pointer">
            {cardContent}
          </Link>
        ) : (
          <div key={item.title}>{cardContent}</div>
        );
      })}
      </motion.div>
    </div>
  );
}
