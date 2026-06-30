import React from 'react';
import { X, MapPin, ExternalLink, Building2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Language } from '../types';

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
}

export default function AddressModal({ isOpen, onClose, currentLang }: AddressModalProps) {
  if (!isOpen) return null;

  // Language translations for the Address Modal
  const modalTranslations = {
    nl: {
      title: 'Ons Adres',
      company: 'Bedrijf',
      addressLabel: 'Adresgegevens',
      openGmaps: 'Open in Google Kaarten',
      close: 'Sluiten',
      route: 'Plan route'
    },
    en: {
      title: 'Our Address',
      company: 'Company',
      addressLabel: 'Address Details',
      openGmaps: 'Open in Google Maps',
      close: 'Close',
      route: 'Get directions'
    },
    ru: {
      title: 'Наш Адрес',
      company: 'Компания',
      addressLabel: 'Адрес',
      openGmaps: 'Открыть в Google Картах',
      close: 'Закрыть',
      route: 'Проложить маршрут'
    }
  };

  const t = modalTranslations[currentLang] || modalTranslations.nl;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark Overlay with blur */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />

      {/* Modal Card Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', duration: 0.5 }}
        className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 text-white shadow-2xl flex flex-col z-10"
      >
        {/* Top Gold Line */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#d4af37] via-yellow-500 to-[#d4af37]" />

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-neutral-900">
          <div className="flex items-center gap-2.5">
            <MapPin className="w-5 h-5 text-[#d4af37]" />
            <h3 className="font-sans font-bold text-xl tracking-tight text-white uppercase">
              {t.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded-lg transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-160px)]">
          {/* Address Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-neutral-900 bg-neutral-900/40 flex flex-col gap-1">
              <span className="text-[10px] font-sans font-bold text-[#d4af37] uppercase tracking-widest flex items-center gap-1">
                <Building2 className="w-3 h-3" /> {t.company}
              </span>
              <span className="font-sans font-extrabold text-base text-white">MTS TIRES</span>
              <span className="text-xs text-neutral-400">Mobile Banden Service</span>
            </div>

            <div className="p-4 rounded-xl border border-neutral-900 bg-neutral-900/40 flex flex-col gap-1">
              <span className="text-[10px] font-sans font-bold text-[#d4af37] uppercase tracking-widest flex items-center gap-1">
                <MapPin className="w-3 h-3" /> {t.addressLabel}
              </span>
              <p className="font-sans text-sm font-semibold text-neutral-200 leading-relaxed">
                Plantijnlaan 13 bus 2<br />
                2220 Heist-op-den-Berg
              </p>
            </div>
          </div>

          {/* Map Frame Container with gold border */}
          <div className="relative rounded-xl overflow-hidden border border-[#d4af37] bg-neutral-900 h-[220px] w-full shadow-inner group">
            {/* Dark Custom Stylized OpenStreetMap iFrame */}
            <iframe
              title="MTS TIRES Office Location Map"
              width="100%"
              frameBorder="0"
              scrolling="no"
              marginHeight={0}
              marginWidth={0}
              src="https://www.openstreetmap.org/export/embed.html?bbox=4.7020%2C51.0645%2C4.7130%2C51.0710&amp;layer=mapnik&amp;marker=51.067762%2C4.707531"
              style={{
                border: 0,
                height: 'calc(100% + 40px)',
                filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)',
              }}
              className="absolute inset-x-0 top-0 w-full"
            />
            {/* Interactive hint cover to guide user to action button */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
          </div>

          {/* Action Button */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://www.google.com/maps?q=51.067762,4.707531&ll=51.067762,4.707531&z=16"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#d4af37] hover:bg-yellow-500 text-black font-sans font-bold text-sm uppercase tracking-wider transition-all shadow-lg shadow-yellow-500/10 hover:shadow-yellow-500/20 active:scale-95 text-center"
            >
              <ExternalLink className="w-4 h-4" />
              {t.openGmaps}
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
