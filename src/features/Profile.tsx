import React from 'react';
import { motion } from 'motion/react';
import { 
  User as UserIcon, Globe, DollarSign, Briefcase, LogOut, CheckCircle2, ShieldCheck, Moon, Sun, ArrowRight 
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';
import { useNotificationStore } from '../store/notificationStore';
import { translations } from '../constants/translations';
import { AppLanguage, AppCurrency } from '../types';

export const Profile: React.FC = () => {
  const { user, language, currency, setLanguage, setCurrency, toggleFop, logout } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const { showToast } = useNotificationStore();
  const t = translations[language];

  const handleLanguageChange = (lang: AppLanguage) => {
    setLanguage(lang);
    showToast(lang === 'uk' ? 'Мову змінено!' : 'Language updated!', 'success');
  };

  const handleCurrencyChange = (curr: AppCurrency) => {
    setCurrency(curr);
    showToast(language === 'uk' ? `Валюту змінено на ${curr}` : `Currency updated to ${curr}`, 'success');
  };

  const handleFopToggle = () => {
    toggleFop();
    const isNowFop = !user?.isFop;
    showToast(
      language === 'uk' 
        ? (isNowFop ? 'ФОП кабінет активовано!' : 'ФОП кабінет деактивовано!') 
        : (isNowFop ? 'Business cabinet activated!' : 'Business cabinet deactivated!'),
      'info'
    );
  };

  return (
    <div className="space-y-6 pb-24" id="profile-view-container">
      {/* Profile Header Block */}
      <div className="p-6 rounded-[24px] bg-white dark:bg-[#161B26] border border-slate-200/40 dark:border-white/5 shadow-sm text-center flex flex-col items-center">
        <div className="relative">
          <img 
            src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"} 
            alt="User Avatar" 
            className="w-20 h-20 rounded-full object-cover border-2 border-[#234CFF] shadow-md"
          />
          <div className="absolute -bottom-1 -right-1 bg-[#00D26A] text-white p-1 rounded-full border border-white dark:border-[#161B26]" title="Verified Profile">
            <CheckCircle2 className="w-3.5 h-3.5" />
          </div>
        </div>

        <h3 className="font-sans font-black text-base text-slate-900 dark:text-white mt-4">{user?.name}</h3>
        <p className="text-xs text-slate-400 font-semibold mt-1">@{user?.username || 'jora228'}</p>

        {/* Level Indicator badge */}
        <span className="mt-3 px-3 py-1 bg-[#234CFF]/10 text-[#234CFF] text-[10px] font-bold rounded-full tracking-wider uppercase flex items-center space-x-1">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Gold Level Security</span>
        </span>
      </div>

      {/* Profile settings lists */}
      <div className="rounded-[24px] bg-white dark:bg-[#161B26] border border-slate-200/40 dark:border-white/5 p-5 shadow-sm space-y-4">
        <h4 className="text-xs font-bold tracking-widest text-slate-400 uppercase px-1">{t.settings}</h4>

        <div className="space-y-3">
          {/* Theme Row */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-[#11141D] border border-slate-100 dark:border-white/5">
            <div className="flex items-center space-x-3 text-slate-800 dark:text-slate-200">
              {theme === 'dark' ? <Moon className="w-4.5 h-4.5 text-[#FFC400]" /> : <Sun className="w-4.5 h-4.5 text-amber-500" />}
              <span className="text-xs font-bold">{language === 'uk' ? 'Темна тема' : 'Dark Theme'}</span>
            </div>
            <button
              onClick={toggleTheme}
              className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 focus:outline-none ${theme === 'dark' ? 'bg-[#234CFF]' : 'bg-slate-300'}`}
            >
              <div className={`w-5 h-5 bg-white rounded-full shadow-md transform duration-200 ${theme === 'dark' ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>

          {/* Language Selector row */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-[#11141D] border border-slate-100 dark:border-white/5">
            <div className="flex items-center space-x-3 text-slate-800 dark:text-slate-200">
              <Globe className="w-4.5 h-4.5 text-[#234CFF]" />
              <span className="text-xs font-bold">{t.language}</span>
            </div>
            <div className="flex space-x-1">
              {(['uk', 'en'] as AppLanguage[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`px-3 py-1 text-[10px] font-bold rounded-lg uppercase tracking-wider transition-all ${language === lang ? 'bg-[#234CFF] text-white' : 'bg-slate-200 dark:bg-white/10 text-slate-500 hover:text-slate-700'}`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* Base Currency row */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-[#11141D] border border-slate-100 dark:border-white/5">
            <div className="flex items-center space-x-3 text-slate-800 dark:text-slate-200">
              <DollarSign className="w-4.5 h-4.5 text-[#00D26A]" />
              <span className="text-xs font-bold">{t.currencyPref}</span>
            </div>
            <div className="flex space-x-1">
              {(['UAH', 'USD', 'EUR'] as AppCurrency[]).map((currCode) => (
                <button
                  key={currCode}
                  onClick={() => handleCurrencyChange(currCode)}
                  className={`px-3 py-1 text-[10px] font-bold rounded-lg uppercase tracking-wider transition-all ${currency === currCode ? 'bg-[#234CFF] text-white' : 'bg-slate-200 dark:bg-white/10 text-slate-500 hover:text-slate-700'}`}
                >
                  {currCode}
                </button>
              ))}
            </div>
          </div>

          {/* FOP / Business toggle row */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-[#11141D] border border-slate-100 dark:border-white/5">
            <div className="flex items-center space-x-3 text-slate-800 dark:text-slate-200">
              <Briefcase className="w-4.5 h-4.5 text-[#5A3FFF]" />
              <div className="text-left">
                <span className="text-xs font-bold block">{t.openBusiness}</span>
                <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">Toggle Business cabinet menu</span>
              </div>
            </div>
            <button
              onClick={handleFopToggle}
              className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 focus:outline-none ${user?.isFop ? 'bg-[#234CFF]' : 'bg-slate-300'}`}
            >
              <div className={`w-5 h-5 bg-white rounded-full shadow-md transform duration-200 ${user?.isFop ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Log out Row */}
      <button
        onClick={logout}
        className="w-full py-4 rounded-[22px] bg-[#FF4D4F]/10 hover:bg-[#FF4D4F] hover:text-white text-[#FF4D4F] font-sans font-bold text-xs shadow-sm transition-all flex items-center justify-center space-x-2 active:scale-98"
      >
        <LogOut className="w-4.5 h-4.5" />
        <span>{t.logout}</span>
      </button>
    </div>
  );
};
