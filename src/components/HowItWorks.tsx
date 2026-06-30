import React from 'react';
import { Language, translations } from '../types';
import { Phone, MapPin, Truck, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface HowItWorksProps {
  currentLang: Language;
}

export default function HowItWorks({ currentLang }: HowItWorksProps) {
  const t = translations[currentLang];

  const steps = [
    {
      icon: Phone,
      title: t.howItWorks.steps.step1.title,
      desc: t.howItWorks.steps.step1.desc,
      color: 'border-red-500/30 text-red-500 bg-red-950/20'
    },
    {
      icon: MapPin,
      title: t.howItWorks.steps.step2.title,
      desc: t.howItWorks.steps.step2.desc,
      color: 'border-amber-500/30 text-amber-500 bg-amber-950/20'
    },
    {
      icon: Truck,
      title: t.howItWorks.steps.step3.title,
      desc: t.howItWorks.steps.step3.desc,
      color: 'border-[#d4af37]/30 text-[#d4af37] bg-yellow-950/15'
    },
    {
      icon: ShieldCheck,
      title: t.howItWorks.steps.step4.title,
      desc: t.howItWorks.steps.step4.desc,
      color: 'border-emerald-500/30 text-emerald-500 bg-emerald-950/20'
    }
  ];

  return (
    <section
      id="how-it-works"
      className="pt-12 md:pt-16 pb-24 bg-[#050505] text-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-sans font-extrabold tracking-widest text-[#d4af37] uppercase bg-[#d4af37]/10 px-3 py-1 rounded-full border border-[#d4af37]/20">
            {currentLang === 'nl' ? 'PROCES' : currentLang === 'en' ? 'PROCESS' : 'КАК ЭТО РАБОТАЕТ'}
          </span>
          <h2 className="mt-4 font-sans font-black text-3xl sm:text-5xl tracking-tight text-white uppercase">
            {t.howItWorks.title}
          </h2>
          <div className="h-[2px] w-16 bg-red-600 mx-auto mt-6 rounded-full" />
          <p className="mt-6 font-sans text-base sm:text-lg text-neutral-400 leading-relaxed">
            {t.howItWorks.subtitle}
          </p>
        </div>

        {/* 4 Steps Container */}
        <div className="relative mt-16" id="steps-timeline-container">
          
          {/* Horizontal Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-[68px] left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-red-600 via-[#d4af37] to-emerald-500 opacity-30 z-0" />

          {/* Steps list */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10" id="steps-grid">
            {steps.map((step, index) => {
              const IconComp = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="flex flex-col items-center text-center group"
                  id={`step-card-${index}`}
                >
                  {/* Step badge/number */}
                  <div className="relative mb-6">
                    {/* Ring glow */}
                    <div className="absolute inset-0 rounded-full bg-neutral-900 scale-125 border border-neutral-800 shadow-[0_0_20px_rgba(0,0,0,0.6)] group-hover:border-[#d4af37]/40 group-hover:shadow-[0_0_25px_rgba(212,175,55,0.15)] transition-all duration-300 pointer-events-none" />
                    
                    {/* Index float */}
                    <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-black text-[#d4af37] flex items-center justify-center shadow-md">
                      0{index + 1}
                    </div>

                    {/* Main icon container */}
                    <div className={`relative z-10 p-6 rounded-full border ${step.color} shadow-inner flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:text-white group-hover:bg-[#d4af37]/10 group-hover:border-[#d4af37]/40`}>
                      <IconComp className="w-8 h-8 transition-transform duration-300 group-hover:rotate-[15deg]" />
                    </div>
                  </div>

                  {/* Connecting Line / Arrow (Mobile) */}
                  {index < 3 && (
                    <div className="block lg:hidden my-4 text-neutral-800 font-extrabold text-lg group-hover:text-[#d4af37] transition-colors">
                      ↓
                    </div>
                  )}

                  {/* Step description details */}
                  <h3 className="font-sans font-black text-lg text-white mt-4 tracking-tight group-hover:text-[#d4af37] transition-colors">
                    {step.title}
                  </h3>
                  
                  <p className="mt-3 font-sans text-sm text-neutral-400 leading-relaxed max-w-xs px-2 group-hover:text-neutral-300 transition-colors">
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
