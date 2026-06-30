import React, { useState } from 'react';
import { Language, translations } from '../types';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FAQProps {
  currentLang: Language;
}

export default function FAQ({ currentLang }: FAQProps) {
  const t = translations[currentLang];
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqItems = [
    { q: t.faq.q1, a: t.faq.a1 },
    { q: t.faq.q2, a: t.faq.a2 },
    { q: t.faq.q3, a: t.faq.a3 },
    { q: t.faq.q4, a: t.faq.a4 },
    { q: t.faq.q5, a: t.faq.a5 }
  ];

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="pt-12 md:pt-16 pb-24 bg-neutral-950 text-white border-t border-neutral-900/80 relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#d4af37]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10" id="faq-container">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-sans font-extrabold tracking-widest text-[#d4af37] uppercase bg-[#d4af37]/10 px-3 py-1 rounded-full border border-[#d4af37]/20">
            INFO
          </span>
          <h2 className="mt-4 font-sans font-black text-3xl sm:text-5xl tracking-tight text-white uppercase">
            {t.faq.title}
          </h2>
          <div className="h-[2px] w-16 bg-red-600 mx-auto mt-6 rounded-full" />
          <p className="mt-6 font-sans text-base sm:text-lg text-neutral-400 leading-relaxed">
            {t.faq.subtitle}
          </p>
        </div>

        {/* Accordions Stack */}
        <div className="flex flex-col gap-4" id="faq-accordions-stack">
          {faqItems.map((item, index) => {
            const isOpen = activeIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? 'border-[#d4af37] bg-neutral-900/40 shadow-[0_0_20px_rgba(212,175,55,0.08)]'
                    : 'border-neutral-800/80 bg-neutral-900/15 hover:border-neutral-700 hover:bg-neutral-900/30'
                }`}
                id={`faq-item-${index}`}
              >
                {/* Header/Question Trigger */}
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start gap-4 pr-4">
                    <HelpCircle className={`w-5.5 h-5.5 shrink-0 mt-0.5 ${isOpen ? 'text-[#d4af37]' : 'text-neutral-500'}`} />
                    <span className="font-sans font-extrabold text-sm sm:text-base text-white leading-snug">
                      {item.q}
                    </span>
                  </div>

                  <div className={`p-1.5 rounded-full bg-neutral-950 border border-neutral-800 transition-colors ${isOpen ? 'text-[#d4af37] border-[#d4af37]/45' : 'text-neutral-400'}`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {/* Answer Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1 pl-15 border-t border-neutral-900/60 font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
