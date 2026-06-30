import React from 'react';
import { Language, translations } from '../types';
import { Video, Instagram, Facebook, Share2 } from 'lucide-react';
import { motion } from 'motion/react';

interface SocialsProps {
  currentLang: Language;
}

export default function Socials({ currentLang }: SocialsProps) {
  const t = translations[currentLang];

  const socialLinks = [
    {
      name: 'Telegram Channel',
      icon: Share2,
      url: 'https://t.me/MobileBandenService',
      color: 'hover:bg-[#0088cc]/10 hover:border-[#0088cc]/40 hover:text-[#0088cc]',
      iconColor: 'text-[#0088cc]',
      desc: currentLang === 'nl' ? 'Nieuws & dagelijkse verhalen' : currentLang === 'en' ? 'News & daily stories' : 'Новости и ежедневные отчеты'
    },
    {
      name: 'TikTok',
      icon: Video,
      url: 'https://www.tiktok.com/@mobilebandenservice',
      color: 'hover:bg-[#ff0050]/10 hover:border-[#ff0050]/40 hover:text-[#ff0050]',
      iconColor: 'text-[#ff0050]',
      desc: currentLang === 'nl' ? 'Korte videos van interventies' : currentLang === 'en' ? 'Intervention highlights' : 'Короткие видео выездов'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://www.instagram.com/mobilebandenservice',
      color: 'hover:bg-[#E1306C]/10 hover:border-[#E1306C]/40 hover:text-[#E1306C]',
      iconColor: 'text-[#E1306C]',
      desc: currentLang === 'nl' ? 'Foto\'s van geslaagde werken' : currentLang === 'en' ? 'Before & after photos' : 'Фотоотчеты и автоэстетика'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: 'https://www.facebook.com/mobilebandenservice',
      color: 'hover:bg-[#1877F2]/10 hover:border-[#1877F2]/40 hover:text-[#1877F2]',
      iconColor: 'text-[#1877F2]',
      desc: currentLang === 'nl' ? 'Klantbeoordelingen & info' : currentLang === 'en' ? 'Community reviews' : 'Отзывы сообщества и анонсы'
    }
  ];

  return (
    <section
      id="socials"
      className="pt-12 md:pt-16 pb-24 bg-[#0a0a0a] text-white border-t border-neutral-900 relative overflow-hidden"
    >
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-sans font-extrabold tracking-widest text-[#d4af37] uppercase bg-[#d4af37]/10 px-3 py-1 rounded-full border border-[#d4af37]/20">
            {currentLang === 'nl' ? 'BLOG' : currentLang === 'en' ? 'OUR BLOG' : 'СОЦИАЛЬНЫЕ СЕТИ'}
          </span>
          <h2 className="mt-4 font-sans font-black text-3xl sm:text-5xl tracking-tight text-white uppercase">
            {t.socials.title}
          </h2>
          <div className="h-[2px] w-16 bg-red-600 mx-auto mt-6 rounded-full" />
          <p className="mt-6 font-sans text-base sm:text-lg text-neutral-400 leading-relaxed">
            {t.socials.subtitle}
          </p>
        </div>

        {/* Socials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="socials-grid">
          {socialLinks.map((social, index) => {
            const IconComponent = social.icon;
            return (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`group flex items-start gap-4 p-5 rounded-xl border border-neutral-800/80 bg-neutral-900/30 backdrop-blur-md transition-all duration-300 ${social.color}`}
                id={`social-link-${index}`}
              >
                <div className={`p-3 rounded-lg bg-neutral-950 border border-neutral-800/60 transition-colors group-hover:bg-transparent ${social.iconColor}`}>
                  <IconComponent className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div className="flex flex-col">
                  <span className="font-sans font-bold text-sm text-white group-hover:text-inherit transition-colors">
                    {social.name}
                  </span>
                  <span className="font-sans text-2xs text-neutral-500 mt-1">
                    {social.desc}
                  </span>
                </div>
              </motion.a>
            );
          })}
        </div>

      </div>
    </section>
  );
}
