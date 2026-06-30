import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, Flame, Smartphone, Globe, Landmark, Scale, QrCode, ArrowRight, Zap, Info 
} from 'lucide-react';
import { useWalletStore } from '../store/walletStore';
import { useAuthStore } from '../store/authStore';
import { useNotificationStore } from '../store/notificationStore';
import { translations } from '../constants/translations';

export const Payments: React.FC = () => {
  const { language } = useAuthStore();
  const { accounts, payService } = useWalletStore();
  const { showToast } = useNotificationStore();
  const t = translations[language];

  const [searchQuery, setSearchQuery] = useState('');
  const [activePaymentForm, setActivePaymentForm] = useState<null | string>(null);
  
  // Payment Form State
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [isPaying, setIsPaying] = useState(false);

  // QR Scanning Simulator
  const [showQRScanner, setShowQRScanner] = useState(false);

  const popularPayments = [
    { id: 'kyivstar', name: 'Kyivstar Mobile', category: t.mobile, icon: <Smartphone className="w-5 h-5 text-blue-500" /> },
    { id: 'yasno', name: 'YASNO Kyiv Energy', category: t.utilities, icon: <Flame className="w-5 h-5 text-amber-500" /> },
    { id: 'volia', name: 'Volia Cable Internet', category: t.internet, icon: <Globe className="w-5 h-5 text-purple-500" /> },
    { id: 'tax', name: 'ФОП Єдиний Податок', category: t.taxes, icon: <Landmark className="w-5 h-5 text-emerald-500" /> }
  ];

  const filteredPayments = popularPayments.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) return;

    // Default debit account: UAH account
    const uahAcc = accounts.find(a => a.currency === 'UAH');
    if (!uahAcc || uahAcc.balance < amt) {
      showToast(t.toastTransferFailed, 'error');
      return;
    }

    setIsPaying(true);
    const serviceName = activePaymentForm === 'kyivstar' ? 'Kyivstar' : 'YASNO Energy';
    const categoryName = activePaymentForm === 'kyivstar' ? t.mobile : t.utilities;
    const identifier = activePaymentForm === 'kyivstar' ? phoneNumber : accountNumber;

    const success = await payService({
      serviceName,
      category: categoryName,
      amount: amt,
      currency: 'UAH',
      accountNumber: identifier
    });

    if (success) {
      showToast(`${t.toastPaymentSuccess} (${amt} ₴)`, 'success');
      setPhoneNumber('');
      setAmount('');
      setAccountNumber('');
      setActivePaymentForm(null);
    } else {
      showToast(t.error, 'error');
    }
    setIsPaying(false);
  };

  const handleScanQRDemo = () => {
    setShowQRScanner(true);
    // Auto pay in 2 seconds
    setTimeout(async () => {
      const success = await payService({
        serviceName: 'QR Pay: McDonald\'s',
        category: 'Ресторани',
        amount: 320.00,
        currency: 'UAH',
        accountNumber: 'QR-9912A81'
      });
      if (success) {
        showToast(`${t.toastPaymentSuccess} (320.00 ₴)`, 'success');
      }
      setShowQRScanner(false);
    }, 2500);
  };

  return (
    <div className="space-y-6 pb-24" id="payments-view-container">
      {/* Searchbar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
        <input
          type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-3.5 bg-white dark:bg-[#161B26] border border-slate-200/50 dark:border-white/5 rounded-[20px] text-sm text-slate-900 dark:text-white focus:outline-none shadow-sm"
          placeholder={`${t.search} utilities...`}
        />
      </div>

      {/* Payment categories rows */}
      <div className="grid grid-cols-5 gap-2" id="payment-categories-menu">
        {[
          { id: 'utilities', label: t.utilities, icon: <Flame className="w-5 h-5 text-amber-500" /> },
          { id: 'mobile', label: t.mobile, icon: <Smartphone className="w-5 h-5 text-blue-500" /> },
          { id: 'internet', label: t.internet, icon: <Globe className="w-5 h-5 text-purple-500" /> },
          { id: 'fines', label: t.fines, icon: <Scale className="w-5 h-5 text-red-500" /> },
          { id: 'taxes', label: t.taxes, icon: <Landmark className="w-5 h-5 text-emerald-500" /> }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => {
              if (item.id === 'mobile') setActivePaymentForm('kyivstar');
              else if (item.id === 'utilities') setActivePaymentForm('yasno');
              else showToast(language === 'uk' ? 'Функція у розробці для MVP.' : 'This category is coming soon.', 'info');
            }}
            className="flex flex-col items-center p-3 rounded-[20px] bg-white dark:bg-[#161B26] border border-slate-200/40 dark:border-white/5 text-center active:scale-95 transition-all"
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-50 dark:bg-[#1E2533] border border-slate-100 dark:border-white/5 mb-2 shrink-0">
              {item.icon}
            </div>
            <span className="font-sans font-semibold text-[10px] leading-tight text-slate-600 dark:text-slate-300 truncate w-full">
              {item.label}
            </span>
          </button>
        ))}
      </div>

      {/* QR Code Action bar */}
      <div 
        onClick={handleScanQRDemo}
        className="p-5 rounded-[24px] bg-gradient-to-tr from-[#161B26] to-[#1E2533] text-white border border-white/5 flex items-center justify-between cursor-pointer shadow-lg active:scale-99 transition-all"
        id="payments-qr-trigger"
      >
        <div className="flex items-center space-x-4">
          <div className="w-11 h-11 rounded-full bg-[#234CFF]/25 flex items-center justify-center border border-white/10 shrink-0">
            <QrCode className="w-5 h-5 text-[#234CFF]" />
          </div>
          <div>
            <h4 className="font-sans font-bold text-sm text-white">Scan Bill QR</h4>
            <p className="text-[11px] text-slate-400 font-medium">Clear payments instantly by holding camera over QR invoices</p>
          </div>
        </div>
        <ArrowRight className="w-4 h-4 text-slate-400" />
      </div>

      {/* Filtered popular list */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold tracking-widest text-slate-400 uppercase">{t.popularPayments}</h4>
        <div className="space-y-2">
          {filteredPayments.map((p) => (
            <div
              key={p.id} onClick={() => setActivePaymentForm(p.id)}
              className="p-4 rounded-[20px] bg-white dark:bg-[#161B26] border border-slate-200/40 dark:border-white/5 flex items-center justify-between cursor-pointer hover:border-[#234CFF] transition-all"
            >
              <div className="flex items-center space-x-3.5">
                <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-[#1E2533] flex items-center justify-center border shrink-0">
                  {p.icon}
                </div>
                <div>
                  <h4 className="font-sans font-bold text-sm text-slate-800 dark:text-slate-100">{p.name}</h4>
                  <p className="text-xs text-slate-400 capitalize">{p.category}</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300" />
            </div>
          ))}
        </div>
      </div>

      {/* MODAL: UTILITY FORM SHEET */}
      <AnimatePresence>
        {activePaymentForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActivePaymentForm(null)} className="absolute inset-0 bg-[#0B0E14]/60 backdrop-blur-sm" />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-sm rounded-[24px] bg-white dark:bg-[#161B26] p-6 border border-slate-200 dark:border-white/10 shadow-2xl z-10"
            >
              <h3 className="font-sans font-bold text-lg text-slate-900 dark:text-white mb-4">
                {activePaymentForm === 'kyivstar' ? 'Kyivstar Top Up' : 'Yasno Utility Payment'}
              </h3>
              
              <form onSubmit={handlePaymentSubmit} className="space-y-4">
                {activePaymentForm === 'kyivstar' ? (
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{t.phoneNumber}</label>
                    <input
                      type="tel" required value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-[#11141D] border border-slate-200 dark:border-white/5 rounded-[16px] text-sm text-slate-900 dark:text-white"
                      placeholder="e.g. +380971234567"
                    />
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Account Number</label>
                    <input
                      type="text" required value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-[#11141D] border border-slate-200 dark:border-white/5 rounded-[16px] text-sm text-slate-900 dark:text-white font-mono"
                      placeholder="e.g. ACC-19028-UAA"
                    />
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{t.amountUah} (UAH)</label>
                  <input
                    type="number" required min="10" step="any" value={amount} onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-[#11141D] border border-slate-200 dark:border-white/5 rounded-[16px] text-sm text-slate-900 dark:text-white font-bold"
                    placeholder="e.g. 150"
                  />
                </div>

                <div className="flex space-x-3 pt-2">
                  <button type="button" onClick={() => setActivePaymentForm(null)} className="flex-1 py-3 text-xs font-bold rounded-[16px] border border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 transition-all">{t.cancel}</button>
                  <button type="submit" disabled={isPaying} className="flex-1 py-3 text-xs font-bold rounded-[16px] bg-[#234CFF] text-white hover:bg-[#5A3FFF] disabled:opacity-50 transition-all flex justify-center items-center">
                    {isPaying ? <div className="w-4 h-4 border-2 border-white border-t-transparent animate-spin rounded-full" /> : <span>{t.confirm}</span>}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* QR SCANNING LOADER OVERLAY */}
      <AnimatePresence>
        {showQRScanner && (
          <div className="fixed inset-0 z-50 bg-[#0B0E14] flex flex-col items-center justify-center p-6 text-white text-center">
            <div className="relative w-64 h-64 border-2 border-[#234CFF] rounded-3xl overflow-hidden mb-6 flex items-center justify-center">
              {/* Scan Line Animation */}
              <motion.div
                initial={{ top: '0%' }} animate={{ top: '100%' }} transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                className="absolute left-0 right-0 h-0.5 bg-[#00D26A] shadow-[0_0_8px_rgba(0,210,106,0.8)] z-10"
              />
              <Zap className="w-12 h-12 text-[#234CFF] animate-pulse" />
            </div>
            <h4 className="font-sans font-black text-lg text-white">Positioning Invoice QR</h4>
            <p className="text-xs text-slate-400 mt-2 max-w-xs">Hold stable. System is scanning the digital bills cryptographic signature...</p>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
