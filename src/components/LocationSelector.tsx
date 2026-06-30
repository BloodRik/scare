import React, { useState, useEffect, useRef } from 'react';
import { Language, translations } from '../types';
import { MapPin, Navigation, MessageSquare, Send, Mail, Copy, Check, ShieldAlert, Locate } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import L from 'leaflet';

interface LocationSelectorProps {
  currentLang: Language;
}

export default function LocationSelector({ currentLang }: LocationSelectorProps) {
  const t = translations[currentLang];
  const [lat, setLat] = useState<number>(51.0000); // Default to Vlaanderen
  const [lon, setLon] = useState<number>(4.3000);
  const [address, setAddress] = useState<string>(
    currentLang === 'nl' ? 'Vlaanderen, België' : currentLang === 'en' ? 'Flanders, Belgium' : 'Фландрия, Бельгия'
  );
  const [comment, setComment] = useState<string>('');
  const [isDetecting, setIsDetecting] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [showChannelModal, setShowChannelModal] = useState<boolean>(false);
  const [isManuallyPlaced, setIsManuallyPlaced] = useState<boolean>(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markerInstance = useRef<L.Marker | null>(null);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapRef.current) return;

    const container = mapRef.current;
    let map: L.Map | null = null;

    try {
      if ((container as any)._leaflet_id) {
        (container as any)._leaflet_id = null;
      }

      // Create map
      map = L.map(container, {
        center: [lat, lon],
        zoom: 13,
        zoomControl: false, // Custom position or hidden for cleaner UI
        attributionControl: false,
      });
      mapInstance.current = map;

      // Add elegant dark-themed map tiles from CartoDB (perfect for premium dark styling!)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap &copy; CARTO',
        subdomains: 'abcd',
        maxZoom: 20,
      }).addTo(map);

      // Add Zoom control at bottom right
      L.control.zoom({ position: 'bottomright' }).addTo(map);

      // Custom pulsing gold/red divIcon for the marker
      const customIcon = L.divIcon({
        html: `
          <div class="relative w-8 h-8 flex items-center justify-center">
            <div class="absolute w-8 h-8 bg-red-600/30 rounded-full animate-ping"></div>
            <div class="absolute w-5 h-5 bg-red-600 rounded-full border-2 border-white shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div>
            <div class="absolute w-2.5 h-2.5 bg-yellow-500 rounded-full"></div>
          </div>
        `,
        className: 'custom-leaflet-marker',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      // Add Draggable Marker
      const marker = L.marker([lat, lon], {
        draggable: true,
        icon: customIcon,
      }).addTo(map);
      markerInstance.current = marker;

      // Listen to marker dragend event
      marker.on('dragend', async (event) => {
        const targetMarker = event.target as L.Marker;
        const position = targetMarker.getLatLng();
        setLat(Number(position.lat.toFixed(6)));
        setLon(Number(position.lng.toFixed(6)));
        setIsManuallyPlaced(true);
      });
    } catch (error) {
      console.error('Failed to initialize Leaflet Map:', error);
    }

    // Clean up map instance on unmount
    return () => {
      try {
        if (map) {
          map.remove();
        }
      } catch (error) {
        console.error('Error removing Leaflet map:', error);
      }
      mapInstance.current = null;
      markerInstance.current = null;
    };
  }, []);

  // Update map and marker when lat/lon changes
  useEffect(() => {
    if (mapInstance.current && markerInstance.current) {
      const currentCenter = mapInstance.current.getCenter();
      const newPos = L.latLng(lat, lon);
      
      // Update marker position
      markerInstance.current.setLatLng(newPos);
      
      // Pan to position if it is far from center
      if (currentCenter.distanceTo(newPos) > 100) {
        mapInstance.current.panTo(newPos);
      }
    }
  }, [lat, lon]);

  // Reverse Geocoding via OSM Nominatim API
  const reverseGeocode = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
        {
          headers: {
            'Accept-Language': currentLang,
            'User-Agent': 'MobileBandenServiceApplet/1.0',
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        if (data && data.display_name) {
          setAddress(data.display_name);
        } else {
          setAddress(`${latitude}, ${longitude}`);
        }
      } else {
        setAddress(`${latitude}, ${longitude}`);
      }
    } catch (e) {
      setAddress(`${latitude}, ${longitude}`);
    }
  };

  // Trigger geocode when lat/lon is updated
  useEffect(() => {
    const timer = setTimeout(() => {
      reverseGeocode(lat, lon);
    }, 800); // Debounce API calls

    return () => clearTimeout(timer);
  }, [lat, lon]);

  // Handle Detect Location and then open Send Modal
  const handleSendCoordinatesClick = () => {
    // If user has already manually dragged or set the position, we do NOT overwrite it!
    // We just open the channel selection modal directly.
    if (isManuallyPlaced) {
      setShowChannelModal(true);
      return;
    }

    if (!navigator.geolocation) {
      // Fallback: browser does not support geolocation
      setShowChannelModal(true);
      return;
    }

    setIsDetecting(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = Number(position.coords.latitude.toFixed(6));
        const longitude = Number(position.coords.longitude.toFixed(6));
        setLat(latitude);
        setLon(longitude);
        setIsDetecting(false);
        
        if (mapInstance.current) {
          mapInstance.current.setView([latitude, longitude], 16);
        }

        // Fetch address for newly detected coordinates
        await reverseGeocode(latitude, longitude);
        setShowChannelModal(true);
      },
      (error) => {
        console.warn('Could not auto-detect location:', error);
        setIsDetecting(false);
        
        const msg = currentLang === 'nl' 
          ? 'We konden uw locatie niet automatisch bepalen. Selecteer uw locatie handmatig op de kaart.' 
          : currentLang === 'en' 
            ? 'We could not automatically detect your location. Please select it manually on the map.' 
            : 'Не удалось автоматически определить геолокацию. Выберите местоположение вручную на карте.';
        setLocationError(msg);
        setTimeout(() => setLocationError(null), 8000);

        // Fallback: If user denies or it times out, still open the modal with current coordinates!
        setShowChannelModal(true);
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
    );
  };

  // Action: Find user's location and reset marker/map to it
  const handleLocateUser = () => {
    if (!navigator.geolocation) {
      const msg = currentLang === 'nl' 
        ? 'Geolocatie wordt niet ondersteund door uw browser.' 
        : currentLang === 'en' 
          ? 'Geolocation is not supported by your browser.' 
          : 'Геолокация не поддерживается вашим браузером.';
      setLocationError(msg);
      setTimeout(() => setLocationError(null), 8000);
      return;
    }

    setIsDetecting(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = Number(position.coords.latitude.toFixed(6));
        const longitude = Number(position.coords.longitude.toFixed(6));
        setLat(latitude);
        setLon(longitude);
        setIsDetecting(false);
        setIsManuallyPlaced(false);
        
        if (mapInstance.current) {
          mapInstance.current.setView([latitude, longitude], 16);
        }

        // Fetch address for newly detected coordinates
        await reverseGeocode(latitude, longitude);
      },
      (error) => {
        console.warn('Could not auto-detect location:', error);
        setIsDetecting(false);
        
        const msg = currentLang === 'nl' 
          ? 'We konden uw locatie niet automatisch bepalen. Selecteer uw locatie handmatig op de kaart.' 
          : currentLang === 'en' 
            ? 'We could not automatically detect your location. Please select it manually on the map.' 
            : 'Не удалось автоматически определить геолокацию. Выберите местоположение вручную на карте.';
        setLocationError(msg);
        setTimeout(() => setLocationError(null), 8000);
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
    );
  };

  // Compile full text message body for mobile transmission
  const compileMessageText = (channel: 'whatsapp' | 'telegram' | 'email' | 'copy'): { body: string; subject?: string } => {
    const googleMapUrl = `https://www.google.com/maps?q=${lat},${lon}`;
    
    let messageText = '';
    
    if (channel === 'whatsapp') {
      messageText = `${t.location.whatsappMsg}\n\n` +
        `📍 *GPS:* ${lat}, ${lon}\n` +
        `🗺️ *Google Maps:* ${googleMapUrl}\n` +
        `🏠 *Adres:* ${address || 'Onbekend'}\n` +
        `💬 *Opmerking:* ${comment || 'Geen'}`;
    } else if (channel === 'telegram') {
      messageText = `${t.location.telegramMsg}\n\n` +
        `📍 **GPS:** ${lat}, ${lon}\n` +
        `🗺️ **Google Maps:** ${googleMapUrl}\n` +
        `🏠 **Adres:** ${address || 'Onbekend'}\n` +
        `💬 **Opmerking:** ${comment || 'Нет'}`;
    } else {
      // Email or Copy plaintext format
      messageText = `${t.location.emailBody}\n\n` +
        `- GPS Coordinates: ${lat}, ${lon}\n` +
        `- Google Maps: ${googleMapUrl}\n` +
        `- Address: ${address || 'Unknown'}\n` +
        `- Comment/Details: ${comment || 'None'}`;
    }

    return { body: messageText, subject: t.location.emailSubject };
  };

  // Action: Launch Transmission to Master
  const handleSendToMaster = (channel: 'whatsapp' | 'telegram' | 'email' | 'copy') => {
    const masterPhone = '32479409929';
    const { body, subject } = compileMessageText(channel);
    const encodedBody = encodeURIComponent(body);

    if (channel === 'whatsapp') {
      window.open(`https://api.whatsapp.com/send?phone=${masterPhone}&text=${encodedBody}`, '_blank');
    } else if (channel === 'telegram') {
      // In Telegram web, sharing text via deep link goes to tg://msg or web.telegram share
      window.open(`https://t.me/share/url?url=${encodeURIComponent(googleMapsUrl())}&text=${encodedBody}`, '_blank');
    } else if (channel === 'email') {
      const encodedSubject = encodeURIComponent(subject || '');
      window.location.href = `mailto:krapa2915@gmail.com?subject=${encodedSubject}&body=${encodedBody}`;
    } else {
      // Copy to Clipboard
      navigator.clipboard.writeText(body);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000);
    }
    setShowChannelModal(false);
  };

  const googleMapsUrl = () => `https://www.google.com/maps?q=${lat},${lon}`;

  return (
    <section
      id="location-block"
      className="pt-12 md:pt-16 pb-24 bg-neutral-950 text-white border-t border-neutral-900 relative overflow-hidden"
    >
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-red-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-sans font-extrabold tracking-widest text-[#d4af37] uppercase bg-[#d4af37]/10 px-3 py-1 rounded-full border border-[#d4af37]/20">
            {currentLang === 'nl' ? 'SPOEDHULP' : currentLang === 'en' ? 'EMERGENCY SERVICE' : 'ЭКСТРЕННАЯ СВЯЗЬ'}
          </span>
          <h2 className="mt-4 font-sans font-black text-3xl sm:text-5xl tracking-tight text-white uppercase">
            {t.location.title}
          </h2>
          <div className="h-[2px] w-16 bg-gradient-to-r from-red-600 to-[#d4af37] mx-auto mt-6 rounded-full" />
          <p className="mt-6 font-sans text-base sm:text-lg text-neutral-400 leading-relaxed">
            {t.location.subtitle}
          </p>
        </div>

        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12" id="location-selector-grid">
          
          {/* Left Column (8 cols): Interactive Map */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="relative rounded-2xl overflow-hidden border border-[#d4af37] bg-neutral-900 shadow-[0_15px_40px_rgba(0,0,0,0.5)]">
              {/* Map Canvas */}
              <div ref={mapRef} className="w-full h-[380px] md:h-[480px] z-10" id="osm-map-canvas" />

              {/* Custom Error Notification Overlay */}
              <AnimatePresence>
                {locationError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-4 left-4 right-16 z-30 bg-red-950/95 border border-red-500/50 p-3 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.6)] flex items-start gap-2.5 text-xs text-red-200 backdrop-blur-sm"
                  >
                    <ShieldAlert className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <div className="flex-1 leading-tight pr-2">
                      {locationError}
                    </div>
                    <button
                      type="button"
                      onClick={() => setLocationError(null)}
                      className="text-red-400 hover:text-white font-bold cursor-pointer text-sm"
                    >
                      ×
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Reset / Locate Me Button */}
              <button
                type="button"
                onClick={handleLocateUser}
                disabled={isDetecting}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-xl bg-black/85 hover:bg-black border border-neutral-800 text-white hover:text-[#d4af37] disabled:opacity-50 transition-all cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.5)] flex items-center justify-center group"
                title={currentLang === 'nl' ? 'Mijn locatie' : currentLang === 'en' ? 'My location' : 'Мое местоположение'}
              >
                <Locate className={`w-5 h-5 ${isDetecting ? 'animate-spin text-[#d4af37]' : 'group-hover:scale-110 transition-transform'}`} />
              </button>

              {/* Info Banner - positioned bottom-left and limited width to avoid bottom-right zoom controls */}
              <div className="absolute bottom-4 left-4 z-20 max-w-[calc(100%-6rem)] bg-black/85 backdrop-blur-md p-2 rounded-lg border border-neutral-800/80 text-[10px] md:text-xs text-neutral-300 font-medium flex items-center gap-1.5 pointer-events-none shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                <ShieldAlert className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                <span className="leading-tight">{t.location.manualInfo}</span>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Geolocation Data & Comment */}
          <div className="lg:col-span-5 flex flex-col gap-6" id="location-form-panel">
            {/* Address Field */}
            <div className="flex flex-col">
              <label htmlFor="location-address" className="font-sans text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-red-500" />
                {t.location.address}
              </label>
              <textarea
                id="location-address"
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder={t.location.addressPlaceholder}
                className="w-full bg-neutral-900 border border-neutral-800 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] rounded-xl py-3 px-4 text-sm font-sans font-medium text-white placeholder-neutral-500 focus:outline-none resize-none transition-colors"
              />
            </div>

            {/* Comment Field */}
            <div className="flex flex-col">
              <label htmlFor="location-comment" className="font-sans text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2.5">
                {t.location.comment}
              </label>
              <textarea
                id="location-comment"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={t.location.commentPlaceholder}
                className="w-full bg-neutral-900 border border-neutral-800 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] rounded-xl py-3 px-4 text-sm font-sans font-medium text-white placeholder-neutral-500 focus:outline-none resize-none transition-colors"
              />
            </div>

            {/* Latitude and Longitude Display (Premium readout) */}
            <div className="grid grid-cols-2 gap-2 sm:gap-4">
              <div className="bg-neutral-900/60 p-3 sm:p-4 rounded-xl border border-neutral-800/80 min-w-0 overflow-hidden">
                <span className="block font-sans text-[9px] sm:text-xs uppercase tracking-wider text-neutral-500 font-bold truncate" title={t.location.latitude}>{t.location.latitude}</span>
                <span className="block font-mono text-xs sm:text-sm md:text-base font-bold text-white mt-1 break-all">{lat}</span>
              </div>
              <div className="bg-neutral-900/60 p-3 sm:p-4 rounded-xl border border-neutral-800/80 min-w-0 overflow-hidden">
                <span className="block font-sans text-[9px] sm:text-xs uppercase tracking-wider text-neutral-500 font-bold truncate" title={t.location.longitude}>{t.location.longitude}</span>
                <span className="block font-mono text-xs sm:text-sm md:text-base font-bold text-white mt-1 break-all">{lon}</span>
              </div>
            </div>

            {/* SEND COORDINATES BUTTON */}
            <button
              onClick={handleSendCoordinatesClick}
              disabled={isDetecting}
              className="w-full mt-2 flex flex-wrap items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-red-600 to-red-800 text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider py-3.5 sm:py-4 px-4 rounded-xl border border-red-500 shadow-[0_12px_24px_rgba(239,68,68,0.25)] hover:shadow-[0_12px_30px_rgba(239,68,68,0.45)] hover:scale-102 hover:from-red-500 hover:to-red-700 active:scale-98 transition-all duration-300 disabled:opacity-60 cursor-pointer text-center"
              id="send-coordinates-btn"
            >
              <Navigation className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${isDetecting ? 'animate-spin text-[#d4af37]' : 'animate-pulse'}`} />
              <span className="break-words max-w-[calc(100%-2rem)]">
                {isDetecting ? t.location.btnDetecting : t.location.btnSend}
              </span>
            </button>
          </div>

        </div>
      </div>

      {/* Modal: Select Communication Channel */}
      <AnimatePresence>
        {showChannelModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4" id="channel-modal-container">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowChannelModal(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-[0_30px_70px_rgba(0,0,0,0.8)] z-10"
              id="channel-modal"
            >
              <h3 className="font-sans font-black text-xl text-white uppercase tracking-tight text-center">
                {t.location.chooseChannel}
              </h3>
              <div className="h-[2px] w-12 bg-[#d4af37] mx-auto mt-4 rounded-full" />

              {/* Channels Grid */}
              <div className="flex flex-col gap-4 mt-8">
                {/* WhatsApp button */}
                <button
                  onClick={() => handleSendToMaster('whatsapp')}
                  className="flex items-center gap-4 bg-neutral-950 hover:bg-[#25D366]/10 border border-neutral-800 hover:border-[#25D366]/40 py-3.5 px-6 rounded-xl text-left text-sm font-sans font-extrabold text-white transition-all cursor-pointer"
                >
                  <div className="p-2 bg-[#25D366]/10 text-[#25D366] rounded-lg">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <span>WhatsApp</span>
                </button>

                {/* Telegram button */}
                <button
                  onClick={() => handleSendToMaster('telegram')}
                  className="flex items-center gap-4 bg-neutral-950 hover:bg-[#0088cc]/10 border border-neutral-800 hover:border-[#0088cc]/40 py-3.5 px-6 rounded-xl text-left text-sm font-sans font-extrabold text-white transition-all cursor-pointer"
                >
                  <div className="p-2 bg-[#0088cc]/10 text-[#0088cc] rounded-lg">
                    <Send className="w-5 h-5" />
                  </div>
                  <span>Telegram</span>
                </button>

                {/* Email button */}
                <button
                  onClick={() => handleSendToMaster('email')}
                  className="flex items-center gap-4 bg-neutral-950 hover:bg-red-500/10 border border-neutral-800 hover:border-red-500/40 py-3.5 px-6 rounded-xl text-left text-sm font-sans font-extrabold text-white transition-all cursor-pointer"
                >
                  <div className="p-2 bg-red-500/10 text-red-500 rounded-lg">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span>E-mail</span>
                </button>

                {/* Copy link button */}
                <button
                  onClick={() => handleSendToMaster('copy')}
                  className="flex items-center justify-between bg-neutral-950 hover:bg-[#d4af37]/10 border border-neutral-800 hover:border-[#d4af37]/40 py-3.5 px-6 rounded-xl text-left text-sm font-sans font-extrabold text-white transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-[#d4af37]/10 text-[#d4af37] rounded-lg">
                      {isCopied ? <Check className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5" />}
                    </div>
                    <span>{isCopied ? t.location.copied : t.location.copyLink}</span>
                  </div>
                  {isCopied && <span className="text-2xs text-emerald-500 uppercase tracking-widest font-extrabold">Copied</span>}
                </button>
              </div>

              {/* Close button */}
              <button
                onClick={() => setShowChannelModal(false)}
                className="w-full mt-6 text-center text-xs font-sans font-bold text-neutral-500 hover:text-white uppercase tracking-wider py-2 transition-colors cursor-pointer"
              >
                {currentLang === 'nl' ? 'Annuleren' : currentLang === 'en' ? 'Cancel' : 'Отмена'}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
