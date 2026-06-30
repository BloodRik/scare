import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Phone, CreditCard, Send, Search, Sparkles, HelpCircle, CheckCircle2 } from 'lucide-react';
import { useWalletStore } from '../store/walletStore';
import { useAuthStore } from '../store/authStore';
import { useNotificationStore } from '../store/notificationStore';
import { translations } from '../constants/translations';
import { CurrencyType } from '../types';

export const P2PTransfer: React.FC = () => {
  const { language } = useAuthStore();
  const { cards, transferP2P } = useWalletStore();
  const { showToast } = useNotificationStore();
  const t = translations[language];

  const [tab, setTab] = useState<'username' | 'phone' | 'card'>('username');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [comment, setComment] = useState('Дякую! 🤝');
  const [selectedCardId, setSelectedCardId] = useState(cards[0]?.id || '');
  const [isSending, setIsSending] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptDetails, setReceiptDetails] = useState<any>(null);

  const selectedCard = cards.find(c => c.id === selectedCardId) || cards[0];

  // Mock matching user for demo
  const getMockRecipient = () => {
    if (tab === 'username' && recipient.toLowerCase().includes('jora')) {
      return { name: 'Эрибас Петренко', info: '@jora228', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80' };
    }
    if (tab === 'phone' && recipient.length >= 7) {
      return { name: 'Эрибас Петренко', info: '+380 97 123 45 67', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80' };
    }
    if (tab === 'card' && recipient.replace(/\s/g, '').length >= 16) {
      return { name: 'Эрибас Петренко', info: 'VISA •••• 5678', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80' };
    }
    return null;
  };

  const matchedUser = getMockRecipient();

  const handleSendTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) return;

    if (!selectedCard || selectedCard.balance < amt) {
      showToast(t.toastTransferFailed, 'error');
      return;
    }

    setIsSending(true);
    
    const recipientName = matchedUser ? matchedUser.name : (recipient || 'Unknown Recipient');
    const currency = selectedCard.currency;

    const success = await transferP2P({
      recipientName,
      cardNumber: tab === 'card' ? recipient : undefined,
      phoneNumber: tab === 'phone' ? recipient : undefined,
      username: tab === 'username' ? recipient : undefined,
      amount: amt,
      currency,
      comment
    });

    if (success) {
      setReceiptDetails({
        recipientName,
        amount: amt,
        currency,
        comment,
        cardNum: selectedCard.number,
        date: 'Сьогодні, ' + new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
      });
      setShowReceipt(true);
      showToast(t.toastTransferSuccess, 'success');
      setRecipient('');
      setAmount('');
    } else {
      showToast(t.toastTransferFailed, 'error');
    }
    setIsSending(false);
  };

  return (
    <div className="space-y-6 pb-24" id="p2p-view-container">
      <div className="rounded-[24px] bg-white dark:bg-[#161B26] border border-slate-200/40 dark:border-white/5 p-6 shadow-sm">
        <h3 className="font-sans font-bold text-lg text-slate-900 dark:text-white mb-5">
          {t.p2p}
        </h3>

        {/* Inner segments */}
        <div className="flex bg-slate-50 dark:bg-[#11141D] p-1 rounded-xl border border-slate-200/20 mb-6">
          {[
            { id: 'username', label: 'Login', icon: <User className="w-3.5 h-3.5" /> },
            { id: 'phone', label: 'Phone', icon: <Phone className="w-3.5 h-3.5" /> },
            { id: 'card', label: 'Card', icon: <CreditCard className="w-3.5 h-3.5" /> }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => { setTab(item.id as any); setRecipient(''); }}
              className={`flex-1 py-2.5 rounded-lg text-[11px] font-bold tracking-wide transition-all flex items-center justify-center space-x-1.5 ${tab === item.id ? 'bg-white dark:bg-[#1E2533] text-[#234CFF] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        <form onSubmit={handleSendTransfer} className="space-y-4">
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

          {/* Recipient Input */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              {tab === 'username' && t.transferByLogin}
              {tab === 'phone' && t.transferByPhone}
              {tab === 'card' && t.transferByCard}
            </label>
            <div className="relative">
              <input
                type="text" required value={recipient} onChange={(e) => setRecipient(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-[#11141D] border border-slate-200 dark:border-white/5 rounded-[16px] text-sm text-slate-900 dark:text-white focus:outline-none"
                placeholder={tab === 'username' ? 'e.g. jora228' : tab === 'phone' ? 'e.g. +380971234567' : 'e.g. 4441 1144 ...'}
              />
            </div>
          </div>

          {/* Matched Recipient Alert */}
          <AnimatePresence>
            {matchedUser && (
              <motion.div
                initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                className="p-4 rounded-[18px] bg-[#234CFF]/5 border border-[#234CFF]/15 flex items-center space-x-3.5"
              >
                <img src={matchedUser.avatar} alt="Avatar" className="w-11 h-11 rounded-full object-cover border" />
                <div>
                  <h4 className="font-sans font-bold text-xs text-slate-800 dark:text-slate-100">{matchedUser.name}</h4>
                  <p className="text-[11px] text-slate-400 font-semibold">{matchedUser.info}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

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

          {/* Commentary */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{t.comment}</label>
            <input
              type="text" value={comment} onChange={(e) => setComment(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-[#11141D] border border-slate-200 dark:border-white/5 rounded-[16px] text-sm text-slate-900 dark:text-white focus:outline-none font-medium"
              placeholder="e.g. Thanks!"
            />
          </div>

          {/* Fee check */}
          <div className="flex justify-between items-center text-xs text-slate-400 px-1 pt-1">
            <span>{t.fee}</span>
            <span className="font-bold text-[#00D26A]">{t.instant} (0%)</span>
          </div>

          <button
            type="submit"
            disabled={isSending || !amount}
            className="w-full py-4 rounded-[18px] bg-[#234CFF] hover:bg-[#5A3FFF] text-white font-sans font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2 active:scale-98 disabled:opacity-50 mt-2"
          >
            {isSending ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent animate-spin rounded-full" />
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>{t.sendButton}</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* SUCCESS RECEIPT DIALOG */}
      <AnimatePresence>
        {showReceipt && receiptDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowReceipt(false)} className="absolute inset-0 bg-[#0B0E14]/70 backdrop-blur-sm" />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-sm rounded-[24px] bg-white dark:bg-[#161B26] p-6 border border-slate-200 dark:border-white/10 shadow-2xl z-10 space-y-6"
            >
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-[#00D26A]/10 text-[#00D26A] flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-sans font-black text-lg text-slate-900 dark:text-white">{t.success}</h3>
                <p className="text-xs text-slate-400 mt-1">Transaction Completed Successfully</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#11141D] border border-slate-100 dark:border-white/5 space-y-3 font-mono text-xs text-slate-600 dark:text-slate-300">
                <div className="flex justify-between">
                  <span>Recipient:</span>
                  <span className="font-sans font-bold text-slate-800 dark:text-white">{receiptDetails.recipientName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Amount:</span>
                  <span className="font-sans font-black text-[#00D26A]">{receiptDetails.amount.toLocaleString()} {receiptDetails.currency}</span>
                </div>
                <div className="flex justify-between">
                  <span>From Card:</span>
                  <span>{receiptDetails.cardNum}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span>{receiptDetails.date}</span>
                </div>
                {receiptDetails.comment && (
                  <div className="border-t border-slate-200 dark:border-white/5 pt-2 flex flex-col space-y-1">
                    <span className="text-[10px] text-slate-400 uppercase">Message:</span>
                    <span className="font-sans italic">{receiptDetails.comment}</span>
                  </div>
                )}
              </div>

              <button
                onClick={() => setShowReceipt(false)}
                className="w-full py-3.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90 font-sans font-bold text-xs transition-all active:scale-98"
              >
                Close Receipt
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
