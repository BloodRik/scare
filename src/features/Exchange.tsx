import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowDownUp, RefreshCw, AlertCircle, Info } from 'lucide-react';
import { useWalletStore } from '../store/walletStore';
import { useAuthStore } from '../store/authStore';
import { useNotificationStore } from '../store/notificationStore';
import { translations } from '../constants/translations';
import { CurrencyType } from '../types';

export const Exchange: React.FC = () => {
  const { language } = useAuthStore();
  const { accounts, deposit } = useWalletStore();
  const { showToast } = useNotificationStore();
  const t = translations[language];

  const [fromCurr, setFromCurr] = useState<CurrencyType>('USD');
  const [toCurr, setToCurr] = useState<CurrencyType>('UAH');
  const [fromAmount, setFromAmount] = useState('');
  const [isExchanging, setIsExchanging] = useState(false);

  // Mock exchange rates (relative to USD)
  const rates: Record<CurrencyType, number> = {
    USD: 1.00,
    EUR: 0.92,
    UAH: 41.20,
    USDT: 1.00,
    BTC: 0.000015, // $64,250
    ETH: 0.00029,  // $3,450
    USDC: 1.00,
    SOL: 0.007,
    TON: 0.136,
    BNB: 0.0017
  };

  const getExchangeRate = () => {
    const rateFrom = rates[fromCurr];
    const rateTo = rates[toCurr];
    // Exchange rate = (1 / rateFrom) * rateTo
    return (1 / rateFrom) * rateTo;
  };

  const calculateToAmount = () => {
    const amt = parseFloat(fromAmount);
    if (isNaN(amt) || amt <= 0) return '0.00';
    const result = amt * getExchangeRate();
    const isToCrypto = ['BTC', 'ETH'].includes(toCurr);
    return result.toLocaleString('en-US', {
      minimumFractionDigits: isToCrypto ? 6 : 2,
      maximumFractionDigits: isToCrypto ? 6 : 2
    });
  };

  const handleSwapCurrencies = () => {
    const temp = fromCurr;
    setFromCurr(toCurr);
    setToCurr(temp);
  };

  const handleExchangeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(fromAmount);
    if (isNaN(amount) || amount <= 0) return;

    // Check balance
    const sourceAcc = accounts.find(a => a.currency === fromCurr);
    if (!sourceAcc || sourceAcc.balance < amount) {
      showToast(t.toastTransferFailed, 'error');
      return;
    }

    setIsExchanging(true);
    await new Promise((r) => setTimeout(r, 900));

    // Deduct source and Add target
    const targetAmount = amount * getExchangeRate();
    
    // Simulate updating in store (since we don't have a specific exchange action in walletStore, we can deposit negative to source and positive to target)
    await deposit(accounts.find(a => a.currency === fromCurr)!.id, -amount);
    await deposit(accounts.find(a => a.currency === toCurr)!.id, targetAmount);

    showToast(t.toastExchangeSuccess, 'success');
    setFromAmount('');
    setIsExchanging(false);
  };

  return (
    <div className="space-y-6 pb-24" id="exchange-view-container">
      <div className="rounded-[24px] bg-white dark:bg-[#161B26] border border-slate-200/40 dark:border-white/5 p-6 shadow-sm">
        <h3 className="font-sans font-bold text-lg text-slate-900 dark:text-white mb-6">
          {language === 'uk' ? 'Конвертація валют' : 'Currency Exchange'}
        </h3>

        <form onSubmit={handleExchangeSubmit} className="space-y-5">
          {/* FROM ACC */}
          <div className="p-4.5 rounded-[20px] bg-slate-50 dark:bg-[#11141D] border border-slate-100 dark:border-white/5">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{t.from}</span>
              <span className="text-xs text-slate-400 font-medium">
                {language === 'uk' ? 'Доступно: ' : 'Balance: '}
                <span className="font-bold text-slate-600 dark:text-slate-200">
                  {accounts.find(a => a.currency === fromCurr)?.balance.toLocaleString() || 0} {fromCurr}
                </span>
              </span>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex-1 min-w-0">
                <input
                  type="number"
                  required
                  min="0.000001"
                  step="any"
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                  className="w-full bg-transparent border-none text-xl font-sans font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-0 p-0"
                  placeholder="0.00"
                />
              </div>
              <select
                value={fromCurr}
                onChange={(e) => setFromCurr(e.target.value as CurrencyType)}
                className="shrink-0 bg-white dark:bg-[#1E2533] border border-slate-200 dark:border-white/10 rounded-xl px-3 py-1.5 text-sm font-bold focus:outline-none text-slate-800 dark:text-slate-200 cursor-pointer"
              >
                {['UAH', 'USD', 'EUR', 'USDT', 'BTC', 'ETH'].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* SWAP ROW */}
          <div className="flex justify-center relative -mt-4.5 mb-1.5 sm:-my-2.5 z-10">
            <motion.button
              type="button"
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
              onClick={handleSwapCurrencies}
              className="p-2.5 sm:p-3 rounded-full bg-[#234CFF] text-white shadow-lg active:scale-95 transition-all cursor-pointer"
            >
              <ArrowDownUp className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
            </motion.button>
          </div>

          {/* TO ACC */}
          <div className="p-4.5 rounded-[20px] bg-slate-50 dark:bg-[#11141D] border border-slate-100 dark:border-white/5">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{t.to}</span>
              <span className="text-xs text-slate-400 font-medium">
                {language === 'uk' ? 'Доступно: ' : 'Balance: '}
                <span className="font-bold text-slate-600 dark:text-slate-200">
                  {accounts.find(a => a.currency === toCurr)?.balance.toLocaleString() || 0} {toCurr}
                </span>
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex-1 text-xl font-sans font-bold text-slate-400 select-all dark:text-slate-300">
                {calculateToAmount()}
              </div>
              <select
                value={toCurr}
                onChange={(e) => setToCurr(e.target.value as CurrencyType)}
                className="shrink-0 bg-white dark:bg-[#1E2533] border border-slate-200 dark:border-white/10 rounded-xl px-3 py-1.5 text-sm font-bold focus:outline-none text-slate-800 dark:text-slate-200 cursor-pointer"
              >
                {['UAH', 'USD', 'EUR', 'USDT', 'BTC', 'ETH'].filter(c => c !== fromCurr).map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* FEES AND INFORMATION */}
          <div className="space-y-2 px-1 py-1 text-xs text-slate-400">
            <div className="flex justify-between items-center">
              <span className="flex items-center space-x-1.5">
                <Info className="w-3.5 h-3.5 text-slate-400" />
                <span>{t.rate}</span>
              </span>
              <span className="font-mono font-bold text-slate-600 dark:text-slate-300">
                1 {fromCurr} = {getExchangeRate().toLocaleString(undefined, { maximumFractionDigits: 6 })} {toCurr}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>{t.fee}</span>
              <span className="font-bold text-[#00D26A]">{t.instant} (0%)</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isExchanging || !fromAmount}
            className="w-full py-4 rounded-[18px] bg-[#234CFF] hover:bg-[#5A3FFF] text-white font-sans font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2 active:scale-98 disabled:opacity-50"
          >
            {isExchanging ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : (
              <span>{language === 'uk' ? 'Здійснити обмін' : 'Exchange Assets'}</span>
            )}
          </button>
        </form>
      </div>

      {/* SWAP RATES TABLE */}
      <div className="rounded-[24px] bg-white dark:bg-[#161B26] border border-slate-200/40 dark:border-white/5 p-6 shadow-sm space-y-4">
        <h4 className="text-xs font-bold tracking-widest text-slate-400 uppercase">{t.swapRates}</h4>
        <div className="space-y-3">
          {[
            { pair: 'USD / UAH', rate: '41.20', buy: '41.15', sell: '41.35' },
            { pair: 'EUR / UAH', rate: '44.80', buy: '44.70', sell: '44.95' },
            { pair: 'EUR / USD', rate: '1.09', buy: '1.08', sell: '1.10' },
            { pair: 'USDT / UAH', rate: '41.25', buy: '41.20', sell: '41.30' }
          ].map((pairData, i) => (
            <div key={i} className="flex justify-between items-center text-xs py-1.5 border-b border-slate-100 dark:border-white/5 last:border-0">
              <span className="font-bold text-slate-700 dark:text-slate-200">{pairData.pair}</span>
              <div className="space-x-4 font-mono font-bold text-slate-400">
                <span>Buy: <strong className="text-slate-600 dark:text-slate-300">{pairData.buy}</strong></span>
                <span>Sell: <strong className="text-slate-600 dark:text-slate-300">{pairData.sell}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
