import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { Logo } from '../components/Logo';
import { translations } from '../constants/translations';

interface WelcomeProps {
  onStart: () => void;
}

export const Welcome: React.FC<WelcomeProps> = ({ onStart }) => {
  const { language } = useAuthStore();
  const t = translations[language];

  return (
    <div className="min-h-[100dvh] flex flex-col justify-between px-6 py-12 relative overflow-hidden bg-slate-50 dark:bg-[#0B0E14]" id="welcome-onboarding-screen">
      {/* Visual background ambient blobs */}
      <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[50%] rounded-full bg-[#234CFF]/10 dark:bg-[#234CFF]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[40%] rounded-full bg-[#5A3FFF]/10 dark:bg-[#5A3FFF]/5 blur-[100px] pointer-events-none" />

      {/* Language Header picker */}
      <div className="flex justify-between items-center z-10">
        <Logo size="sm" showText={false} />
        <div className="flex items-center space-x-1 bg-slate-200/50 dark:bg-white/5 p-1 rounded-full border border-slate-200/40 dark:border-white/5 shadow-sm">
          {(['uk', 'en'] as const).map((lang) => {
            const isSelected = language === lang;
            return (
              <button
                key={lang}
                onClick={() => useAuthStore.getState().setLanguage(lang)}
                className={`px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded-full transition-all ${isSelected ? 'bg-[#234CFF] text-white shadow-sm' : 'text-slate-500'}`}
              >
                {lang}
              </button>
            );
          })}
        </div>
      </div>

      {/* Slogan and Brand Center focus */}
      <div className="flex flex-col items-center text-center space-y-8 z-10 my-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-2"
        >
          <Logo size="xl" showText={true} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.8, ease: 'easeOut' }}
          className="space-y-3.5 max-w-sm"
        >
          <p className="text-slate-500 dark:text-slate-400 text-xs font-bold tracking-widest uppercase flex items-center justify-center space-x-1.5">
            <Sparkles className="w-4 h-4 text-[#FFC400]" />
            <span>{t.welcome} SCARB</span>
          </p>
          <h2 className="font-sans font-black text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight leading-tight">
            {t.sloganSub}
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed font-semibold">
            {language === 'uk' 
              ? 'Персональний банк нового покоління. Мультивалютні рахунки, миттєві перекази, крипто та інвестиції в одному місці.' 
              : 'Next-generation digital banking. Multi-currency fiat accounts, zero-fee crypto trades, and custom investments in one fluid workspace.'}
          </p>
        </motion.div>
      </div>

      {/* Button footer actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.8, ease: 'easeOut' }}
        className="flex flex-col items-center space-y-4 z-10 w-full max-w-sm mx-auto"
      >
        <button
          onClick={onStart}
          className="w-full py-4.5 rounded-[22px] bg-slate-950 hover:bg-slate-900 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 font-sans font-black text-sm tracking-wide shadow-xl active:scale-98 transition-all flex items-center justify-center space-x-2 cursor-pointer group"
        >
          <span>{t.start}</span>
          <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Security compliance watermark */}
        <p className="text-[10px] text-slate-400 font-bold flex items-center space-x-1 tracking-wider uppercase">
          <ShieldCheck className="w-3.5 h-3.5 text-[#00D26A]" />
          <span>PCI-DSS Secured • National Bank Verified</span>
        </p>
      </motion.div>
    </div>
  );
};
