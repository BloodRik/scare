import React from 'react';
import { motion } from 'motion/react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true, className = '' }) => {
  const sizeClasses = {
    sm: { icon: 'w-8 h-8', text: 'text-xl', spacing: 'space-x-2' },
    md: { icon: 'w-12 h-12', text: 'text-2xl', spacing: 'space-x-3' },
    lg: { icon: 'w-18 h-18', text: 'text-4xl', spacing: 'space-x-4' },
    xl: { icon: 'w-28 h-28', text: 'text-5xl', spacing: 'space-y-4 flex-col justify-center' }
  };

  const selectedSize = sizeClasses[size];

  return (
    <div className={`flex items-center ${selectedSize.spacing} ${className}`} id="scarb-logo-container">
      {/* Icon portion mimicking the logo */}
      <motion.div
        className={`${selectedSize.icon} relative flex items-center justify-center shrink-0 rounded-2xl bg-gradient-to-tr from-[#001D4A] to-[#0A1A2F] shadow-lg border border-white/10`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        id="scarb-logo-icon"
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-4/5 h-4/5"
        >
          {/* Top Loop: Cyan & Blue */}
          <path
            d="M75 35 C75 22, 60 18, 50 18 C32 18, 25 28, 25 40 C25 50, 32 55, 45 55 L55 55 C68 55, 75 60, 75 70 C75 75, 70 82, 50 82"
            stroke="url(#blueCyanGradient)"
            strokeWidth="14"
            strokeLinecap="round"
            fill="none"
          />
          {/* Bottom Fold: Vibrant Yellow */}
          <path
            d="M25 65 C25 78, 40 82, 50 82 C68 82, 75 72, 75 60 C75 50, 68 45, 55 45 L45 45"
            stroke="url(#yellowGradient)"
            strokeWidth="14"
            strokeLinecap="round"
            fill="none"
          />
          <defs>
            <linearGradient id="blueCyanGradient" x1="25" y1="18" x2="75" y2="55" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#00D2FF" />
              <stop offset="100%" stopColor="#234CFF" />
            </linearGradient>
            <linearGradient id="yellowGradient" x1="25" y1="82" x2="75" y2="45" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFE500" />
              <stop offset="100%" stopColor="#FF9900" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {showText && (
        <motion.span
          className={`font-sans font-bold tracking-tight text-slate-900 dark:text-white ${selectedSize.text}`}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          id="scarb-logo-text"
        >
          Scarb
        </motion.span>
      )}
    </div>
  );
};
