import React, { useState, useEffect, useRef } from 'react';
import { Language, translations } from '../types';
import { Menu, X, PhoneCall, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import AddressModal from './AddressModal';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

export default function Header({ currentLang, onLanguageChange }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAddressOpen, setIsAddressOpen] = useState(false);
  const t = translations[currentLang];
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close drawer when clicking outside of the header component
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (isOpen && headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    
    // A small timeout ensures the state change settles and prevents mobile browser scroll conflicts
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const headerOffset = 90;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  const navItems = [
    { id: 'home', label: t.nav.home },
    { id: 'services', label: t.nav.services },
    { id: 'why-us', label: t.nav.about },
    { id: 'address', label: t.nav.address },
    { id: 'reviews', label: t.nav.reviews },
    { id: 'socials', label: t.nav.blog },
    { id: 'contact', label: t.nav.contact }
  ];

  return (
    <header
      ref={headerRef}
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-black/85 backdrop-blur-md border-b border-neutral-800/80 py-5 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
          : 'bg-gradient-to-b from-black/80 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo on the left */}
          <div
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-3 cursor-pointer group"
            id="header-logo-container"
          >
            <div className="relative w-12 h-12 overflow-hidden rounded-full border border-neutral-800/80 bg-neutral-900 flex items-center justify-center p-1 transition-transform group-hover:scale-105">
              <img
                src="/logo.png"
                alt="Mobile Banden Service"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  // Fallback if image isn't available
                  (e.currentTarget as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="%23111" stroke="%23d4af37" stroke-width="2"/><circle cx="50" cy="50" r="30" fill="none" stroke="%23fff" stroke-dasharray="5,2" stroke-width="3"/></svg>';
                }}
              />
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-bold text-lg leading-tight tracking-wide text-white group-hover:text-[#d4af37] transition-colors">
                MTS TIRES
              </span>
              <span className="font-sans text-xs tracking-widest text-[#d4af37] uppercase font-semibold">
                Service 24/7
              </span>
            </div>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-8" id="header-nav-desktop">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'address') {
                    setIsAddressOpen(true);
                  } else {
                    scrollToSection(item.id);
                  }
                }}
                className="font-sans text-sm font-medium text-neutral-300 hover:text-white relative py-2 transition-colors after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#d4af37] hover:after:w-full after:transition-all after:duration-300 cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Controls: Language Selector, Emergency Button (Desktop) */}
          <div className="hidden lg:flex items-center gap-6" id="header-controls-desktop">
            {/* Language Selector */}
            <div className="relative flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-800 bg-neutral-900/60" id="lang-selector-desktop">
              <Globe className="w-4 h-4 text-neutral-400" />
              <select
                value={currentLang}
                onChange={(e) => onLanguageChange(e.target.value as Language)}
                className="bg-transparent text-white text-xs font-semibold focus:outline-none cursor-pointer pr-1"
                aria-label="Select Language"
              >
                <option value="nl" className="bg-neutral-900 text-white">NL</option>
                <option value="en" className="bg-neutral-900 text-white">EN</option>
                <option value="ru" className="bg-neutral-900 text-white">RU</option>
              </select>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-4" id="header-controls-mobile">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-neutral-400 hover:text-white rounded-md hover:bg-neutral-900 focus:outline-none transition-colors cursor-pointer"
              id="menu-toggle-btn"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden border-t border-neutral-800 bg-neutral-950/95 backdrop-blur-lg overflow-hidden"
            id="mobile-drawer-menu"
          >
            <div className="px-4 pt-3 pb-6 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.id === 'address') {
                      setIsAddressOpen(true);
                      setIsOpen(false);
                    } else {
                      scrollToSection(item.id);
                    }
                  }}
                  className="block w-full text-left font-sans text-base font-semibold text-neutral-300 hover:text-white hover:bg-neutral-900 px-3 py-2 rounded-lg transition-colors cursor-pointer"
                >
                  {item.label}
                </button>
              ))}

              <div className="border-t border-neutral-800/80 pt-4 flex flex-col gap-4">
                {/* Mobile Language Selector */}
                <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-neutral-400" />
                    <span className="text-sm font-medium text-neutral-300">Language / Taal</span>
                  </div>
                  <div className="flex gap-2">
                    {(['nl', 'en', 'ru'] as Language[]).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => onLanguageChange(lang)}
                        className={`text-xs px-2.5 py-1 rounded font-bold ${
                          currentLang === lang
                            ? 'bg-[#d4af37] text-black shadow-md'
                            : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-white'
                        } transition-all`}
                      >
                        {lang.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Address Information Modal Popup */}
      <AnimatePresence>
        {isAddressOpen && (
          <AddressModal
            isOpen={isAddressOpen}
            onClose={() => setIsAddressOpen(false)}
            currentLang={currentLang}
          />
        )}
      </AnimatePresence>
    </header>
  );
}
