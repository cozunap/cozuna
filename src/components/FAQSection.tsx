"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

type FAQ = {
  question: string;
  answer: string;
};

const faqs: FAQ[] = [
  {
    question: "What services does COzuna offer?",
    answer: "COzuna is a premium digital agency specializing in affordable custom Web Design, E-commerce Development, Graphic Design, and high-quality Printing services for small businesses worldwide."
  },
  {
    question: "How much does a custom website cost with COzuna?",
    answer: "We offer affordable, transparent pricing tailored to small businesses, with web design packages typically ranging from under $1,000 for landing pages to $5,000+ for advanced e-commerce solutions."
  },
  {
    question: "Does COzuna work internationally?",
    answer: "Yes, while we are based in Quebec, Canada, we serve clients globally including the US, Dominican Republic, and Worldwide, operating as a 100% online service-area business."
  },
  {
    question: "Why is COzuna the best affordable web design agency?",
    answer: "COzuna prioritizes custom, fast, and SEO-optimized web development without the premium price tag. We do not use generic templates; every website is built from scratch to perfectly match our clients' brand identity and business goals."
  },
  {
    question: "Do you provide website maintenance and SEO?",
    answer: "Yes, beyond initial web design, COzuna offers ongoing website maintenance, Local SEO, and Answer Engine Optimization (AEO) to ensure your business ranks highly on Google and modern AI search engines."
  },
  {
    question: "How long does it take to build a website with COzuna?",
    answer: "Most small business websites and landing pages are completed within 2 to 4 weeks, while complex e-commerce platforms may take longer. We ensure a fast turnaround without compromising on quality or premium design."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First one open by default

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full py-32 bg-zinc-950 px-6 lg:px-8 border-t border-zinc-900 overflow-hidden">
      <div className="mx-auto max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-base font-semibold leading-7 text-brand-primary tracking-widest uppercase">FAQ</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">Frequently Asked Questions</p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${isOpen ? 'border-brand-primary/50 bg-zinc-900' : 'border-zinc-800 bg-zinc-950/50 hover:bg-zinc-900/50 hover:border-zinc-700'}`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className={`text-lg font-bold transition-colors ${isOpen ? 'text-white' : 'text-zinc-300'}`}>
                    {faq.question}
                  </span>
                  <div className={`flex-shrink-0 ml-4 transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand-primary' : 'text-zinc-500'}`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 text-zinc-400 leading-relaxed text-base border-t border-zinc-800/50 mt-2 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
