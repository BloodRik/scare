import React from 'react';
import { Language, translations } from '../types';
import { Phone, ChevronDown, Award, MapPin } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';

interface HeroProps {
  currentLang: Language;
}

export default function Hero({ currentLang }: HeroProps) {
  const t = translations[currentLang];
  const { scrollY } = useScroll();

  // Create parallax effect: move background slower than scrolling and fade out slightly
  const yBgValue = useTransform(scrollY, [0, 600], [0, 180]);
  const opacityBg = useTransform(scrollY, [0, 600], [1, 0.45]);
  const scaleBg = useTransform(scrollY, [0, 600], [1, 1.05]);
  const yContent = useTransform(scrollY, [0, 600], [0, -40]);

  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const yBg = isMobile ? 0 : yBgValue;

  const handleScrollToNext = () => {
    const nextSec = document.getElementById('services');
    if (nextSec) {
      const headerOffset = 80;
      const elementPosition = nextSec.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white"
    >
      {/* Background Image Container with Parallax & Blur */}
      <motion.div
        style={{ y: yBg, opacity: opacityBg, scale: scaleBg }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-black/60 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/60 via-transparent to-neutral-950/60 z-10" />
        <img
          src="/fone.png"
          alt="Mobile Banden Service Van servicing a BMW"
          className="w-full h-full object-cover object-center scale-[1.02] filter brightness-[0.75] md:brightness-[0.90]"
          referrerPolicy="no-referrer"
          onError={(e) => {
            const img = e.currentTarget as HTMLImageElement;
            img.onerror = null; // Prevent infinite loading loops
            img.src = 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=2000&auto=format&fit=crop';
          }}
        />
      </motion.div>

      {/* Hero Content Grid */}
      <motion.div
        style={{ y: yContent }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-44 md:pt-52 pb-20 md:pb-28 text-center flex flex-col items-center"
        id="hero-content"
      >
        {/* Core Headings with luxurious typography */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-sans font-black text-4xl sm:text-6xl lg:text-7xl leading-[1.1] tracking-tight text-white max-w-4xl uppercase"
          id="hero-title"
        >
          Mobile <span className="bg-gradient-to-r from-[#d4af37] via-[#f7e1a0] to-[#e5b842] bg-clip-text text-transparent">Banden</span> Service
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-4 md:mt-6 font-sans text-lg sm:text-2xl text-neutral-300 font-medium tracking-wide max-w-2xl"
          id="hero-subtitle"
        >
          {t.hero.subtitle}
        </motion.p>

        {/* Feature Highlights directly from business card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-5 md:mt-8 flex flex-wrap justify-center gap-x-4 sm:gap-x-6 gap-y-2 text-xs sm:text-sm font-sans font-semibold tracking-wider text-neutral-400 uppercase"
        >
          <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#d4af37]" /> SNEL</span>
          <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse" /> BETROUWBAAR</span>
          <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#d4af37]" /> OP AFSPRAAK</span>
        </motion.div>

        {/* Call to Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-24 sm:mt-12 flex flex-col gap-4 w-full max-w-[290px] sm:max-w-lg items-center px-4"
          id="hero-actions"
        >
          {/* Main Buttons Row */}
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            {/* Main Red Action Call Button */}
            <a
              href="tel:+32479409929"
              className="flex-1 flex items-center justify-center gap-2 md:gap-3 bg-gradient-to-r from-red-600 to-red-800 text-white font-sans font-extrabold text-xs md:text-sm uppercase tracking-wider py-2.5 px-6 md:py-4 md:px-8 rounded-full border border-red-500 shadow-[0_15px_30px_rgba(239,68,68,0.25)] hover:shadow-[0_15px_35px_rgba(239,68,68,0.45)] hover:scale-102 hover:from-red-500 hover:to-red-700 active:scale-98 transition-all duration-300"
            >
              <Phone className="w-3.5 h-3.5 md:w-4 md:h-4 text-white animate-bounce" />
              {t.hero.callNow}
            </a>

            {/* Social Messaging Channels */}
            <div className="flex gap-3 md:gap-4 sm:flex-1">
              {/* WhatsApp */}
              <a
                href="https://wa.me/32479409929"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 md:gap-2.5 px-3 py-2.5 md:py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-base transition-all shadow-lg active:scale-95"
              >
                <svg className="w-4 h-4 md:w-5 md:h-5 fill-current text-white" viewBox="0 0 24 24">
                  <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.993L2 22l5.233-1.371a9.936 9.936 0 0 0 4.777 1.22h.005c5.505 0 9.989-4.478 9.99-9.985A9.998 9.998 0 0 0 12.012 2zm0 1.637c4.6 0 8.344 3.744 8.345 8.347a8.35 8.35 0 0 1-8.345 8.348 8.32 8.32 0 0 1-4.249-1.157l-.304-.18-3.159.828.843-3.08-.198-.315a8.318 8.318 0 0 1-1.282-4.44c0-4.605 3.746-8.351 8.347-8.351z" />
                </svg>
                <span>WhatsApp</span>
              </a>

              {/* Telegram */}
              <a
                href="https://t.me/32479409929"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 md:gap-2.5 px-3 py-2.5 md:py-4 rounded-full bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs sm:text-base transition-all shadow-lg active:scale-95"
              >
                <svg className="w-4 h-4 md:w-5 md:h-5 fill-current text-white" viewBox="0 0 24 24">
                  <path d="M11.944 0C5.344 0 0 5.344 0 11.944c0 6.6 5.344 11.944 11.944 11.944 6.6 0 11.944-5.344 11.944-11.944C23.888 5.344 18.544 0 11.944 0zm5.556 8.333l-1.912 9.033c-.144.644-.528.8-.1.256l-2.911-2.144-1.405 1.355c-.156.156-.289.289-.589.289l.211-2.989 5.439-4.917c.239-.211-.05-.328-.367-.117l-6.722 4.233-2.894-.9c-.628-.2-1.078-.628-.133-.983l11.306-4.361c.528-.189.989.133.789.7z" />
                </svg>
                <span>Telegram</span>
              </a>
            </div>
          </div>

          {/* Location Button */}
          <button
            onClick={() => {
              const el = document.getElementById('location-block');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="w-auto inline-flex items-center justify-center gap-2 md:gap-2.5 px-6 py-2.5 md:px-8 md:py-3.5 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-white font-bold text-xs md:text-sm uppercase tracking-widest transition-all border border-neutral-800 hover:border-[#d4af37] shadow-lg active:scale-95 group"
          >
            <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#d4af37] group-hover:animate-bounce" />
            <span>{t.hero.locationBtn}</span>
          </button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          onClick={handleScrollToNext}
          className="absolute bottom-4 sm:bottom-8 cursor-pointer p-2 rounded-full border border-neutral-800 bg-neutral-950/50 backdrop-blur-sm text-neutral-400 hover:text-[#d4af37] hover:border-[#d4af37]/40 transition-all z-20"
          id="hero-scroll-indicator"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
