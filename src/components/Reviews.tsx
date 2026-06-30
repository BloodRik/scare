import React from 'react';
import { Language, translations } from '../types';
import { Star, ShieldAlert, BadgeCheck, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';

interface ReviewsProps {
  currentLang: Language;
}

export default function Reviews({ currentLang }: ReviewsProps) {
  const t = translations[currentLang];

  const reviewsList = [
    {
      id: 1,
      name: 'Jean-Marc L.',
      car: 'Tesla Model S Plaid',
      city: currentLang === 'nl' ? 'Brussel' : currentLang === 'en' ? 'Brussels' : 'Брюссель',
      date: currentLang === 'nl' ? '2 weken geleden' : currentLang === 'en' ? '2 weeks ago' : '2 недели назад',
      text: currentLang === 'nl'
        ? 'Prachtige service! Midden in de nacht had ik een lekke band op de snelweg bij Brussel. Binnen 40 minuten was de monteur ter plaatse en verving hij mijn achterband vakkundig. Heel voorzichtig met de Tesla krikpunten!'
        : currentLang === 'en'
        ? 'Excellent service! Got a flat tire in the middle of the night on the highway near Brussels. The mechanic arrived within 40 minutes and replaced the rear tire perfectly. Very careful with the Tesla lifting pads!'
        : 'Превосходный сервис! Посреди ночи пробил колесо на трассе под Брюсселем. Мастер приехал в течение 40 минут и профессионально заменил шину. Очень бережно отнесся к местам под домкрат на моей Тесле!',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150'
    },
    {
      id: 2,
      name: 'Annelies de V.',
      car: 'BMW X5 M-Sport',
      city: currentLang === 'nl' ? 'Antwerpen' : currentLang === 'en' ? 'Antwerp' : 'Антверпен',
      date: currentLang === 'nl' ? '1 maand geleden' : currentLang === 'en' ? '1 month ago' : '1 месяц назад',
      text: currentLang === 'nl'
        ? 'Zeer professioneel. Ze kwamen naar mijn kantoor in Antwerpen om mijn zomerbanden te wisselen voor winterbanden. Terwijl ik aan het werk was, deden zij de wissel en computerbalancering op de parking. Absoluut aan te bevelen!'
        : currentLang === 'en'
        ? 'Very professional. They came to my office in Antwerp to switch my summer tires to winter tires. While I was working, they did the change and computer balancing in the parking lot. Highly recommended!'
        : 'Очень профессионально. Приехали к моему офису в Антверпене для сезонной замены резины на зимнюю. Пока я работала, они провели замену и балансировку прямо на парковке. Очень рекомендую!',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150'
    },
    {
      id: 3,
      name: 'Dmitry K.',
      car: 'Audi RS6 Avant',
      city: currentLang === 'nl' ? 'Gent' : currentLang === 'en' ? 'Ghent' : 'Гент',
      date: currentLang === 'nl' ? '3 dagen geleden' : currentLang === 'en' ? '3 days ago' : '3 дня назад',
      text: currentLang === 'nl'
        ? 'Geweldige mobiele bandenservice! Een schroef in mijn band op de E17. Snel geholpen via WhatsApp, stuurde de locatie door via de website en na 30 minuten was de herstelling klaar. Eerlijke prijs en top materiaal!'
        : currentLang === 'en'
        ? 'Amazing mobile tire service! Had a nail in my tire on the E17. Got help quickly via WhatsApp, shared my location via the website, and after 30 minutes the repair was finished. Fair price and great tools!'
        : 'Потрясающий шиномонтаж! Поймал саморез на трассе E17. Быстро ответили в WhatsApp, скинул локацию через сайт, и через 30 минут прокол был устранен. Честная цена и современное оборудование!',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150'
    }
  ];

  return (
    <section
      id="reviews"
      className="pt-12 md:pt-16 pb-24 bg-neutral-950 text-white border-t border-neutral-900/80 relative overflow-hidden"
    >
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-18">
          <span className="text-xs font-sans font-extrabold tracking-widest text-red-600 uppercase bg-red-950/20 px-3 py-1 rounded-full border border-red-900/40">
            {currentLang === 'nl' ? 'KLANDIZIE' : currentLang === 'en' ? 'CLIENTS' : 'ОТЗЫВЫ'}
          </span>
          <h2 className="mt-4 font-sans font-black text-3xl sm:text-5xl tracking-tight text-white uppercase">
            {t.reviews.title}
          </h2>
          <div className="h-[2px] w-16 bg-gradient-to-r from-red-600 to-[#d4af37] mx-auto mt-6 rounded-full" />
          <p className="mt-6 font-sans text-base sm:text-lg text-neutral-400 leading-relaxed">
            {t.reviews.subtitle}
          </p>
        </div>

        {/* Reviews Cards List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" id="reviews-grid">
          {reviewsList.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: review.id * 0.12 }}
              className="flex flex-col justify-between p-8 rounded-2xl border border-neutral-800/80 bg-neutral-900/35 backdrop-blur-md shadow-[0_15px_35px_rgba(0,0,0,0.4)] hover:border-neutral-700/60 transition-colors"
              id={`review-card-${review.id}`}
            >
              <div>
                {/* Header info */}
                <div className="flex items-center justify-between mb-6">
                  {/* Stars */}
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4.5 h-4.5 fill-[#d4af37] text-[#d4af37]" />
                    ))}
                  </div>

                  {/* Google Reviews Style Verified Badge */}
                  <div className="flex items-center gap-1.5 text-2xs text-[#d4af37] font-semibold bg-[#d4af37]/10 px-2.5 py-1 rounded-full border border-[#d4af37]/20 uppercase tracking-wider">
                    <BadgeCheck className="w-3.5 h-3.5 text-[#d4af37]" />
                    {currentLang === 'nl' ? 'Geverifieerd' : currentLang === 'en' ? 'Verified' : 'Проверено'}
                  </div>
                </div>

                {/* Review Text */}
                <p className="font-sans text-sm text-neutral-300 leading-relaxed italic">
                  "{review.text}"
                </p>
              </div>

              {/* Reviewer Details */}
              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-neutral-800/60">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover border border-neutral-700 p-0.5"
                  referrerPolicy="no-referrer"
                />
                <div className="flex flex-col">
                  <span className="font-sans font-extrabold text-sm text-white">{review.name}</span>
                  <span className="font-sans text-2xs text-[#d4af37] font-semibold mt-0.5">
                    {review.car}
                  </span>
                  <span className="font-sans text-[10px] text-neutral-500 mt-1 uppercase font-semibold tracking-wider">
                    {review.city}, BE • {review.date}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
