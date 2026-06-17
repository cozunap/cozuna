"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

type PortfolioItem = {
  title: string;
  category: string;
  image: string;
  slug?: string; // Optional for backward compatibility with hardcoded data
};

export default function ClientPortfolio({ items }: { items: PortfolioItem[] }) {
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

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {items.map((item, index) => {
        const cardContent = (
          <motion.div variants={itemVariants} className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800">
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
          <Link href={`/what-we-do/${item.slug}`} key={index} className="block cursor-pointer">
            {cardContent}
          </Link>
        ) : (
          <div key={index}>{cardContent}</div>
        );
      })}
    </motion.div>
  );
}
