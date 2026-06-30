import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowUpRight, ArrowDownLeft, ShoppingBag, Flame, RefreshCw, 
  Smartphone, Wallet, DollarSign, Award, Percent, Hammer, HelpCircle, Briefcase, Mail
} from 'lucide-react';
import { Transaction } from '../types';

interface TransactionItemProps {
  tx: Transaction;
  language: 'uk' | 'en';
}

export const TransactionItem: React.FC<TransactionItemProps> = ({ tx, language }) => {
  const isIncome = tx.type === 'income' || tx.type === 'crypto_sell';

  // Choose correct icon
  const getCategoryIcon = () => {
    if (tx.avatar) {
      return (
        <img 
          src={tx.avatar} 
          alt={tx.title} 
          className="w-11 h-11 rounded-full object-cover border border-slate-200 dark:border-white/10"
          referrerPolicy="no-referrer"
        />
      );
    }

    const iconStyle = "w-5 h-5 text-slate-600 dark:text-slate-300";

    switch (tx.category) {
      case 'Покупка':
      case 'Покупки':
      case 'Shopping':
        return <ShoppingBag className={iconStyle} />;
      case 'Комунальні послуги':
      case 'Utilities':
        return <Flame className="w-5 h-5 text-[#FF9900]" />;
      case 'Обмін криптовалюти':
      case 'Крипто':
      case 'Криптосвоп':
      case 'Crypto':
        return <RefreshCw className="w-5 h-5 text-[#5A3FFF]" />;
      case 'Мобільний зв\'язок':
      case 'Мобільний':
      case 'Mobile':
      case 'Інтернет':
      case 'Internet':
        return <Smartphone className="w-5 h-5 text-[#234CFF]" />;
      case 'Бізнес':
      case 'Business':
        return <Briefcase className="w-5 h-5 text-[#00D26A]" />;
      case 'Бонуси':
      case 'Кешбек':
      case 'Cashback':
        return <Award className="w-5 h-5 text-[#FFC400]" />;
      case 'Податки':
      case 'Taxes':
        return <Hammer className={iconStyle} />;
      case 'P2P переказ':
      case 'P2P Transfer':
        return isIncome ? <ArrowDownLeft className="w-5 h-5 text-[#00D26A]" /> : <ArrowUpRight className="w-5 h-5 text-[#FF4D4F]" />;
      case 'Міжнародні перекази':
      case 'SWIFT':
        return <Wallet className="w-5 h-5 text-[#234CFF]" />;
      default:
        return <DollarSign className={iconStyle} />;
    }
  };

  const formatAmount = () => {
    let prefix = isIncome ? '+' : '-';
    let symbol = '';
    
    switch (tx.currency) {
      case 'UAH': symbol = '₴'; break;
      case 'USD': symbol = '$'; break;
      case 'EUR': symbol = '€'; break;
      case 'USDT': symbol = '₮'; break;
      case 'BTC': symbol = '₿'; break;
      case 'ETH': symbol = 'Ξ'; break;
      default: symbol = tx.currency;
    }

    // High precision for crypto, 2 decimals for fiat
    const decimalPlaces = ['BTC', 'ETH'].includes(tx.currency) ? 6 : 2;
    const formattedNum = tx.amount.toLocaleString(language === 'uk' ? 'uk-UA' : 'en-US', {
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces
    });

    return `${prefix} ${formattedNum} ${symbol}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ x: 3 }}
      transition={{ duration: 0.2 }}
      className="flex items-center justify-between p-3.5 rounded-[18px] bg-slate-50/50 dark:bg-[#1C2230]/40 border border-slate-100/50 dark:border-white/[0.02] hover:bg-slate-100/80 dark:hover:bg-[#1C2230]/70 transition-all mb-2"
      id={`transaction-item-${tx.id}`}
    >
      <div className="flex items-center space-x-3.5">
        {/* Rounded Container for Icon */}
        {!tx.avatar && (
          <div className="w-11 h-11 rounded-full flex items-center justify-center bg-slate-100 dark:bg-[#1E2533] border border-slate-200/40 dark:border-white/5">
            {getCategoryIcon()}
          </div>
        )}
        {tx.avatar && getCategoryIcon()}
        
        <div>
          <h4 className="font-sans font-medium text-sm text-slate-800 dark:text-slate-100 line-clamp-1">
            {tx.title}
          </h4>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 flex items-center">
            <span className="capitalize">{tx.category}</span>
            <span className="mx-1.5">•</span>
            <span>{tx.date}</span>
          </p>
        </div>
      </div>

      <div className="text-right">
        <span className={`font-sans font-semibold text-sm ${isIncome ? 'text-[#00D26A]' : 'text-slate-700 dark:text-slate-200'}`}>
          {formatAmount()}
        </span>
        {tx.status === 'pending' && (
          <span className="block text-[10px] text-amber-500 font-medium">Pending</span>
        )}
      </div>
    </motion.div>
  );
};
