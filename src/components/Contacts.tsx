import React from 'react';
import { Language, translations } from '../types';
import { Phone, MessageSquare, Send, Mail, Clock, Globe, Shield } from 'lucide-react';
import { motion } from 'motion/react';

interface ContactsProps {
  currentLang: Language;
}

export default function Contacts({ currentLang }: ContactsProps) {
  const t = translations[currentLang];

  const contactList = [
    {
      icon: Phone,
      title: t.contactBlock.phone,
      value: '+32 479 40 99 29',
      link: 'tel:+32479409929',
      color: 'text-red-500'
    },
    {
      icon: MessageSquare,
      title: 'WhatsApp',
      value: '+32 479 40 99 29',
      link: 'https://wa.me/32479409929',
      color: 'text-[#25D366]'
    },
    {
      icon: Send,
      title: 'Telegram',
      value: 'Mobile Banden Service',
      link: 'https://t.me/+32479409929',
      color: 'text-[#0088cc]'
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'krapa2915@gmail.com',
      link: 'mailto:krapa2915@gmail.com',
      color: 'text-[#d4af37]'
    }
  ];

  return (
    <section
      id="contact"
      className="pt-12 md:pt-16 pb-24 bg-[#050505] text-white border-t border-neutral-900 relative overflow-hidden"
    >
      <div className="absolute top-0 right-[20%] w-96 h-96 bg-red-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-sans font-extrabold tracking-widest text-[#d4af37] uppercase bg-[#d4af37]/10 px-3 py-1 rounded-full border border-[#d4af37]/20">
            {currentLang === 'nl' ? 'CONTACT' : currentLang === 'en' ? 'CONTACT' : 'КОНТАКТЫ'}
          </span>
          <h2 className="mt-4 font-sans font-black text-3xl sm:text-5xl tracking-tight text-white uppercase">
            {t.contactBlock.title}
          </h2>
          <div className="h-[2px] w-16 bg-red-600 mx-auto mt-6 rounded-full" />
          <p className="mt-6 font-sans text-base sm:text-lg text-neutral-400 leading-relaxed">
            {t.contactBlock.subtitle}
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch" id="contacts-block-grid">
          
          {/* Left Column (4 cols): Contact list cards stacked vertically */}
          <div className="lg:col-span-4 grid grid-cols-1 gap-4" id="contacts-details-cards">
            {contactList.map((contact, index) => {
              const IconComp = contact.icon;
              return (
                <motion.a
                  key={index}
                  href={contact.link}
                  target={contact.link.startsWith('http') ? '_blank' : undefined}
                  rel={contact.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="flex items-center gap-4 p-5 rounded-xl border border-neutral-850 bg-neutral-900/20 hover:border-neutral-700 hover:bg-neutral-900/50 transition-all duration-300 group"
                  id={`contact-card-${index}`}
                >
                  <div className={`p-3 rounded-lg bg-neutral-950 border border-neutral-800/80 group-hover:bg-neutral-900 transition-colors ${contact.color}`}>
                    <IconComp className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-sans text-[10px] font-extrabold uppercase tracking-widest text-neutral-500">
                      {contact.title}
                    </span>
                    <span className="font-sans font-extrabold text-sm text-white mt-1 group-hover:text-[#d4af37] transition-colors truncate break-all">
                      {contact.value}
                    </span>
                  </div>
                </motion.a>
              );
            })}
          </div>

          {/* Middle Column (4 cols): Operating status and calling button */}
          <div className="lg:col-span-4 flex flex-col justify-between p-6.5 rounded-2xl border border-neutral-800/60 bg-neutral-900/30 backdrop-blur-md shadow-[0_15px_40px_rgba(0,0,0,0.55)] relative overflow-hidden" id="contacts-status-panel">
            {/* Ambient gold glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/5 rounded-full blur-[40px] pointer-events-none" />

            <div className="flex flex-col gap-5">
              {/* Working hours status */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-red-950/45 border border-red-900/60 text-red-500 rounded-xl">
                  <Clock className="w-4 h-4 animate-pulse" />
                </div>
                <div className="flex flex-col">
                  <span className="font-sans text-[10px] font-extrabold uppercase tracking-widest text-neutral-500">{t.contactBlock.hours}</span>
                  <span className="font-sans font-black text-xs sm:text-sm text-white mt-1 uppercase tracking-tight">{t.contactBlock.hoursVal}</span>
                </div>
              </div>

              {/* Coverage area status */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-yellow-950/30 border border-yellow-900/50 text-[#d4af37] rounded-xl">
                  <Globe className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="font-sans text-[10px] font-extrabold uppercase tracking-widest text-neutral-500">{t.contactBlock.region}</span>
                  <span className="font-sans font-black text-xs sm:text-sm text-white mt-1 uppercase tracking-tight">{t.contactBlock.regionVal}</span>
                </div>
              </div>

              {/* License/trust tag */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-emerald-950/30 border border-emerald-900/40 text-emerald-500 rounded-xl">
                  <Shield className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="font-sans text-[10px] font-extrabold uppercase tracking-widest text-neutral-500">Service level</span>
                  <span className="font-sans font-black text-xs text-emerald-500 mt-1 uppercase tracking-wide">
                    Premium Dealership Standard
                  </span>
                </div>
              </div>
            </div>

            {/* Calling button */}
            <div className="mt-6">
              <a
                href="tel:+32479409929"
                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-red-600 to-red-800 text-white font-sans font-black text-xs uppercase tracking-wider py-4 rounded-xl border border-red-500 shadow-[0_12px_24px_rgba(239,68,68,0.25)] hover:shadow-[0_12px_30px_rgba(239,68,68,0.45)] hover:scale-102 hover:from-red-500 hover:to-red-700 active:scale-98 transition-all duration-300"
              >
                <Phone className="w-4 h-4 text-white animate-bounce" />
                {t.contactBlock.callBtn}
              </a>
            </div>
          </div>

          {/* Right Column (4 cols): Business Card Image Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 flex flex-col justify-between p-6 rounded-2xl border border-neutral-800/85 bg-neutral-900/30 backdrop-blur-md shadow-[0_15px_40px_rgba(0,0,0,0.55)] relative overflow-hidden group"
            id="contacts-business-card"
          >
            {/* Ambient gold glow */}
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#d4af37]/5 rounded-full blur-[40px] pointer-events-none" />

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="font-sans text-[10px] font-extrabold uppercase tracking-widest text-[#d4af37]">
                  {currentLang === 'nl' ? 'Ons Visitekaartje' : currentLang === 'en' ? 'Our Business Card' : 'Наша Визитка'}
                </span>
                <span className="h-2 w-2 rounded-full bg-[#d4af37] animate-pulse" />
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {currentLang === 'nl' 
                  ? 'Sla ons digitale visitekaartje op om direct bij de hand te hebben voor 24/7 bandenpechhulp.' 
                  : currentLang === 'en' 
                    ? 'Save our digital business card to have quick access for 24/7 mobile roadside assistance.' 
                    : 'Сохраните нашу цифровую визитку для быстрого вызова мобильного шиномонтажа 24/7.'}
              </p>
            </div>

            {/* The Image with premium card styling and scale-up effect */}
            <div className="relative mt-4 aspect-[1.58/1] w-full rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950 shadow-[0_10px_30px_rgba(0,0,0,0.6)] group-hover:border-[#d4af37]/40 transition-all duration-300">
              <img
                src="/wisit.jpg"
                alt="Mobile Banden Service Visitekaartje"
                className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const img = e.currentTarget as HTMLImageElement;
                  img.onerror = null;
                  img.src = '/fone.png';
                }}
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-all duration-300" />
            </div>

            {/* Action link to download/view card */}
            <div className="mt-5">
              <a
                href="/wisit.jpg"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-neutral-950 hover:bg-neutral-900 text-white font-sans font-bold text-xs uppercase tracking-wider py-4 rounded-xl border border-neutral-800 hover:border-[#d4af37] transition-all duration-300"
              >
                {currentLang === 'nl' ? 'Bekijken / Opslaan' : currentLang === 'en' ? 'View / Save Card' : 'Открыть / Сохранить'}
              </a>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
