import React, { useState } from 'react';
import { Language } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import HowItWorks from './components/HowItWorks';
import LocationSelector from './components/LocationSelector';
import Gallery from './components/Gallery';
import Reviews from './components/Reviews';
import Socials from './components/Socials';
import FAQ from './components/FAQ';
import Contacts from './components/Contacts';
import Footer from './components/Footer';

export default function App() {
  const [language, setLanguage] = useState<Language>('nl');

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden font-sans selection:bg-[#d4af37] selection:text-black scroll-smooth">
      
      {/* Sticky Premium Navigation Header */}
      <Header currentLang={language} onLanguageChange={setLanguage} />

      {/* Hero Parallax Area */}
      <Hero currentLang={language} />

      {/* Core Services Section */}
      <Services currentLang={language} />

      {/* Structural Benefits Section */}
      <WhyChooseUs currentLang={language} />

      {/* Process Schema Pipeline */}
      <HowItWorks currentLang={language} />

      {/* Client Geolocation & Form Incident Reporter */}
      <LocationSelector currentLang={language} />

      {/* Professional Visual Gallery */}
      <Gallery currentLang={language} />

      {/* Verified Google-Style Reviews */}
      <Reviews currentLang={language} />

      {/* Social Media Blogs Grid */}
      <Socials currentLang={language} />

      {/* Interactive FAQ Accordion List */}
      <FAQ currentLang={language} />

      {/* Direct Communication Contacts */}
      <Contacts currentLang={language} />

      {/* Brand Footer */}
      <Footer currentLang={language} />

    </div>
  );
}
