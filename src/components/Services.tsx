import React from 'react';
import { Language, translations } from '../types';
import { Truck, Scale, Disc, Wrench, ShieldAlert, Snowflake } from 'lucide-react';
import { motion } from 'motion/react';

interface ServicesProps {
  currentLang: Language;
}

export default function Services({ currentLang }: ServicesProps) {
  const t = translations[currentLang];

  const serviceList = [
    {
      id: 'mobile-tire',
      icon: Truck,
      title: t.services.mobileTire.title,
      desc: t.services.mobileTire.desc,
      color: 'from-amber-500/20 to-yellow-600/5',
      borderColor: 'group-hover:border-[#d4af37]/50',
      iconColor: 'text-[#d4af37]'
    },
    {
      id: 'balancing',
      icon: Scale,
      title: t.services.balancing.title,
      desc: t.services.balancing.desc,
      color: 'from-red-600/10 to-red-950/5',
      borderColor: 'group-hover:border-red-500/50',
      iconColor: 'text-red-500'
    },
    {
      id: 'tire-replacement',
      icon: Disc,
      title: t.services.tireReplacement.title,
      desc: t.services.tireReplacement.desc,
      color: 'from-amber-500/20 to-yellow-600/5',
      borderColor: 'group-hover:border-[#d4af37]/50',
      iconColor: 'text-[#d4af37]'
    },
    {
      id: 'puncture-repair',
      icon: Wrench,
      title: t.services.punctureRepair.title,
      desc: t.services.punctureRepair.desc,
      color: 'from-red-600/10 to-red-950/5',
      borderColor: 'group-hover:border-red-500/50',
      iconColor: 'text-red-500'
    },
    {
      id: 'roadside',
      icon: ShieldAlert,
      title: t.services.roadside.title,
      desc: t.services.roadside.desc,
      color: 'from-amber-500/20 to-yellow-600/5',
      borderColor: 'group-hover:border-[#d4af37]/50',
      iconColor: 'text-[#d4af37]'
    },
    {
      id: 'seasonal',
      icon: Snowflake,
      title: t.services.seasonal.title,
      desc: t.services.seasonal.desc,
      color: 'from-blue-600/10 to-blue-950/5',
      borderColor: 'group-hover:border-blue-500/50',
      iconColor: 'text-blue-400'
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  return (
    <section
      id="services"
      className="pt-12 md:pt-16 pb-24 bg-neutral-950 text-white relative overflow-hidden"
    >
      {/* Background visual cues */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-80 h-80 bg-red-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-18">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-sans font-extrabold tracking-widest text-[#d4af37] uppercase bg-[#d4af37]/10 px-3 py-1 rounded-full border border-[#d4af37]/20">
              SERVICE 24/7
            </span>
            <h2 className="mt-4 font-sans font-black text-3xl sm:text-5xl tracking-tight text-white uppercase">
              {t.services.title}
            </h2>
            <div className="h-[2px] w-16 bg-gradient-to-r from-red-600 to-[#d4af37] mx-auto mt-6 rounded-full" />
            <p className="mt-6 font-sans text-base sm:text-lg text-neutral-400 leading-relaxed">
              {t.services.subtitle}
            </p>
          </motion.div>
        </div>

        {/* Services Card Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          id="services-grid"
        >
          {serviceList.map((service) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                whileHover={{ y: -6, scale: 1.01 }}
                whileTap={{ scale: 0.97 }}
                className="group relative h-full rounded-2xl border border-neutral-800/80 bg-neutral-900/45 backdrop-blur-md p-8 shadow-[0_12px_40px_rgba(0,0,0,0.3)] transition-all duration-300 hover:bg-neutral-900/70 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)] cursor-pointer"
                id={`service-card-${service.id}`}
              >
                {/* Accent glow on card hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                
                {/* Border glowing line */}
                <div className={`absolute inset-0 rounded-2xl border border-transparent ${service.borderColor} transition-colors duration-500 pointer-events-none`} />

                {/* Service Icon */}
                <div className="relative mb-6">
                  <div className="inline-flex p-4 rounded-xl bg-neutral-950 border border-neutral-800/60 shadow-inner group-hover:border-[#d4af37]/35 group-hover:shadow-[0_0_15px_rgba(212,175,55,0.15)] transition-all duration-300">
                    <IconComponent className={`w-8 h-8 ${service.iconColor} group-hover:scale-110 transition-transform duration-300`} />
                  </div>
                </div>

                {/* Service Title & Desc */}
                <h3 className="font-sans font-extrabold text-xl text-white group-hover:text-[#d4af37] transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="mt-4 font-sans text-sm text-neutral-400 leading-relaxed group-hover:text-neutral-300 transition-colors duration-300">
                  {service.desc}
                </p>

                {/* Decorative Bottom Corner Element */}
                <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-neutral-800 group-hover:bg-[#d4af37]/80 transition-colors" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
