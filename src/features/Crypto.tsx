import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Coins, TrendingUp, ArrowDownLeft, ArrowUpRight, RefreshCw, Smartphone, Search, HelpCircle, Flame } from 'lucide-react';
import { useCryptoStore } from '../store/cryptoStore';
import { useWalletStore } from '../store/walletStore';
import { useAuthStore } from '../store/authStore';
import { useNotificationStore } from '../store/notificationStore';
import { translations } from '../constants/translations';
import { mockCryptoHistory } from '../mock/data';
import { InteractiveChart } from '../components/InteractiveChart';
import { CurrencyType } from '../types';

export const Crypto: React.FC = () => {
  const { language } = useAuthStore();
  const { cryptoAssets, buyCrypto, sellCrypto, swapCrypto, transferCrypto, updatePrices } = useCryptoStore();
  const { accounts } = useWalletStore();
  const { showToast } = useNotificationStore();
  const t = translations[language];

  const [activeTab, setActiveTab] = useState<'portfolio' | 'markets'>('portfolio');
  const [showTradeModal, setShowTradeModal] = useState<null | 'buy' | 'sell' | 'swap' | 'transfer'>(null);
  
  // Trade Form States
  const [selectedAsset, setSelectedAsset] = useState<CurrencyType>('BTC');
  const [selectedAssetTo, setSelectedAssetTo] = useState<CurrencyType>('USDT');
  const [fiatAmount, setFiatAmount] = useState('');
  const [cryptoAmount, setCryptoAmount] = useState('');
  const [fiatCurrency, setFiatCurrency] = useState<'UAH' | 'USD' | 'EUR'>('UAH');
  const [cryptoTransferAddress, setCryptoTransferAddress] = useState('');
  const [isTrading, setIsTrading] = useState(false);

  // Periodically update mock crypto prices for live feeling
  useEffect(() => {
    const interval = setInterval(() => {
      updatePrices();
    }, 10000);
    return () => clearInterval(interval);
  }, [updatePrices]);

  // Calculations
  const portfolioValueUsd = cryptoAssets.reduce((sum, asset) => sum + (asset.balance * asset.price), 0);
  
  const handleTradeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsTrading(true);
    let success = false;

    if (showTradeModal === 'buy') {
      const amount = parseFloat(fiatAmount);
      if (!isNaN(amount) && amount > 0) {
        success = await buyCrypto(selectedAsset, amount, fiatCurrency);
      }
    } else if (showTradeModal === 'sell') {
      const amount = parseFloat(cryptoAmount);
      if (!isNaN(amount) && amount > 0) {
        success = await sellCrypto(selectedAsset, amount, fiatCurrency);
      }
    } else if (showTradeModal === 'swap') {
      const amount = parseFloat(cryptoAmount);
      if (!isNaN(amount) && amount > 0) {
        success = await swapCrypto(selectedAsset, selectedAssetTo, amount);
      }
    } else if (showTradeModal === 'transfer') {
      const amount = parseFloat(cryptoAmount);
      if (!isNaN(amount) && amount > 0 && cryptoTransferAddress) {
        success = await transferCrypto(selectedAsset, amount, cryptoTransferAddress);
      }
    }

    if (success) {
      showToast(t.toastExchangeSuccess, 'success');
      setFiatAmount('');
      setCryptoAmount('');
      setCryptoTransferAddress('');
      setShowTradeModal(null);
    } else {
      showToast(t.toastTransferFailed, 'error');
    }
    setIsTrading(false);
  };

  return (
    <div className="space-y-6 pb-24" id="crypto-view-container">
      {/* Portofio Value Header */}
      <div className="rounded-[24px] bg-gradient-to-tr from-[#161B26] to-[#1E2533] p-6 text-white border border-white/5 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-36 h-36 rounded-full bg-[#00D26A]/10 blur-[50px] pointer-events-none" />
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{t.portfolio}</p>
            <h2 className="font-sans font-black text-3xl sm:text-4xl mt-2">
              ≈ ${portfolioValueUsd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h2>
            <div className="flex items-center space-x-1.5 mt-2 text-[#00D26A] text-xs font-bold">
              <TrendingUp className="w-4 h-4" />
              <span>+2.45% (24h)</span>
            </div>
          </div>
          <Coins className="w-10 h-10 text-[#00D26A] opacity-80" />
        </div>

        {/* Crypto Buttons */}
        <div className="grid grid-cols-4 gap-2 mt-6 pt-5 border-t border-white/5">
          {[
            { id: 'buy', label: t.buy, icon: <ArrowDownLeft className="w-4.5 h-4.5" /> },
            { id: 'sell', label: t.sell, icon: <ArrowUpRight className="w-4.5 h-4.5" /> },
            { id: 'swap', label: t.swap, icon: <RefreshCw className="w-4.5 h-4.5" /> },
            { id: 'transfer', label: t.withdraw, icon: <Smartphone className="w-4.5 h-4.5" /> }
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setShowTradeModal(btn.id as any)}
              className="py-2.5 px-0.5 sm:px-2 rounded-xl bg-white/5 hover:bg-white/10 active:scale-95 transition-all text-center flex flex-col items-center justify-center space-y-1 text-[10px] sm:text-xs font-bold text-slate-200 min-w-0"
            >
              <span className="shrink-0">{btn.icon}</span>
              <span className="w-full text-center truncate px-0.5" title={btn.label}>
                {btn.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* RECHARTS TRENDING */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold tracking-widest text-slate-400 uppercase">{t.markets}</h4>
        <div className="rounded-[24px] bg-white dark:bg-[#161B26] p-5 border border-slate-200/50 dark:border-white/5 shadow-sm">
          <InteractiveChart data={mockCryptoHistory} dataKey="BTC" gradientColor="#00D26A" />
        </div>
      </div>

      {/* CRYPTO PORTFOLIO LIST */}
      <div className="space-y-3" id="crypto-assets-list">
        <h4 className="text-xs font-bold tracking-widest text-slate-400 uppercase">My Assets</h4>
        <div className="space-y-2.5">
          {cryptoAssets.map((asset) => {
            const hasBalance = asset.balance > 0;
            return (
              <div
                key={asset.id}
                className="p-4 rounded-[20px] bg-white dark:bg-[#161B26] border border-slate-200/40 dark:border-white/5 flex items-center justify-between"
              >
                <div className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 dark:bg-[#1E2533] text-sm font-bold text-[#00D26A]">
                    {asset.symbol.substring(0, 3)}
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-sm text-slate-800 dark:text-slate-100">{asset.name}</h4>
                    <p className="text-xs text-slate-400 mt-0.5 font-medium">
                      ${asset.price.toLocaleString()}
                      <span className={`ml-2 font-bold ${asset.change24h >= 0 ? 'text-[#00D26A]' : 'text-[#FF4D4F]'}`}>
                        {asset.change24h >= 0 ? '+' : ''}{asset.change24h}%
                      </span>
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  {hasSegment(asset.balance) ? (
                    <>
                      <h4 className="font-sans font-black text-sm text-slate-900 dark:text-white">
                        {asset.balance.toLocaleString(undefined, { maximumFractionDigits: 6 })} {asset.symbol}
                      </h4>
                      <p className="text-[11px] text-slate-400 font-bold mt-0.5">
                        ${(asset.balance * asset.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        setSelectedAsset(asset.symbol);
                        setShowTradeModal('buy');
                      }}
                      className="px-3 py-1.5 rounded-full bg-[#00D26A]/10 text-[#00D26A] text-[10px] font-bold tracking-wider hover:bg-[#00D26A] hover:text-white transition-all uppercase"
                    >
                      {t.buy}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* TRADE MODAL SHEET */}
      <AnimatePresence>
        {showTradeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowTradeModal(null)} className="absolute inset-0 bg-[#0B0E14]/60 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative w-full max-w-sm rounded-[24px] bg-white dark:bg-[#161B26] p-6 border border-slate-200 dark:border-white/10 shadow-2xl z-10">
              <h3 className="font-sans font-bold text-lg text-slate-900 dark:text-white mb-4 capitalize">
                {showTradeModal === 'buy' && `${t.buy} Crypto`}
                {showTradeModal === 'sell' && `${t.sell} Crypto`}
                {showTradeModal === 'swap' && `${t.swap} Crypto`}
                {showTradeModal === 'transfer' && `${t.withdraw} Crypto`}
              </h3>
              
              <form onSubmit={handleTradeSubmit} className="space-y-4">
                {/* Asset From */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Asset</label>
                  <select
                    value={selectedAsset}
                    onChange={(e) => setSelectedAsset(e.target.value as CurrencyType)}
                    className="w-full px-3 py-3 bg-slate-50 dark:bg-[#11141D] border border-slate-200 dark:border-white/5 rounded-[16px] text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#234CFF] font-medium"
                  >
                    {['BTC', 'ETH', 'USDT'].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Conditional fields based on Action */}
                {showTradeModal === 'buy' && (
                  <>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Fiat Account</label>
                      <select
                        value={fiatCurrency}
                        onChange={(e) => setFiatCurrency(e.target.value as any)}
                        className="w-full px-3 py-3 bg-slate-50 dark:bg-[#11141D] border border-slate-200 dark:border-white/5 rounded-[16px] text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#234CFF] font-medium"
                      >
                        {['UAH', 'USD', 'EUR'].map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Amount</label>
                      <input
                        type="number" required min="1" step="any" value={fiatAmount} onChange={(e) => setFiatAmount(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-[#11141D] border border-slate-200 dark:border-white/5 rounded-[16px] text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#234CFF]"
                        placeholder={`Amount in ${fiatCurrency}`}
                      />
                    </div>
                  </>
                )}

                {showTradeModal === 'sell' && (
                  <>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Convert to</label>
                      <select
                        value={fiatCurrency}
                        onChange={(e) => setFiatCurrency(e.target.value as any)}
                        className="w-full px-3 py-3 bg-slate-50 dark:bg-[#11141D] border border-slate-200 dark:border-white/5 rounded-[16px] text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#234CFF] font-medium"
                      >
                        {['UAH', 'USD', 'EUR'].map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Amount Crypto</label>
                      <input
                        type="number" required min="0.0001" step="any" value={cryptoAmount} onChange={(e) => setCryptoAmount(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-[#11141D] border border-slate-200 dark:border-white/5 rounded-[16px] text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#234CFF]"
                        placeholder={`Amount in ${selectedAsset}`}
                      />
                    </div>
                  </>
                )}

                {showTradeModal === 'swap' && (
                  <>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Swap to</label>
                      <select
                        value={selectedAssetTo}
                        onChange={(e) => setSelectedAssetTo(e.target.value as CurrencyType)}
                        className="w-full px-3 py-3 bg-slate-50 dark:bg-[#11141D] border border-slate-200 dark:border-white/5 rounded-[16px] text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#234CFF] font-medium"
                      >
                        {['USDT', 'BTC', 'ETH'].filter(c => c !== selectedAsset).map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Amount to Swap</label>
                      <input
                        type="number" required min="0.0001" step="any" value={cryptoAmount} onChange={(e) => setCryptoAmount(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-[#11141D] border border-slate-200 dark:border-white/5 rounded-[16px] text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#234CFF]"
                        placeholder={`Amount in ${selectedAsset}`}
                      />
                    </div>
                  </>
                )}

                {showTradeModal === 'transfer' && (
                  <>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Recipient Wallet Address</label>
                      <input
                        type="text" required value={cryptoTransferAddress} onChange={(e) => setCryptoTransferAddress(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-[#11141D] border border-slate-200 dark:border-white/5 rounded-[16px] text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#234CFF]"
                        placeholder="e.g. 0x71C...3A99"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Amount Crypto</label>
                      <input
                        type="number" required min="0.0001" step="any" value={cryptoAmount} onChange={(e) => setCryptoAmount(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-[#11141D] border border-slate-200 dark:border-white/5 rounded-[16px] text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#234CFF]"
                        placeholder={`Amount in ${selectedAsset}`}
                      />
                    </div>
                  </>
                )}

                <div className="flex space-x-3 pt-2">
                  <button type="button" onClick={() => setShowTradeModal(null)} className="flex-1 py-3 text-xs font-bold rounded-[16px] border border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-all">{t.cancel}</button>
                  <button type="submit" disabled={isTrading} className="flex-1 py-3 text-xs font-bold rounded-[16px] bg-[#00D26A] text-white hover:opacity-90 disabled:opacity-50 transition-all flex justify-center items-center">
                    {isTrading ? <div className="w-4 h-4 border-2 border-white border-t-transparent animate-spin rounded-full" /> : <span>{t.confirm}</span>}
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

// Helper segment check
function hasSegment(balance: number): boolean {
  return balance > 0;
}
