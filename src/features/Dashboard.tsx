import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowUpRight, ArrowDownLeft, RefreshCw, Smartphone, Briefcase, ChevronRight, TrendingUp, Wallet2 
} from 'lucide-react';
import { useWalletStore } from '../store/walletStore';
import { useAuthStore } from '../store/authStore';
import { translations } from '../constants/translations';
import { VisaCardWidget } from '../components/VisaCardWidget';
import { TransactionItem } from '../components/TransactionItem';
import { InteractiveChart } from '../components/InteractiveChart';
import { mockBalanceHistory } from '../mock/data';

interface DashboardProps {
  onNavigate: (tabId: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { language, user } = useAuthStore();
  const { accounts, cards, transactions } = useWalletStore();
  const t = translations[language];

  // Get first credit card for promo widget
  const defaultCard = cards[0];

  // Get total fiat balance in UAH equivalent (mock rates: USD=41.2, EUR=44.8)
  const totalBalanceUah = accounts.reduce((sum, acc) => {
    if (acc.currency === 'UAH') return sum + acc.balance;
    if (acc.currency === 'USD') return sum + acc.balance * 41.2;
    if (acc.currency === 'EUR') return sum + acc.balance * 44.8;
    return sum; // Skip crypto in primary fiat balance banner
  }, 0);

  // Take latest 4 transactions
  const recentTransactions = transactions.slice(0, 4);

  return (
    <div className="space-y-6 pb-24" id="dashboard-view-container">
      {/* Dynamic Header Welcome */}
      <div className="flex justify-between items-center" id="dashboard-header-block">
        <div>
          <h2 className="font-sans font-black text-2xl text-slate-900 dark:text-white leading-tight">
            {language === 'uk' ? 'Вітаємо' : 'Welcome'}, {user?.name.split(' ')[0]}
          </h2>
          <p className="text-xs text-slate-400 font-semibold mt-1">
            {language === 'uk' ? 'Ваш цифровий фінансовий стан на сьогодні.' : 'Here is your digital financial status today.'}
          </p>
        </div>
        <img 
          onClick={() => onNavigate('profile')}
          src={user?.avatar} 
          alt="Avatar" 
          className="w-10 h-10 rounded-full object-cover border border-[#234CFF] cursor-pointer"
        />
      </div>

      {/* Flagship Total Balance Card */}
      <div className="rounded-[24px] bg-gradient-to-tr from-[#161B26] to-[#1E2533] p-6 text-white border border-white/5 shadow-xl relative overflow-hidden">
        {/* Dynamic Glow blobs */}
        <div className="absolute right-0 top-0 w-32 h-32 rounded-full bg-[#234CFF]/15 blur-[45px] pointer-events-none" />
        <div className="absolute left-[-10%] bottom-[-10%] w-24 h-24 rounded-full bg-[#5A3FFF]/10 blur-[40px] pointer-events-none" />

        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{t.totalBalance}</p>
        
        <h2 className="font-sans font-black text-3xl sm:text-4xl mt-2 tracking-tight">
          {totalBalanceUah.toLocaleString(language === 'uk' ? 'uk-UA' : 'en-US', { minimumFractionDigits: 2 })} ₴
        </h2>

        {/* Mini stats */}
        <div className="flex items-center space-x-1.5 mt-2.5 text-[#00D26A] text-xs font-bold">
          <TrendingUp className="w-4 h-4" />
          <span>+4.2% {language === 'uk' ? 'цього місяця' : 'this month'}</span>
        </div>

        {/* Currency brief row */}
        <div className="grid grid-cols-3 gap-2 mt-6 pt-5 border-t border-white/5 text-slate-300 text-xs">
          {accounts.slice(0, 3).map((acc) => (
            <div key={acc.id} className="space-y-1">
              <span className="text-[10px] text-slate-500 font-bold uppercase">
                {acc.currency} {language === 'uk' ? 'Рахунок' : 'Account'}
              </span>
              <p className="font-sans font-black text-white text-sm">
                {acc.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {acc.symbol}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Flagship Quick Action shortcuts */}
      <div className="grid grid-cols-4 gap-2.5" id="dashboard-quick-actions">
        {[
          { id: 'p2p', label: language === 'uk' ? 'Надіслати' : 'Send', icon: <ArrowUpRight className="w-4.5 h-4.5 text-[#234CFF]" />, target: 'p2p' },
          { id: 'exchange', label: language === 'uk' ? 'Обмін' : 'Swap', icon: <RefreshCw className="w-4.5 h-4.5 text-[#5A3FFF]" />, target: 'exchange' },
          { id: 'payments', label: language === 'uk' ? 'Платежі' : 'Bills', icon: <Smartphone className="w-4.5 h-4.5 text-[#FFC400]" />, target: 'payments' },
          { id: 'business', label: language === 'uk' ? 'Бізнес' : 'Business', icon: <Briefcase className="w-4.5 h-4.5 text-[#00D26A]" />, target: 'business', requiresFop: true }
        ].map((item) => {
          if (item.requiresFop && !user?.isFop) return null;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.target)}
              className="py-3 rounded-[20px] bg-white dark:bg-[#161B26] border border-slate-200/45 dark:border-white/5 flex flex-col items-center space-y-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-50 dark:bg-[#1E2533] border border-slate-100 dark:border-white/5 shrink-0">
                {item.icon}
              </div>
              <span className="font-sans font-bold text-[10px] text-slate-700 dark:text-slate-200">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Weekly Spending Chart */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold tracking-widest text-slate-400 uppercase">{t.analytics}</h4>
        <div className="rounded-[24px] bg-white dark:bg-[#161B26] p-5 border border-slate-200/50 dark:border-white/5 shadow-sm">
          <InteractiveChart data={mockBalanceHistory} dataKey="UAH" gradientColor="#234CFF" />
        </div>
      </div>

      {/* Credit Card promo shortcut widget */}
      {defaultCard && (
        <div className="space-y-3">
          <div className="flex justify-between items-center px-1">
            <h4 className="text-xs font-bold tracking-widest text-slate-400 uppercase">
              {language === 'uk' ? 'Моя карта' : 'My Card'}
            </h4>
            <button 
              onClick={() => onNavigate('wallet')}
              className="text-xs font-bold text-[#234CFF] hover:underline flex items-center space-x-0.5"
            >
              <span>{language === 'uk' ? 'Керування картами' : 'Manage Cards'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <VisaCardWidget card={defaultCard} showDetailsToggle={true} />
        </div>
      )}

      {/* Recent transactions list */}
      <div className="space-y-3">
        <div className="flex justify-between items-center px-1">
          <h4 className="text-xs font-bold tracking-widest text-slate-400 uppercase">{t.recentTransactions}</h4>
          <button 
            onClick={() => onNavigate('wallet')}
            className="text-xs font-bold text-[#234CFF] hover:underline flex items-center space-x-0.5"
          >
            <span>{t.seeAll}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-0.5" id="recent-transactions-feed">
          {recentTransactions.map((tx) => (
            <TransactionItem key={tx.id} tx={tx} language={language} />
          ))}
        </div>
      </div>
    </div>
  );
};
