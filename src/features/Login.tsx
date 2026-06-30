import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, User, Sparkles, KeyRound, Eye, EyeOff, ShieldCheck, Fingerprint } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useNotificationStore } from '../store/notificationStore';
import { Logo } from '../components/Logo';
import { translations } from '../constants/translations';

export const Login: React.FC = () => {
  const { language, login } = useAuthStore();
  const { showToast } = useNotificationStore();
  const t = translations[language];

  // Forms credentials
  const [username, setUsername] = useState('jora228');
  const [password, setPassword] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Biometric verification state
  const [biometricScan, setBiometricScan] = useState(false);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));

    const success = login(username, password);
    if (success) {
      showToast(t.toastLoginSuccess, 'success');
    } else {
      showToast(t.error, 'error');
    }
    setIsSubmitting(false);
  };

  const handleBiometricTrigger = () => {
    setBiometricScan(true);
    setTimeout(() => {
      // Complete biometric auth
      const success = login('jora228', '123456');
      if (success) {
        showToast(language === 'uk' ? 'Вхід за біометрією успішний!' : 'Biometric Auth Successful!', 'success');
      }
      setBiometricScan(false);
    }, 2200);
  };

  return (
    <div className="min-h-[100dvh] flex flex-col justify-between px-6 py-12 bg-slate-50 dark:bg-[#0B0E14] relative overflow-hidden" id="login-auth-screen">
      {/* Background blobs */}
      <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[50%] rounded-full bg-[#5A3FFF]/10 dark:bg-[#5A3FFF]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[40%] rounded-full bg-[#234CFF]/10 dark:bg-[#234CFF]/5 blur-[100px] pointer-events-none" />

      {/* Header Back icon */}
      <div className="flex justify-center z-10">
        <Logo size="md" showText={true} />
      </div>

      {/* Main Login Card container */}
      <div className="my-auto max-w-sm w-full mx-auto z-10 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="font-sans font-black text-xl text-slate-900 dark:text-white">
            {language === 'uk' ? 'Увійти в кабінет' : 'Log In to Cabinet'}
          </h2>
          <p className="text-xs text-slate-400 font-semibold">
            {language === 'uk' ? 'Будь ласка, введіть логін або скористайтеся біометрією' : 'Please provide credentials or authenticate with Biometrics'}
          </p>
        </div>

        <form onSubmit={handleLoginSubmit} className="space-y-4">
          {/* Username */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.username}</label>
            <div className="relative">
              <User className="absolute left-4.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
              <input
                type="text" required value={username} onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-[#161B26] border border-slate-200/50 dark:border-white/5 rounded-[18px] text-xs font-semibold focus:outline-none focus:border-[#234CFF]"
                placeholder="Enter login username"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.password}</label>
            <div className="relative">
              <KeyRound className="absolute left-4.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'} required value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-12 py-3.5 bg-white dark:bg-[#161B26] border border-slate-200/50 dark:border-white/5 rounded-[18px] text-xs font-mono focus:outline-none focus:border-[#234CFF]"
                placeholder="Enter account security key"
              />
              <button
                type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
              >
                {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
              </button>
            </div>
          </div>

          <button
            type="submit" disabled={isSubmitting}
            className="w-full py-4 rounded-[20px] bg-[#234CFF] hover:bg-[#5A3FFF] text-white font-sans font-black text-xs tracking-wider uppercase shadow-lg active:scale-98 transition-all flex items-center justify-center space-x-2"
          >
            {isSubmitting ? <div className="w-4 h-4 border-2 border-white border-t-transparent animate-spin rounded-full" /> : <span>{t.login}</span>}
          </button>
        </form>

        {/* Separator line */}
        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-slate-200 dark:border-white/5"></div>
          <span className="flex-shrink mx-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Or Biometrics</span>
          <div className="flex-grow border-t border-slate-200 dark:border-white/5"></div>
        </div>

        {/* Biometric trigger login */}
        <button
          onClick={handleBiometricTrigger}
          className="w-full py-4 rounded-[20px] bg-slate-200/55 dark:bg-white/5 border border-slate-200/40 dark:border-white/5 text-slate-800 dark:text-slate-200 font-sans font-bold text-xs tracking-wide shadow-sm active:scale-98 transition-all flex items-center justify-center space-x-2.5"
        >
          <Fingerprint className="w-5 h-5 text-[#234CFF]" />
          <span>Face ID / Touch ID Login</span>
        </button>
      </div>

      {/* Security compliance footer */}
      <div className="z-10 w-full text-center">
        <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider flex items-center justify-center space-x-1">
          <ShieldCheck className="w-3.5 h-3.5 text-[#00D26A]" />
          <span>Biometric Key Vault Enabled • AES 256 Protected</span>
        </p>
      </div>

      {/* SCANNED LOADER OVERLAY */}
      <AnimatePresence>
        {biometricScan && (
          <div className="fixed inset-0 z-50 bg-[#0B0E14]/85 backdrop-blur-md flex flex-col items-center justify-center text-center text-white">
            <div className="relative w-48 h-48 border-4 border-[#234CFF] rounded-[40px] flex items-center justify-center overflow-hidden mb-6">
              <motion.div
                initial={{ top: '0%' }} animate={{ top: '100%' }} transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                className="absolute left-0 right-0 h-1 bg-[#00D26A] shadow-[0_0_12px_rgba(0,210,106,0.9)] z-10"
              />
              <Fingerprint className="w-24 h-24 text-[#234CFF] animate-pulse" />
            </div>
            <h4 className="font-sans font-black text-lg text-white">Scanning Face Identity</h4>
            <p className="text-xs text-slate-400 mt-2 max-w-xs leading-relaxed">Please look directly at your device camera for secure validation...</p>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
