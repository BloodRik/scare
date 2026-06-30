import React from 'react';
import { Language, translations } from '../types';
import { Phone, Mail, Clock, Globe, MessageSquare, Send, Video, Instagram, Facebook } from 'lucide-react';

interface FooterProps {
  currentLang: Language;
}

export default function Footer({ currentLang }: FooterProps) {
  const t = translations[currentLang];

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const socials = [
    { icon: MessageSquare, url: 'https://wa.me/32479409929', color: 'hover:text-[#25D366] hover:border-[#25D366]' },
    { icon: Send, url: 'https://t.me/+32479409929', color: 'hover:text-[#0088cc] hover:border-[#0088cc]' },
    { icon: Video, url: 'https://www.tiktok.com/@mobilebandenservice', color: 'hover:text-[#ff0050] hover:border-[#ff0050]' },
    { icon: Instagram, url: 'https://www.instagram.com/mobilebandenservice', color: 'hover:text-[#E1306C] hover:border-[#E1306C]' },
    { icon: Facebook, url: 'https://www.facebook.com/mobilebandenservice', color: 'hover:text-[#1877F2] hover:border-[#1877F2]' }
  ];

  return (
    <footer
      id="main-footer"
      className="bg-black text-neutral-400 border-t border-neutral-900 pt-16 pb-8 font-sans"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-12 border-b border-neutral-900" id="footer-main-grid">
          
          {/* Column 1: Brand & Desc (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div
              onClick={handleScrollToTop}
              className="flex items-center gap-3 cursor-pointer group w-fit"
              id="footer-logo-container"
            >
              <div className="relative w-12 h-12 overflow-hidden rounded-full border border-neutral-800 bg-neutral-900 flex items-center justify-center p-1">
                <img
                  src="/logo.png"
                  alt="Mobile Banden Service"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="%23111" stroke="%23d4af37" stroke-width="2"/><circle cx="50" cy="50" r="30" fill="none" stroke="%23fff" stroke-dasharray="5,2" stroke-width="3"/></svg>';
                  }}
                />
              </div>
              <div className="flex flex-col">
                <span className="font-sans font-black text-lg leading-tight tracking-wide text-white group-hover:text-[#d4af37] transition-colors">
                  MTS TIRES
                </span>
                <span className="font-sans text-xs tracking-widest text-[#d4af37] uppercase font-bold">
                  Service 24/7
                </span>
              </div>
            </div>

            <p className="text-sm text-neutral-400 leading-relaxed max-w-sm mt-2">
              {t.footer.desc}
            </p>

            {/* Social Icons inside Column 1 */}
            <div className="flex items-center gap-3.5 mt-2" id="footer-social-icons">
              {socials.map((soc, i) => {
                const Icon = soc.icon;
                return (
                  <a
                    key={i}
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2.5 rounded-full border border-neutral-850 bg-neutral-950/60 text-neutral-500 transition-all duration-300 ${soc.color}`}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Quick Links (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <h4 className="text-white text-xs font-black uppercase tracking-widest border-l-2 border-red-600 pl-3">
              {currentLang === 'nl' ? 'Navigatie' : currentLang === 'en' ? 'Navigation' : 'Навигация'}
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm mt-2" id="footer-links-list">
              <li>
                <a href="#home" className="hover:text-[#d4af37] transition-colors">
                  {t.nav.home}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#d4af37] transition-colors">
                  {t.nav.services}
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-[#d4af37] transition-colors">
                  {t.nav.about}
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-[#d4af37] transition-colors">
                  {t.nav.reviews}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#d4af37] transition-colors">
                  {t.nav.contact}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Credentials (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <h4 className="text-white text-xs font-black uppercase tracking-widest border-l-2 border-[#d4af37] pl-3">
              Info & Emergency
            </h4>
            <div className="flex flex-col gap-4 text-sm mt-2" id="footer-contacts-list">
              <a href="tel:+32479409929" className="flex items-center gap-3 hover:text-[#d4af37] transition-colors group">
                <Phone className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
                <span className="font-extrabold text-white">+32 479 40 99 29</span>
              </a>
              <a href="mailto:krapa2915@gmail.com" className="flex items-center gap-3 hover:text-[#d4af37] transition-colors">
                <Mail className="w-4 h-4 text-[#d4af37]" />
                <span>krapa2915@gmail.com</span>
              </a>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-neutral-500" />
                <span>{t.contactBlock.hoursVal}</span>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-neutral-500" />
                <span>{t.contactBlock.regionVal}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-2 text-xs" id="footer-bottom-bar">
          <span>{t.footer.rights}</span>
          <div className="flex items-center gap-6">
            <a href="#home" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#home" className="hover:text-white transition-colors">Terms of Service</a>
            <button
              onClick={handleScrollToTop}
              className="text-[#d4af37] hover:text-white transition-colors font-bold uppercase tracking-wider bg-transparent border-none cursor-pointer"
            >
              ↑ Top
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
