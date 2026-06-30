import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, ArrowRight, ShieldCheck, CheckCircle, Info } from 'lucide-react';
import { useWalletStore } from '../store/walletStore';
import { useAuthStore } from '../store/authStore';
import { useNotificationStore } from '../store/notificationStore';
import { translations } from '../constants/translations';
import { CurrencyType } from '../types';

export const InternationalTransfer: React.FC = () => {
  const { language } = useAuthStore();
  const { cards, transferInternational } = useWalletStore();
  const { showToast } = useNotificationStore();
  const t = translations[language];

  // Form States
  const [country, setCountry] = useState('Poland');
  const [recipient, setRecipient] = useState('');
  const [iban, setIban] = useState('');
  const [swift, setSwift] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState<CurrencyType>('EUR');
  const [selectedCardId, setSelectedCardId] = useState(cards[0]?.id || '');
  const [isSending, setIsSending] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const selectedCard = cards.find(c => c.id === selectedCardId) || cards[0];

  // Country dictionary
  const countries = [
    { name: 'Poland', code: 'PL', flag: '🇵🇱', currency: 'EUR' },
    { name: 'Germany', code: 'DE', flag: '🇩🇪', currency: 'EUR' },
    { name: 'United Kingdom', code: 'GB', flag: '🇬🇧', currency: 'EUR' },
    { name: 'United States', code: 'US', flag: '🇺🇸', currency: 'USD' }
  ];

  const handleCountryChange = (cName: string) => {
    setCountry(cName);
    const found = countries.find(item => item.name === cName);
    if (found) {
      setCurrency(found.currency as CurrencyType);
      // Pre-fill mock IBAN structure
      setIban(`${found.code}89 3700 0004 0000 1234 5678 9012`);
      setSwift(`${found.code}PLKPPXXX`);
    }
  };

  const handleTransferSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) return;

    if (!selectedCard || selectedCard.balance < amt) {
      showToast(t.toastTransferFailed, 'error');
      return;
    }

    setIsSending(true);
    const fee = 69.00; // flat fee

    const success = await transferInternational({
      country,
      recipientName: recipient,
      iban,
      swift,
      amount: amt,
      currency: selectedCard.currency, // debit matching currency
      fee
    });

    if (success) {
      showToast(t.toastTransferSuccess, 'success');
      setRecipient('');
      setAmount('');
      setShowConfirm(false);
    } else {
      showToast(t.toastTransferFailed, 'error');
    }
    setIsSending(false);
  };

  return (
    <div className="space-y-6 pb-24" id="international-view-container">
      <div className="rounded-[24px] bg-white dark:bg-[#161B26] border border-slate-200/40 dark:border-white/5 p-6 shadow-sm">
        <h3 className="font-sans font-bold text-lg text-slate-900 dark:text-white mb-5 flex items-center space-x-2">
          <Globe className="w-5 h-5 text-[#234CFF]" />
          <span>{t.intlTransfer}</span>
        </h3>

        <form onSubmit={(e) => { e.preventDefault(); setShowConfirm(true); }} className="space-y-4">
          {/* Card Selector */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Debit Card</label>
            <select
              value={selectedCardId}
              onChange={(e) => setSelectedCardId(e.target.value)}
              className="w-full px-3 py-3 bg-slate-50 dark:bg-[#11141D] border border-slate-200 dark:border-white/5 rounded-[16px] text-sm text-slate-900 dark:text-white focus:outline-none"
            >
              {cards.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.type.toUpperCase()} ({c.number.slice(-4)}) - {c.balance.toLocaleString()} {c.currency}
                </option>
              ))}
            </select>
          </div>

          {/* Country Selection */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{t.country}</label>
            <div className="grid grid-cols-2 gap-2">
              {countries.map((c) => (
                <button
                  key={c.name} type="button" onClick={() => handleCountryChange(c.name)}
                  className={`py-3 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-between ${country === c.name ? 'bg-slate-50 dark:bg-white/10 text-[#234CFF] border-[#234CFF]' : 'border-slate-200 dark:border-white/5 text-slate-500'}`}
                >
                  <span className="truncate">{c.name}</span>
                  <span className="text-sm shrink-0 ml-1.5">{c.flag}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Recipient */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{t.recipientName}</label>
            <input
              type="text" required value={recipient} onChange={(e) => setRecipient(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-[#11141D] border border-slate-200 dark:border-white/5 rounded-[16px] text-sm text-slate-900 dark:text-white focus:outline-none"
              placeholder="e.g. John Doe"
            />
          </div>

          {/* IBAN & SWIFT */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{t.iban}</label>
              <input
                type="text" required value={iban} onChange={(e) => setIban(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-[#11141D] border border-slate-200 dark:border-white/5 rounded-[16px] text-xs text-slate-900 dark:text-white focus:outline-none font-mono"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{t.swift}</label>
              <input
                type="text" required value={swift} onChange={(e) => setSwift(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-[#11141D] border border-slate-200 dark:border-white/5 rounded-[16px] text-xs text-slate-900 dark:text-white focus:outline-none font-mono"
              />
            </div>
          </div>

          {/* Amount */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{t.amountUah}</label>
            <div className="relative">
              <input
                type="number" required min="1" step="any" value={amount} onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-4 pr-12 py-3 bg-slate-50 dark:bg-[#11141D] border border-slate-200 dark:border-white/5 rounded-[16px] text-sm text-slate-900 dark:text-white focus:outline-none font-bold"
                placeholder="0.00"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 font-sans font-bold text-slate-400">
                {selectedCard?.currency || 'UAH'}
              </span>
            </div>
          </div>

          {/* Notice & delivery estimates */}
          <div className="p-3.5 rounded-xl bg-blue-500/5 border border-blue-500/10 text-xs text-slate-400 flex items-start space-x-2 leading-relaxed">
            <Info className="w-4 h-4 text-[#234CFF] shrink-0 mt-0.5" />
            <span>{t.swiftNotice} {t.deliveryTime}: <strong className="text-slate-600 dark:text-slate-300">1-3 Days</strong></span>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-[18px] bg-[#234CFF] hover:bg-[#5A3FFF] text-white font-sans font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2 active:scale-98"
          >
            <span>{t.continue}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* CONFIRM MODAL */}
      <AnimatePresence>
        {showConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowConfirm(false)} className="absolute inset-0 bg-[#0B0E14]/60 backdrop-blur-sm" />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-sm rounded-[24px] bg-white dark:bg-[#161B26] p-6 border border-slate-200 dark:border-white/10 shadow-2xl z-10 space-y-5"
            >
              <h3 className="font-sans font-black text-base text-slate-900 dark:text-white flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-[#00D26A]" />
                <span>Confirm Transfer</span>
              </h3>

              <div className="space-y-2.5 p-4 rounded-xl bg-slate-50 dark:bg-[#11141D] border text-xs text-slate-600 dark:text-slate-300">
                <div className="flex justify-between">
                  <span>To Country:</span>
                  <span className="font-bold">{country}</span>
                </div>
                <div className="flex justify-between">
                  <span>Recipient:</span>
                  <span className="font-bold text-slate-800 dark:text-white">{recipient}</span>
                </div>
                <div className="flex justify-between">
                  <span>IBAN:</span>
                  <span className="font-mono">{iban.slice(0, 10)}...</span>
                </div>
                <div className="flex justify-between">
                  <span>Amount to Send:</span>
                  <span className="font-bold text-slate-800 dark:text-white">{amount} {selectedCard?.currency}</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 dark:border-white/5 pt-2">
                  <span>SWIFT Fee:</span>
                  <span>69.00 UAH</span>
                </div>
              </div>

              <div className="flex space-x-3 pt-1">
                <button
                  type="button" onClick={() => setShowConfirm(false)}
                  className="flex-1 py-3 text-xs font-bold rounded-xl border border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 transition-all"
                >
                  {t.cancel}
                </button>
                <button
                  onClick={handleTransferSubmit} disabled={isSending}
                  className="flex-1 py-3 text-xs font-bold rounded-xl bg-[#234CFF] text-white hover:bg-[#5A3FFF] disabled:opacity-50 transition-all flex justify-center items-center"
                >
                  {isSending ? <div className="w-4 h-4 border-2 border-white border-t-transparent animate-spin rounded-full" /> : <span>{t.confirm}</span>}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
