"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { defaultFaqs } from "@/lib/defaultFaqs";

export type FAQItem = {
  id?: string;
  question: string;
  answer: string;
};

interface FAQSectionProps {
  items?: FAQItem[];
  lang?: string;
}

export default function FAQSection({ items, lang = "en" }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First one open by default

  const displayFaqs: FAQItem[] = (items && items.length > 0)
    ? items
    : defaultFaqs.map(f => ({
        id: f.id,
        question: (lang === 'es' ? f.question_es : lang === 'fr' ? f.question_fr : f.question_en) || f.question,
        answer: (lang === 'es' ? f.answer_es : lang === 'fr' ? f.answer_fr : f.answer_en) || f.answer,
      }));

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const headingText = lang === 'es'
    ? { subtitle: "PREGUNTAS FRECUENTES", title: "Preguntas Frecuentes" }
    : lang === 'fr'
    ? { subtitle: "FOIRE AUX QUESTIONS", title: "Questions Fréquemment Posées" }
    : { subtitle: "FAQ", title: "Frequently Asked Questions" };

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
          <h2 className="text-base font-semibold leading-7 text-brand-primary tracking-widest uppercase">
            {headingText.subtitle}
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {headingText.title}
          </p>
        </motion.div>

        <div className="space-y-4">
          {displayFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const itemKey = faq.id || `faq-item-${index}`;
            return (
              <motion.div 
                key={itemKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${isOpen ? 'border-brand-primary/50 bg-zinc-900' : 'border-zinc-800 bg-zinc-950/50 hover:bg-zinc-900/50 hover:border-zinc-700'}`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                  aria-expanded={isOpen}
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
