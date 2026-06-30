export type CurrencyType = 'UAH' | 'USD' | 'EUR' | 'USDT' | 'BTC' | 'ETH' | 'USDC' | 'SOL' | 'TON' | 'BNB';

export interface User {
  username: string;
  name: string;
  avatar: string;
  phone: string;
  email: string;
  isFop: boolean;
  businessName?: string;
}

export interface Transaction {
  id: string;
  type: 'income' | 'expense' | 'transfer' | 'crypto_buy' | 'crypto_sell' | 'exchange';
  title: string;
  category: string;
  amount: number;
  currency: CurrencyType;
  date: string; // ISO string or human-readable
  status: 'completed' | 'pending' | 'failed';
  avatar?: string;
  recipientName?: string;
  senderName?: string;
  description?: string;
  fee?: number;
}

export interface WalletAccount {
  id: string;
  currency: CurrencyType;
  type: 'fiat' | 'crypto';
  balance: number;
  symbol: string;
  name: string;
}

export interface CryptoAsset {
  id: string;
  symbol: CurrencyType;
  name: string;
  price: number;
  change24h: number; // percentage (e.g. +2.45 or -1.2)
  balance: number;
  valueUsd: number;
  sparkline: number[];
}

export interface CreditCard {
  id: string;
  type: 'visa' | 'mastercard';
  cardholderName: string;
  number: string;
  expiry: string;
  cvv: string;
  pin: string;
  status: 'active' | 'frozen';
  balance: number;
  currency: CurrencyType;
  limit: number;
  isVirtual: boolean;
  colorTheme: 'black' | 'blue' | 'gradient';
}

export interface AppNotification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  body: string;
  time: string;
  read: boolean;
}

export type AppLanguage = 'uk' | 'en';
export type AppCurrency = 'UAH' | 'USD' | 'EUR';
