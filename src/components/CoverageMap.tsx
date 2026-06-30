import React, { useEffect, useRef } from 'react';
import { Language, translations } from '../types';
import { Map, Shield, CircleDot, Clock, Compass } from 'lucide-react';
import { motion } from 'motion/react';
import L from 'leaflet';

interface CoverageMapProps {
  currentLang: Language;
}

export default function CoverageMap({ currentLang }: CoverageMapProps) {
  const t = translations[currentLang];
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const container = mapRef.current;
    let map: L.Map | null = null;

    try {
      if ((container as any)._leaflet_id) {
        (container as any)._leaflet_id = null;
      }

      // Center on Brussels to see all of Belgium
      map = L.map(container, {
        center: [50.8503, 4.3517],
        zoom: 8,
        zoomControl: false,
        scrollWheelZoom: false, // Prevent zoom on page scroll
      });
      mapInstance.current = map;

      // Dark style tile layer from CartoDB
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap &copy; CARTO',
        subdomains: 'abcd',
        maxZoom: 15,
      }).addTo(map);

      // Circle representing entire Belgian territory coverage (150km radius centered on Brussels)
      L.circle([50.8503, 4.3517], {
        color: '#d4af37',
        fillColor: '#ef4444',
        fillOpacity: 0.12,
        weight: 1.5,
        radius: 125000, // 125 km radius
      }).addTo(map);

      // Active Cities with custom mini gold indicators
      const cities = [
        { name: 'Brussel / Bruxelles', lat: 50.8503, lon: 4.3517 },
        { name: 'Antwerpen / Anvers', lat: 51.2194, lon: 4.4025 },
        { name: 'Gent / Gand', lat: 51.0543, lon: 3.7174 },
        { name: 'Brugge / Bruges', lat: 51.2093, lon: 3.2247 },
        { name: 'Luik / Liège', lat: 50.6326, lon: 5.5797 },
        { name: 'Hasselt', lat: 50.9307, lon: 5.3378 },
        { name: 'Kortrijk', lat: 50.8280, lon: 3.2649 },
        { name: 'Namur', lat: 50.4674, lon: 4.8715 },
      ];

      cities.forEach((city) => {
        const miniIcon = L.divIcon({
          html: `
            <div class="relative flex items-center justify-center">
              <span class="absolute w-3 h-3 bg-[#d4af37]/40 rounded-full animate-ping"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-[#d4af37]"></span>
            </div>
          `,
          className: 'city-indicator',
          iconSize: [12, 12],
          iconAnchor: [6, 6],
        });

        const marker = L.marker([city.lat, city.lon], { icon: miniIcon }).addTo(map!);
        
        // Premium customized popup
        marker.bindPopup(`
          <div style="background-color: #111; color: #fff; font-family: sans-serif; padding: 4px 8px; border-radius: 4px; border: 1px solid #d4af37; font-size: 11px; font-weight: bold;">
            📍 ${city.name} - Active 24/7
          </div>
        `, {
          closeButton: false,
          className: 'premium-map-popup'
        });
      });
    } catch (error) {
      console.error('Failed to initialize Coverage Leaflet Map:', error);
    }

    return () => {
      try {
        if (map) {
          map.remove();
        }
      } catch (error) {
        console.error('Error removing Coverage map:', error);
      }
      mapInstance.current = null;
    };
  }, []);

  return (
    <section
      id="coverage-block"
      className="py-24 bg-[#080808] text-white border-t border-neutral-900 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Layout: Info Card on the left, map on the right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Info Side (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <span className="self-start text-xs font-sans font-extrabold tracking-widest text-[#d4af37] uppercase bg-[#d4af37]/10 px-3 py-1 rounded-full border border-[#d4af37]/20">
              {t.coverage.badge}
            </span>
            <h2 className="font-sans font-black text-3xl sm:text-5xl leading-tight tracking-tight text-white uppercase">
              {t.coverage.title}
            </h2>
            <div className="h-[2px] w-16 bg-red-600 mt-2 rounded-full" />
            
            <p className="font-sans text-sm sm:text-base text-neutral-400 leading-relaxed mt-4">
              {t.coverage.desc}
            </p>

            {/* Hub checklist */}
            <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-neutral-900/60">
              <div className="flex items-center gap-2.5 text-xs font-sans font-extrabold tracking-wider uppercase text-neutral-300">
                <CircleDot className="w-4 h-4 text-[#d4af37]" />
                Vlaanderen
              </div>
              <div className="flex items-center gap-2.5 text-xs font-sans font-extrabold tracking-wider uppercase text-neutral-300">
                <CircleDot className="w-4 h-4 text-red-500" />
                Wallonië
              </div>
              <div className="flex items-center gap-2.5 text-xs font-sans font-extrabold tracking-wider uppercase text-neutral-300">
                <CircleDot className="w-4 h-4 text-[#d4af37]" />
                Brussel
              </div>
              <div className="flex items-center gap-2.5 text-xs font-sans font-extrabold tracking-wider uppercase text-neutral-300">
                <CircleDot className="w-4 h-4 text-red-500" />
                Antwerpen
              </div>
            </div>
          </div>

          {/* Map Side (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
            <div ref={mapRef} className="w-full h-[360px] sm:h-[420px] md:h-[460px]" id="coverage-map-canvas" />
          </div>

        </div>
      </div>
    </section>
  );
}
