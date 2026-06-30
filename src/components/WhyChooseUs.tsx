import React from 'react';
import { Language, translations } from '../types';
import { Clock, Navigation, Zap, Compass, DollarSign, Award, ShieldCheck, Cpu } from 'lucide-react';
import { motion } from 'motion/react';

interface WhyChooseUsProps {
  currentLang: Language;
}

export default function WhyChooseUs({ currentLang }: WhyChooseUsProps) {
  const t = translations[currentLang];

  const benefits = [
    {
      icon: Clock,
      title: t.whyUs.items.alwaysOpen.title,
      desc: t.whyUs.items.alwaysOpen.desc,
    },
    {
      icon: Zap,
      title: t.whyUs.items.speed.title,
      desc: t.whyUs.items.speed.desc,
    },
    {
      icon: Cpu,
      title: t.whyUs.items.equipment.title,
      desc: t.whyUs.items.equipment.desc,
    },
    {
      icon: DollarSign,
      title: t.whyUs.items.prices.title,
      desc: t.whyUs.items.prices.desc,
    },
    {
      icon: Award,
      title: t.whyUs.items.experience.title,
      desc: t.whyUs.items.experience.desc,
    },
    {
      icon: ShieldCheck,
      title: t.whyUs.items.allCars.title,
      desc: t.whyUs.items.allCars.desc,
    }
  ];

  const stats = [
    { value: '24/7', label: currentLang === 'nl' ? 'Altijd open' : currentLang === 'en' ? 'Always Open' : 'Всегда открыты' },
    { value: '30-60', label: currentLang === 'nl' ? 'Minuten respons' : currentLang === 'en' ? 'Mins Arrival' : 'Минут до прибытия' },
  ];

  return (
    <section
      id="why-us"
      className="py-24 bg-[#0a0a0a] text-white relative overflow-hidden border-t border-neutral-900"
    >
      {/* Decorative vertical lines */}
      <div className="absolute top-0 bottom-0 left-[10%] w-[1px] bg-neutral-950 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-[10%] w-[1px] bg-neutral-950 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Bold Titles & Metrics */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full lg:sticky lg:top-28">
            <div>
              <span className="text-xs font-sans font-extrabold tracking-widest text-red-600 uppercase bg-red-950/30 px-3 py-1 rounded-full border border-red-900/45">
                {currentLang === 'nl' ? 'ONZE KRACHT' : currentLang === 'en' ? 'OUR STRENGTH' : 'НАШИ ПРЕИМУЩЕСТВА'}
              </span>
              <h2 className="mt-4 font-sans font-black text-3xl sm:text-5xl leading-tight tracking-tight text-white uppercase">
                {t.whyUs.title}
              </h2>
              <div className="h-[2px] w-16 bg-[#d4af37] mt-6 rounded-full" />
              <p className="mt-6 font-sans text-base sm:text-lg text-neutral-400 leading-relaxed">
                {t.whyUs.subtitle}
              </p>
            </div>

            {/* Metrics block */}
            <div className="grid grid-cols-2 gap-4 mt-12 pt-12 border-t border-neutral-900" id="why-us-stats">
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span className="font-sans font-black text-3xl sm:text-4xl text-[#d4af37] tracking-tight">
                    {stat.value}
                  </span>
                  <span className="mt-1.5 font-sans text-2s sm:text-xs text-neutral-400 font-semibold uppercase tracking-wider">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Benefits Stack */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8" id="why-us-benefits">
            {benefits.map((benefit, index) => {
              const IconComp = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="flex flex-col p-6 rounded-xl border border-neutral-900 bg-neutral-950/60 backdrop-blur-sm shadow-[0_8px_30px_rgb(0,0,0,0.4)] hover:border-neutral-800 hover:bg-neutral-900/35 transition-all duration-300 group"
                  id={`benefit-card-${index}`}
                >
                  <div className="inline-flex items-center justify-center p-3 w-12 h-12 rounded-lg bg-neutral-900 border border-neutral-800 text-[#d4af37] group-hover:text-white group-hover:bg-[#d4af37] group-hover:border-[#d4af37] transition-all duration-300">
                    <IconComp className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <h3 className="mt-5 font-sans font-extrabold text-lg text-white group-hover:text-[#d4af37] transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="mt-3 font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed">
                    {benefit.desc}
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
