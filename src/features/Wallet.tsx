import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, CreditCard as CardIcon, Grid, DollarSign, Wallet2, Check, Sparkles, Filter } from 'lucide-react';
import { useWalletStore } from '../store/walletStore';
import { useAuthStore } from '../store/authStore';
import { useNotificationStore } from '../store/notificationStore';
import { translations } from '../constants/translations';
import { VisaCardWidget } from '../components/VisaCardWidget';
import { TransactionItem } from '../components/TransactionItem';
import { CurrencyType } from '../types';

export const Wallet: React.FC = () => {
  const { language } = useAuthStore();
  const { accounts, cards, transactions, addAccount, addVirtualCard } = useWalletStore();
  const { showToast } = useNotificationStore();
  const t = translations[language];

  const [activeSegment, setActiveSegment] = useState<'accounts' | 'cards'>('accounts');
  const [filterCurrency, setFilterCurrency] = useState<CurrencyType | 'ALL'>('ALL');
  
  // Modals state
  const [showAddAcc, setShowAddAcc] = useState(false);
  const [showAddCard, setShowAddCard] = useState(false);
  
  // Form state
  const [newAccCurr, setNewAccCurr] = useState<CurrencyType>('USD');
  const [newCardType, setNewCardType] = useState<'visa' | 'mastercard'>('visa');
  const [newCardTheme, setNewCardTheme] = useState<'black' | 'blue' | 'gradient'>('blue');
  const [newCardCurrency, setNewCardCurrency] = useState<CurrencyType>('UAH');

  // Filter transactions
  const filteredTxs = transactions.filter(tx => 
    filterCurrency === 'ALL' || tx.currency === filterCurrency
  );

  const handleAddAccountSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (accounts.some(a => a.currency === newAccCurr)) {
      showToast(language === 'uk' ? 'Цей рахунок вже відкрито!' : 'This account is already open!', 'error');
      return;
    }

    addAccount(newAccCurr, `${newAccCurr} Account`);
    showToast(`${t.toastAccountAdded} ${newAccCurr}`, 'success');
    setShowAddAcc(false);
  };

  const handleAddCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addVirtualCard(newCardType, newCardCurrency, newCardTheme);
    showToast(t.toastVirtualCardAdded, 'success');
    setShowAddCard(false);
  };

  return (
    <div className="space-y-6 pb-24" id="wallet-view-container">
      {/* Tab Switcher Segment */}
      <div className="flex bg-slate-100 dark:bg-[#161B26] p-1 rounded-2xl border border-slate-200/40 dark:border-white/5" id="wallet-segments">
        <button
          onClick={() => setActiveSegment('accounts')}
          className={`flex-1 py-3 text-xs font-bold rounded-xl transition-all ${activeSegment === 'accounts' ? 'bg-white dark:bg-[#1E2533] text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'}`}
        >
          {t.accounts}
        </button>
        <button
          onClick={() => setActiveSegment('cards')}
          className={`flex-1 py-3 text-xs font-bold rounded-xl transition-all ${activeSegment === 'cards' ? 'bg-white dark:bg-[#1E2533] text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'}`}
        >
          {t.allCards}
        </button>
      </div>

      {/* Segment Contents */}
      <AnimatePresence mode="wait">
        {activeSegment === 'accounts' ? (
          /* ACCOUNTS TAB */
          <motion.div
            key="accounts-list"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {/* Quick Actions */}
            <div className="flex space-x-3">
              <button
                onClick={() => setShowAddAcc(true)}
                className="flex-1 py-3.5 px-4 rounded-[20px] bg-white dark:bg-[#161B26] border border-slate-200/40 dark:border-white/5 text-slate-800 dark:text-slate-200 hover:border-[#234CFF] text-xs font-bold flex items-center justify-center space-x-2 transition-all active:scale-98"
              >
                <Plus className="w-4 h-4 text-[#234CFF]" />
                <span>{t.addAccount}</span>
              </button>
              <button
                onClick={() => setShowAddCard(true)}
                className="flex-1 py-3.5 px-4 rounded-[20px] bg-white dark:bg-[#161B26] border border-slate-200/40 dark:border-white/5 text-slate-800 dark:text-slate-200 hover:border-[#5A3FFF] text-xs font-bold flex items-center justify-center space-x-2 transition-all active:scale-98"
              >
                <CardIcon className="w-4 h-4 text-[#5A3FFF]" />
                <span>{t.openVirtualCard}</span>
              </button>
            </div>

            {/* List of accounts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {accounts.map((acc, index) => (
                <motion.div
                  key={acc.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-5 rounded-[22px] bg-white dark:bg-[#161B26] border border-slate-200/40 dark:border-white/5 flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3.5">
                    <div className="w-11 h-11 rounded-full flex items-center justify-center bg-slate-50 dark:bg-[#1E2533] text-lg font-bold border border-slate-100 dark:border-white/5 select-none shadow-sm">
                      <span className={`${acc.type === 'crypto' ? 'text-[#00D26A]' : 'text-[#234CFF]'}`}>
                        {acc.symbol}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-sm text-slate-800 dark:text-slate-100">{acc.currency}</h4>
                      <p className="text-[11px] font-semibold text-slate-400 capitalize">{acc.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <h3 className="font-sans font-black text-sm text-slate-900 dark:text-white">
                      {acc.balance.toLocaleString(language === 'uk' ? 'uk-UA' : 'en-US', {
                        minimumFractionDigits: acc.type === 'crypto' ? 4 : 2,
                        maximumFractionDigits: acc.type === 'crypto' ? 6 : 2
                      })}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          /* CARDS TAB */
          <motion.div
            key="cards-list"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {/* Create virtual card promo */}
            <div className="flex justify-between items-center px-1">
              <h4 className="text-xs font-bold tracking-widest text-slate-400 uppercase">{t.allCards}</h4>
              <button 
                onClick={() => setShowAddCard(true)}
                className="text-xs font-bold text-[#5A3FFF] hover:underline flex items-center space-x-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{t.openVirtualCard}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cards.map((card) => (
                <VisaCardWidget 
                  key={card.id} 
                  card={card} 
                  onFreezeToggle={() => {
                    const isFrozen = card.status === 'frozen';
                    if (isFrozen) {
                      useWalletStore.getState().unfreezeCard(card.id);
                      showToast(t.toastCardUnfrozen, 'success');
                    } else {
                      useWalletStore.getState().freezeCard(card.id);
                      showToast(t.toastCardFrozen, 'info');
                    }
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TRANSACTIONS SECTION IN WALLET */}
      <div className="space-y-4 pt-4" id="wallet-transactions">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2.5 sm:space-y-0 px-1">
          <h4 className="text-xs font-bold tracking-widest text-slate-400 uppercase flex items-center space-x-1.5">
            <Filter className="w-3.5 h-3.5" />
            <span>{t.recentTransactions}</span>
          </h4>
          
          {/* Currency filtering pills */}
          <div className="flex flex-wrap gap-1.5 overflow-x-auto max-w-full">
            {['ALL', 'UAH', 'USD', 'EUR', 'USDT', 'BTC', 'ETH'].map((curr) => (
              <button
                key={curr}
                onClick={() => setFilterCurrency(curr as any)}
                className={`px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase transition-all ${filterCurrency === curr ? 'bg-[#234CFF] text-white shadow-sm' : 'bg-white dark:bg-[#161B26] border border-slate-200/50 dark:border-white/5 text-slate-500'}`}
              >
                {curr}
              </button>
            ))}
          </div>
        </div>

        <div className="max-h-[380px] overflow-y-auto pr-1" id="filtered-transactions">
          {filteredTxs.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-[#161B26] border border-slate-200/40 dark:border-white/5 rounded-[24px]">
              <Wallet2 className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-2.5" />
              <p className="text-sm font-semibold text-slate-400">Empty State</p>
              <p className="text-xs text-slate-400/70">No transactions recorded for this currency filter.</p>
            </div>
          ) : (
            filteredTxs.map(tx => (
              <TransactionItem key={tx.id} tx={tx} language={language} />
            ))
          )}
        </div>
      </div>

      {/* MODAL: ADD ACCOUNT */}
      <AnimatePresence>
        {showAddAcc && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowAddAcc(false)} className="absolute inset-0 bg-[#0B0E14]/60 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative w-full max-w-sm rounded-[24px] bg-white dark:bg-[#161B26] p-6 border border-slate-200 dark:border-white/10 shadow-2xl z-10">
              <h3 className="font-sans font-bold text-lg text-slate-900 dark:text-white mb-4">{t.addAccount}</h3>
              <form onSubmit={handleAddAccountSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{t.selectCurrency}</label>
                  <select
                    value={newAccCurr}
                    onChange={(e) => setNewAccCurr(e.target.value as CurrencyType)}
                    className="w-full px-3 py-3 bg-slate-50 dark:bg-[#11141D] border border-slate-200 dark:border-white/5 rounded-[16px] text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#234CFF] font-medium"
                  >
                    {['USD', 'EUR', 'USDT', 'BTC', 'ETH'].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="flex space-x-3 pt-2">
                  <button type="button" onClick={() => setShowAddAcc(false)} className="flex-1 py-3 text-xs font-bold rounded-[16px] border border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-all">{t.cancel}</button>
                  <button type="submit" className="flex-1 py-3 text-xs font-bold rounded-[16px] bg-[#234CFF] text-white hover:bg-[#5A3FFF] transition-all flex justify-center items-center">
                    <span>{t.confirm}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: OPEN VIRTUAL CARD */}
      <AnimatePresence>
        {showAddCard && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowAddCard(false)} className="absolute inset-0 bg-[#0B0E14]/60 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative w-full max-w-sm rounded-[24px] bg-white dark:bg-[#161B26] p-6 border border-slate-200 dark:border-white/10 shadow-2xl z-10">
              <h3 className="font-sans font-bold text-lg text-slate-900 dark:text-white mb-4">{t.openVirtualCard}</h3>
              <form onSubmit={handleAddCardSubmit} className="space-y-4">
                {/* Brand Selector */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Payment System</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['visa', 'mastercard'].map((brand) => (
                      <button
                        key={brand}
                        type="button"
                        onClick={() => setNewCardType(brand as any)}
                        className={`py-2.5 rounded-xl text-xs font-bold border transition-all capitalize ${newCardType === brand ? 'bg-slate-100 dark:bg-white/10 text-[#234CFF] border-[#234CFF]' : 'border-slate-200 dark:border-white/5 text-slate-500'}`}
                      >
                        {brand}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Currency Selector */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{t.selectCurrency}</label>
                  <select
                    value={newCardCurrency}
                    onChange={(e) => setNewCardCurrency(e.target.value as CurrencyType)}
                    className="w-full px-3 py-3 bg-slate-50 dark:bg-[#11141D] border border-slate-200 dark:border-white/5 rounded-[16px] text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#234CFF] font-medium"
                  >
                    {['UAH', 'USD', 'EUR'].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Card Theme Selector */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Card Theme</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['black', 'blue', 'gradient'].map((theme) => (
                      <button
                        key={theme}
                        type="button"
                        onClick={() => setNewCardTheme(theme as any)}
                        className={`py-2.5 rounded-xl text-[10px] font-bold border transition-all uppercase ${newCardTheme === theme ? 'bg-slate-100 dark:bg-white/10 text-[#234CFF] border-[#234CFF]' : 'border-slate-200 dark:border-white/5 text-slate-500'}`}
                      >
                        {theme}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3 pt-2">
                  <button type="button" onClick={() => setShowAddCard(false)} className="flex-1 py-3 text-xs font-bold rounded-[16px] border border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-all">{t.cancel}</button>
                  <button type="submit" className="flex-1 py-3 text-xs font-bold rounded-[16px] bg-[#234CFF] text-white hover:bg-[#5A3FFF] transition-all flex justify-center items-center">
                    <span>{t.confirm}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
