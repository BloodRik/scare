import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, EyeOff, ShieldAlert, Wifi } from 'lucide-react';
import { CreditCard } from '../types';

interface VisaCardWidgetProps {
  card: CreditCard;
  onFreezeToggle?: () => void;
  showDetailsToggle?: boolean;
}

export const VisaCardWidget: React.FC<VisaCardWidgetProps> = ({
  card,
  onFreezeToggle,
  showDetailsToggle = true
}) => {
  const [showFullNumber, setShowFullNumber] = useState(false);
  const isFrozen = card.status === 'frozen';

  // Get color styles based on the theme
  const getThemeStyles = () => {
    switch (card.colorTheme) {
      case 'gradient':
        return 'bg-gradient-to-tr from-[#5A3FFF] via-[#234CFF] to-[#00D26A] text-white';
      case 'blue':
        return 'bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-[#1E3A8A] text-white border border-blue-500/20';
      case 'black':
      default:
        return 'bg-gradient-to-br from-[#1A1F2C] via-[#0E1118] to-[#161B22] text-white border border-white/5';
    }
  };

  return (
    <div className="relative select-none" id={`visa-card-widget-${card.id}`}>
      <motion.div
        whileHover={{ scale: isFrozen ? 1 : 1.02, rotateY: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={`
          relative w-full h-[210px] rounded-[24px] p-6 flex flex-col justify-between overflow-hidden shadow-2xl
          ${getThemeStyles()}
          ${isFrozen ? 'opacity-70 grayscale-[30%]' : ''}
        `}
      >
        {/* Abstract background mesh for premium look */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.06),transparent_60%)] pointer-events-none" />
        <div className="absolute -right-16 -bottom-16 w-48 h-48 rounded-full bg-white/2 blur-[80px] pointer-events-none" />

        {/* Top bar: Brand + Type */}
        <div className="flex justify-between items-start z-10">
          <div className="flex flex-col">
            <span className="font-sans font-bold tracking-widest text-lg uppercase">SCARB</span>
            {card.isVirtual && (
              <span className="text-[10px] font-semibold tracking-wider bg-white/10 text-white/90 px-1.5 py-0.5 rounded-md uppercase w-fit mt-1">
                Virtual
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Wifi className="w-5 h-5 text-white/70 rotate-90" />
          </div>
        </div>

        {/* Mid section: Chip & Contactless */}
        <div className="flex justify-between items-center z-10 mt-2">
          {/* Real Gold SIM card style chip */}
          <div className="w-11 h-8 rounded-lg bg-gradient-to-r from-[#FFE500] via-[#FFC400] to-[#E2A600] border border-[#D97706]/30 shadow-inner relative flex items-center justify-center overflow-hidden">
            <div className="absolute inset-y-0 left-1/3 w-[1px] bg-[#92400E]/20" />
            <div className="absolute inset-y-0 right-1/3 w-[1px] bg-[#92400E]/20" />
            <div className="absolute inset-x-0 top-1/2 h-[1px] bg-[#92400E]/20" />
          </div>
          
          {/* Currency text */}
          <span className="text-xl font-bold tracking-tight">{card.currency}</span>
        </div>

        {/* Card Number */}
        <div className="z-10 mt-3 flex items-center justify-between">
          <span className="font-mono text-lg tracking-widest text-slate-100">
            {showFullNumber 
              ? card.number.replace(/••••/g, '4242') // simulate showing the card number
              : card.number
            }
          </span>
          {showDetailsToggle && !isFrozen && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowFullNumber(!showFullNumber);
              }}
              className="p-1 hover:bg-white/10 rounded-full transition-colors"
              title="Show card number"
            >
              {showFullNumber ? <EyeOff className="w-4 h-4 text-white/80" /> : <Eye className="w-4 h-4 text-white/80" />}
            </button>
          )}
        </div>

        {/* Expiry & Cardholder */}
        <div className="flex justify-between items-end z-10">
          <div>
            <p className="text-[9px] uppercase tracking-wider text-slate-400">Cardholder</p>
            <p className="font-sans font-medium text-xs tracking-wider uppercase text-slate-100">{card.cardholderName}</p>
          </div>
          <div className="flex space-x-4">
            <div>
              <p className="text-[9px] uppercase tracking-wider text-slate-400">Expiry</p>
              <p className="font-sans font-medium text-xs text-slate-100">{card.expiry}</p>
            </div>
            {showFullNumber && (
              <div>
                <p className="text-[9px] uppercase tracking-wider text-slate-400">CVV</p>
                <p className="font-sans font-bold text-xs text-[#FFC400]">{card.cvv}</p>
              </div>
            )}
            <div className="flex flex-col justify-end items-end h-8">
              {card.type === 'visa' ? (
                <span className="font-sans font-black italic text-lg tracking-tight text-white select-none">VISA</span>
              ) : (
                <div className="flex space-x-[-10px]">
                  <div className="w-5 h-5 rounded-full bg-[#EB001B] opacity-90" />
                  <div className="w-5 h-5 rounded-full bg-[#F79E1B] opacity-90" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Frozen Overlay */}
        <AnimatePresence>
          {isFrozen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#0B0E14]/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center space-y-2"
            >
              <ShieldAlert className="w-10 h-10 text-[#FF4D4F]" />
              <span className="text-sm font-semibold tracking-wider text-slate-200 uppercase">
                Card Frozen
              </span>
              {onFreezeToggle && (
                <button
                  onClick={onFreezeToggle}
                  className="px-4 py-1.5 rounded-full text-xs font-bold bg-[#234CFF] text-white hover:bg-[#5A3FFF] active:scale-95 transition-all mt-1"
                >
                  Unfreeze
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
