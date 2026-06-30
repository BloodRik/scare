import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Briefcase, ArrowUpRight, FileSpreadsheet, Plus, Users, PieChart as ChartIcon, CheckCircle, HelpCircle, Send 
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useAuthStore } from '../store/authStore';
import { useWalletStore } from '../store/walletStore';
import { useNotificationStore } from '../store/notificationStore';
import { translations } from '../constants/translations';

export const Business: React.FC = () => {
  const { language, user } = useAuthStore();
  const { accounts, deposit } = useWalletStore();
  const { showToast } = useNotificationStore();
  const t = translations[language];

  const [activeTab, setActiveTab] = useState<'acquiring' | 'invoicing' | 'payouts' | 'analytics'>('acquiring');
  
  // Invoice Form State
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [invRecipient, setInvRecipient] = useState('');
  const [invAmount, setInvAmount] = useState('');
  const [invComment, setInvComment] = useState('');
  const [isCreatingInvoice, setIsCreatingInvoice] = useState(false);

  // Payout Form State
  const [payoutAmount, setPayoutAmount] = useState('');
  const [contractorsCount, setContractorsCount] = useState('3');
  const [isPayingOut, setIsPayingOut] = useState(false);

  // Mock Business Analytics Data
  const data = [
    { name: 'Acquiring POS', value: 35000, color: '#234CFF' },
    { name: 'Invoicing bills', value: 18000, color: '#5A3FFF' },
    { name: 'Direct P2P', value: 12000, color: '#00D26A' },
    { name: 'Foreign SWIFT', value: 25000, color: '#FFC400' }
  ];

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(invAmount);
    if (isNaN(amt) || amt <= 0) return;

    setIsCreatingInvoice(true);
    setTimeout(() => {
      showToast(language === 'uk' ? 'Рахунок успішно виставлено!' : 'Invoice created successfully!', 'success');
      setInvRecipient('');
      setInvAmount('');
      setInvComment('');
      setShowInvoiceModal(false);
      setIsCreatingInvoice(false);
    }, 1200);
  };

  const handleMassPayoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(payoutAmount);
    const count = parseInt(contractorsCount);
    if (isNaN(amt) || amt <= 0 || isNaN(count)) return;

    const totalPayout = amt * count;
    // Check FOP balance
    const uahAcc = accounts.find(a => a.currency === 'UAH');
    if (!uahAcc || uahAcc.balance < totalPayout) {
      showToast(t.toastTransferFailed, 'error');
      return;
    }

    setIsPayingOut(true);
    // Deduct
    await deposit(uahAcc.id, -totalPayout);
    showToast(language === 'uk' ? 'Масові виплати надіслано!' : 'Bulk payouts completed successfully!', 'success');
    setPayoutAmount('');
    setIsPayingOut(false);
  };

  return (
    <div className="space-y-6 pb-24" id="business-view-container">
      {/* Business Account Banner */}
      <div className="rounded-[24px] bg-gradient-to-tr from-[#161B26] to-[#1E2533] p-6 text-white border border-white/5 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-32 h-32 rounded-full bg-[#234CFF]/15 blur-[50px] pointer-events-none" />
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/15">
            <Briefcase className="w-6 h-6 text-[#234CFF]" />
          </div>
          <div>
            <h3 className="font-sans font-black text-lg">{t.businessAccount}</h3>
            <p className="text-xs text-slate-400 font-semibold">{user?.businessName || 'ФОП Петренко І.В.'}</p>
          </div>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">{t.businessSubtitle}</p>
      </div>

      {/* Feature Menu Grid */}
      <div className="grid grid-cols-4 gap-2" id="business-tab-navigation">
        {[
          { id: 'acquiring', label: 'Acquiring', icon: <ArrowUpRight className="w-4.5 h-4.5" /> },
          { id: 'invoicing', label: 'Invoices', icon: <FileSpreadsheet className="w-4.5 h-4.5" /> },
          { id: 'payouts', label: 'Payouts', icon: <Users className="w-4.5 h-4.5" /> },
          { id: 'analytics', label: 'Analytics', icon: <ChartIcon className="w-4.5 h-4.5" /> }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as any)}
            className={`py-3 rounded-xl border flex flex-col items-center justify-center space-y-1.5 transition-all text-xs font-bold ${activeTab === item.id ? 'bg-[#234CFF]/10 text-[#234CFF] border-[#234CFF]' : 'bg-white dark:bg-[#161B26] border-slate-200/40 dark:border-white/5 text-slate-500'}`}
          >
            {item.icon}
            <span className="text-[10px] truncate">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Tabs Contents */}
      <div className="rounded-[24px] bg-white dark:bg-[#161B26] border border-slate-200/40 dark:border-white/5 p-6 shadow-sm">
        <AnimatePresence mode="wait">
          {activeTab === 'acquiring' && (
            /* ACQUIRING */
            <motion.div key="acquiring" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <h4 className="font-sans font-bold text-sm text-slate-800 dark:text-slate-100">{t.acceptPayments}</h4>
              <div className="space-y-3">
                {[
                  { title: 'Online QR Terminal', desc: 'Accept customer card payments directly from printed or on-screen QR code.', badge: 'Active' },
                  { title: 'Web payment links', desc: 'Send simple invoice links to customers via Telegram, Viber, or Email.', badge: 'Active' },
                  { title: 'Software POS Terminal', desc: 'Turn your Android/iOS smartphone into a card reader with Tap To Pay.', badge: 'Install' }
                ].map((item, index) => (
                  <div key={index} className="p-4 rounded-xl bg-slate-50 dark:bg-[#11141D] border border-slate-100 dark:border-white/5 flex justify-between items-center">
                    <div>
                      <h5 className="font-sans font-bold text-xs text-slate-800 dark:text-slate-200">{item.title}</h5>
                      <p className="text-[10px] text-slate-400 mt-1">{item.desc}</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider bg-[#00D26A]/10 text-[#00D26A] uppercase shrink-0">
                      {item.badge}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'invoicing' && (
            /* INVOICING */
            <motion.div key="invoicing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-sans font-bold text-sm text-slate-800 dark:text-slate-100">{t.invoicing}</h4>
                <button
                  onClick={() => setShowInvoiceModal(true)}
                  className="px-3 py-1.5 rounded-lg bg-[#234CFF] text-white text-[11px] font-bold hover:bg-[#5A3FFF] transition-all flex items-center space-x-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Issue Bill</span>
                </button>
              </div>

              <div className="p-12 text-center border border-dashed rounded-xl border-slate-200 dark:border-white/10">
                <FileSpreadsheet className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <h5 className="font-sans font-bold text-slate-700 dark:text-slate-300 text-xs">No active invoices</h5>
                <p className="text-[10px] text-slate-400 mt-1">Generate a custom invoice to collect payment from suppliers.</p>
              </div>
            </motion.div>
          )}

          {activeTab === 'payouts' && (
            /* PAYOUTS */
            <motion.div key="payouts" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <h4 className="font-sans font-bold text-sm text-slate-800 dark:text-slate-100">{t.payouts}</h4>
              <form onSubmit={handleMassPayoutSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Payouts Count</label>
                    <input
                      type="number" required value={contractorsCount} onChange={(e) => setContractorsCount(e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 dark:bg-[#11141D] border rounded-xl text-xs text-slate-900 dark:text-white"
                      placeholder="e.g. 5"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Amount per recipient</label>
                    <input
                      type="number" required value={payoutAmount} onChange={(e) => setPayoutAmount(e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 dark:bg-[#11141D] border rounded-xl text-xs text-slate-900 dark:text-white"
                      placeholder="Amount in UAH"
                    />
                  </div>
                </div>
                <button
                  type="submit" disabled={isPayingOut}
                  className="w-full py-3.5 rounded-xl bg-[#234CFF] hover:bg-[#5A3FFF] disabled:opacity-50 text-white font-sans font-bold text-xs transition-all flex items-center justify-center space-x-2"
                >
                  {isPayingOut ? <div className="w-4 h-4 border-2 border-white border-t-transparent animate-spin rounded-full" /> : <>
                    <Send className="w-4 h-4" />
                    <span>Launch Mass Payouts</span>
                  </>}
                </button>
              </form>
            </motion.div>
          )}

          {activeTab === 'analytics' && (
            /* ANALYTICS */
            <motion.div key="analytics" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 flex flex-col items-center">
              <h4 className="font-sans font-bold text-sm text-slate-800 dark:text-slate-100 self-start">{t.analytics}</h4>
              <div className="w-full h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={data} innerRadius={50} outerRadius={70} paddingAngle={4} dataKey="value">
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v) => [`${v} ₴`, null]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              {/* Legends */}
              <div className="grid grid-cols-2 gap-3 w-full max-w-sm text-xs font-semibold text-slate-400">
                {data.map((item, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="truncate">{item.name}: <strong className="text-slate-700 dark:text-slate-200">{item.value.toLocaleString()} ₴</strong></span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* INVOICE BUILDER MODAL */}
      <AnimatePresence>
        {showInvoiceModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowInvoiceModal(false)} className="absolute inset-0 bg-[#0B0E14]/60 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative w-full max-w-sm rounded-[24px] bg-white dark:bg-[#161B26] p-6 border border-slate-200 dark:border-white/10 shadow-2xl z-10">
              <h3 className="font-sans font-bold text-lg text-slate-900 dark:text-white mb-4">Create New Invoice</h3>
              <form onSubmit={handleCreateInvoice} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-400 uppercase">Customer Name / Company</label>
                  <input
                    type="text" required value={invRecipient} onChange={(e) => setInvRecipient(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-[#11141D] border rounded-xl text-sm"
                    placeholder="e.g. Acme Corp"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-400 uppercase">Billing Amount (UAH)</label>
                  <input
                    type="number" required value={invAmount} onChange={(e) => setInvAmount(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-[#11141D] border rounded-xl text-sm font-bold"
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-400 uppercase">Invoice Comment</label>
                  <input
                    type="text" value={invComment} onChange={(e) => setInvComment(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-[#11141D] border rounded-xl text-sm"
                    placeholder="e.g. Software consulting"
                  />
                </div>
                <div className="flex space-x-3 pt-2">
                  <button type="button" onClick={() => setShowInvoiceModal(false)} className="flex-1 py-3 text-xs font-bold rounded-xl border text-slate-500">{t.cancel}</button>
                  <button type="submit" disabled={isCreatingInvoice} className="flex-1 py-3 text-xs font-bold rounded-xl bg-[#234CFF] text-white flex justify-center items-center">
                    {isCreatingInvoice ? <div className="w-4 h-4 border-2 border-white border-t-transparent animate-spin rounded-full" /> : <span>Confirm Bill</span>}
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
