import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lock, Unlock, Sliders, ShieldCheck, KeyRound, AlertTriangle, Eye, CreditCard as CardIcon 
} from 'lucide-react';
import { useWalletStore } from '../store/walletStore';
import { useAuthStore } from '../store/authStore';
import { useNotificationStore } from '../store/notificationStore';
import { translations } from '../constants/translations';
import { VisaCardWidget } from '../components/VisaCardWidget';

export const Cards: React.FC = () => {
  const { language } = useAuthStore();
  const { cards, freezeCard, unfreezeCard, updateCardLimit, updateCardPin } = useWalletStore();
  const { showToast } = useNotificationStore();
  const t = translations[language];

  const [activeCardId, setActiveCardId] = useState(cards[0]?.id || '');
  const [newPin, setNewPin] = useState('');
  const [newLimit, setNewLimit] = useState('');
  
  // Toggle sections
  const [showPinForm, setShowPinForm] = useState(false);
  const [showLimitForm, setShowLimitForm] = useState(false);

  const selectedCard = cards.find(c => c.id === activeCardId) || cards[0];

  const handleFreezeToggle = () => {
    if (!selectedCard) return;
    const isFrozen = selectedCard.status === 'frozen';
    if (isFrozen) {
      unfreezeCard(selectedCard.id);
      showToast(t.toastCardUnfrozen, 'success');
    } else {
      freezeCard(selectedCard.id);
      showToast(t.toastCardFrozen, 'info');
    }
  };

  const handleLimitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const limitNum = parseFloat(newLimit);
    if (isNaN(limitNum) || limitNum < 0) return;

    updateCardLimit(selectedCard.id, limitNum);
    showToast(t.toastLimitUpdated, 'success');
    setNewLimit('');
    setShowLimitForm(false);
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.length !== 4 || isNaN(parseInt(newPin))) {
      showToast('PIN code must be exactly 4 digits.', 'error');
      return;
    }

    updateCardPin(selectedCard.id, newPin);
    showToast(t.toastPinUpdated, 'success');
    setNewPin('');
    setShowPinForm(false);
  };

  if (!selectedCard) {
    return (
      <div className="text-center py-20 bg-white dark:bg-[#161B26] rounded-[24px] border" id="cards-empty-wrapper">
        <CardIcon className="w-12 h-12 text-slate-300 mx-auto mb-3 animate-pulse" />
        <h3 className="font-sans font-bold text-slate-700 dark:text-slate-200">No cards active</h3>
        <p className="text-xs text-slate-400 mt-1">Open a virtual card under the Wallet tab.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-24" id="cards-view-container">
      {/* Cards Scroll Selection list */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold tracking-widest text-slate-400 uppercase">My Credit Cards</h4>
        <div className="flex space-x-3.5 overflow-x-auto pb-4 pt-1 max-w-full" id="cards-carousel">
          {cards.map((c) => (
            <div 
              key={c.id} 
              onClick={() => setActiveCardId(c.id)}
              className={`shrink-0 w-[290px] cursor-pointer transition-all ${activeCardId === c.id ? 'scale-100 ring-2 ring-[#234CFF] rounded-[26px] p-0.5' : 'scale-95 opacity-60 hover:opacity-90'}`}
            >
              <VisaCardWidget card={c} showDetailsToggle={false} />
            </div>
          ))}
        </div>
      </div>

      {/* Selected Card Settings panel */}
      <div className="rounded-[24px] bg-white dark:bg-[#161B26] border border-slate-200/40 dark:border-white/5 p-6 shadow-sm space-y-5">
        <h3 className="font-sans font-bold text-base text-slate-900 dark:text-white flex items-center space-x-2">
          <Sliders className="w-5 h-5 text-[#234CFF]" />
          <span>{t.cardSettings}</span>
        </h3>

        {/* Action button rows */}
        <div className="space-y-3.5">
          {/* Freeze toggle row */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-[#11141D] border border-slate-100 dark:border-white/5">
            <div className="flex items-center space-x-3">
              {selectedCard.status === 'frozen' ? <Lock className="w-5 h-5 text-[#FF4D4F]" /> : <Unlock className="w-5 h-5 text-[#00D26A]" />}
              <div>
                <h4 className="font-sans font-bold text-sm text-slate-800 dark:text-slate-200">
                  {selectedCard.status === 'frozen' ? 'Card is Blocked' : 'Card is Active'}
                </h4>
                <p className="text-[11px] text-slate-400 font-semibold">Freeze card instantly for security reasons.</p>
              </div>
            </div>
            <button
              onClick={handleFreezeToggle}
              className={`px-4.5 py-2 rounded-full text-xs font-bold tracking-wider transition-all ${selectedCard.status === 'frozen' ? 'bg-[#00D26A] text-white hover:opacity-90' : 'bg-[#FF4D4F]/10 text-[#FF4D4F] hover:bg-[#FF4D4F] hover:text-white'}`}
            >
              {selectedCard.status === 'frozen' ? t.unfreeze : t.freeze}
            </button>
          </div>

          {/* Spend Limits row */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#11141D] border border-slate-100 dark:border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Sliders className="w-5 h-5 text-[#234CFF]" />
                <div>
                  <h4 className="font-sans font-bold text-sm text-slate-800 dark:text-slate-200">{t.limits}</h4>
                  <p className="text-[11px] text-slate-400 font-semibold">Daily maximum expenditure threshold</p>
                </div>
              </div>
              <span className="font-mono font-bold text-sm text-[#234CFF]">
                {selectedCard.limit.toLocaleString()} {selectedCard.currency}
              </span>
            </div>

            {showLimitForm ? (
              <form onSubmit={handleLimitSubmit} className="flex space-x-2 pt-2 border-t border-slate-200/40 dark:border-white/5">
                <input
                  type="number" required value={newLimit} onChange={(e) => setNewLimit(e.target.value)}
                  className="flex-1 px-3 py-2 bg-white dark:bg-[#1E2533] border border-slate-200 dark:border-white/10 rounded-lg text-xs"
                  placeholder="Enter limit value"
                />
                <button type="submit" className="px-4 py-2 bg-[#234CFF] text-white text-xs font-bold rounded-lg">{t.save}</button>
                <button type="button" onClick={() => setShowLimitForm(false)} className="px-4 py-2 bg-slate-200 dark:bg-white/10 text-xs font-bold rounded-lg">{t.cancel}</button>
              </form>
            ) : (
              <button 
                onClick={() => { setNewLimit(selectedCard.limit.toString()); setShowLimitForm(true); }}
                className="text-xs text-[#234CFF] font-bold hover:underline"
              >
                Change Daily Spending Limit
              </button>
            )}
          </div>

          {/* Change PIN row */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#11141D] border border-slate-100 dark:border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <KeyRound className="w-5 h-5 text-[#FFC400]" />
                <div>
                  <h4 className="font-sans font-bold text-sm text-slate-800 dark:text-slate-200">{t.changePin}</h4>
                  <p className="text-[11px] text-slate-400 font-semibold">Modify terminal transaction authorization code</p>
                </div>
              </div>
              <span className="font-mono font-bold text-xs text-slate-400">••••</span>
            </div>

            {showPinForm ? (
              <form onSubmit={handlePinSubmit} className="flex space-x-2 pt-2 border-t border-slate-200/40 dark:border-white/5">
                <input
                  type="password" required maxLength={4} minLength={4} value={newPin} onChange={(e) => setNewPin(e.target.value)}
                  className="flex-1 px-3 py-2 bg-white dark:bg-[#1E2533] border border-slate-200 dark:border-white/10 rounded-lg text-xs font-mono"
                  placeholder="4 digits code"
                />
                <button type="submit" className="px-4 py-2 bg-[#234CFF] text-white text-xs font-bold rounded-lg">{t.save}</button>
                <button type="button" onClick={() => setShowPinForm(false)} className="px-4 py-2 bg-slate-200 dark:bg-white/10 text-xs font-bold rounded-lg">{t.cancel}</button>
              </form>
            ) : (
              <button 
                onClick={() => setShowPinForm(true)}
                className="text-xs text-[#234CFF] font-bold hover:underline"
              >
                Modify Card PIN Code
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
