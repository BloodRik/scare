import React from 'react';
import { Language, translations } from '../types';
import { motion } from 'motion/react';

interface GalleryProps {
  currentLang: Language;
}

export default function Gallery({ currentLang }: GalleryProps) {
  const t = translations[currentLang];

  const galleryItems = [
    {
      title: currentLang === 'nl' ? 'Mobiel Banden Wisselen' : currentLang === 'en' ? 'Mobile Tire Fitting' : 'Мобильный шиномонтаж',
      url: 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?q=80&w=1000&auto=format&fit=crop',
      category: 'Service'
    },
    {
      title: currentLang === 'nl' ? 'Gespecialiseerd Gereedschap' : currentLang === 'en' ? 'Professional Toolkits' : 'Профессиональный инструмент',
      url: 'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?q=80&w=1000&auto=format&fit=crop',
      category: 'Tools'
    },
    {
      title: currentLang === 'nl' ? 'Premium Uitlijning' : currentLang === 'en' ? 'Premium Alloy Care' : 'Работа с премиум колесами',
      url: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1000&auto=format&fit=crop',
      category: 'Quality'
    },
    {
      title: currentLang === 'nl' ? 'Pechhulp ter Plaatse' : currentLang === 'en' ? 'Roadside Assistance' : 'Помощь на дорогах',
      url: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1000&auto=format&fit=crop',
      category: 'Emergency'
    },
    {
      title: currentLang === 'nl' ? 'Computersturing & Diagnose' : currentLang === 'en' ? 'Computer Diagnostics' : 'Компьютерная диагностика',
      url: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1000&auto=format&fit=crop',
      category: 'Technology'
    },
    {
      title: currentLang === 'nl' ? 'Seizoenswissel Klaar' : currentLang === 'en' ? 'Seasonal Tyres Prepared' : 'Сезонная резина готова',
      url: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=1000&auto=format&fit=crop',
      category: 'Tires'
    }
  ];

  return (
    <section
      id="gallery"
      className="pt-12 md:pt-16 pb-24 bg-[#050505] text-white border-t border-neutral-900/80 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-sans font-extrabold tracking-widest text-[#d4af37] uppercase bg-[#d4af37]/10 px-3 py-1 rounded-full border border-[#d4af37]/20">
            {currentLang === 'nl' ? 'GALERIJ' : currentLang === 'en' ? 'GALLERY' : 'ГАЛЕРЕЯ НАШИХ РАБОТ'}
          </span>
          <h2 className="mt-4 font-sans font-black text-3xl sm:text-5xl tracking-tight text-white uppercase">
            {t.gallery.title}
          </h2>
          <div className="h-[2px] w-16 bg-[#d4af37] mx-auto mt-6 rounded-full" />
          <p className="mt-6 font-sans text-base sm:text-lg text-neutral-400 leading-relaxed">
            {t.gallery.subtitle}
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="gallery-grid">
          {galleryItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900/40 aspect-[4/3] shadow-[0_15px_35px_rgba(0,0,0,0.4)] cursor-pointer"
              id={`gallery-item-${index}`}
            >
              {/* Image with Zoom */}
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-[800ms] group-hover:scale-110 filter brightness-[0.85] group-hover:brightness-100"
                referrerPolicy="no-referrer"
              />

              {/* Glassmorphic Description Bar Overlay */}
              <div className="absolute inset-x-4 bottom-4 z-20 p-4 rounded-xl border border-white/5 bg-black/50 backdrop-blur-md translate-y-[6px] group-hover:translate-y-0 opacity-80 group-hover:opacity-100 transition-all duration-300">
                <span className="text-[10px] font-sans font-bold tracking-widest text-[#d4af37] uppercase">
                  {item.category}
                </span>
                <h3 className="font-sans font-extrabold text-sm text-white mt-1">
                  {item.title}
                </h3>
              </div>

              {/* Soft Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-60 group-hover:opacity-30 transition-opacity z-10 pointer-events-none" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
