import { WalletAccount, CryptoAsset, CreditCard, Transaction, AppNotification } from '../types';
import userJpg from '../../user.jpg';

export const mockUser = {
  username: "jora228",
  name: "Эрибас Петренко",
  avatar: userJpg, // Imported user.jpg
  phone: "+380 97 123 45 67",
  email: "ivan.petrenko@scarb.ua",
  isFop: true,
  businessName: "ФОП Петренко І.В."
};

export const mockAccounts: WalletAccount[] = [
  { id: 'acc-uah', currency: 'UAH', type: 'fiat', balance: 24560.00, symbol: '₴', name: 'Гривневий рахунок' },
  { id: 'acc-usd', currency: 'USD', type: 'fiat', balance: 2500.00, symbol: '$', name: 'Доларовий рахунок' },
  { id: 'acc-eur', currency: 'EUR', type: 'fiat', balance: 1200.00, symbol: '€', name: 'Євро рахунок' },
  { id: 'acc-usdt', currency: 'USDT', type: 'crypto', balance: 1250.00, symbol: '₮', name: 'Tether USDT' },
  { id: 'acc-btc', currency: 'BTC', type: 'crypto', balance: 0.025, symbol: '₿', name: 'Bitcoin' },
  { id: 'acc-eth', currency: 'ETH', type: 'crypto', balance: 1.5, symbol: 'Ξ', name: 'Ethereum' }
];

export const mockCryptoAssets: CryptoAsset[] = [
  { id: 'cry-usdt', symbol: 'USDT', name: 'Tether USD', price: 1.00, change24h: 0.01, balance: 1250.00, valueUsd: 1250.00, sparkline: [1, 1, 0.99, 1, 1, 1, 1] },
  { id: 'cry-btc', symbol: 'BTC', name: 'Bitcoin', price: 64250.00, change24h: 2.45, balance: 0.025, valueUsd: 1606.25, sparkline: [62100, 62800, 63400, 63100, 63900, 64100, 64250] },
  { id: 'cry-eth', symbol: 'ETH', name: 'Ethereum', price: 3450.00, change24h: -1.20, balance: 1.5, valueUsd: 5175.00, sparkline: [3560, 3520, 3490, 3460, 3480, 3430, 3450] },
  { id: 'cry-usdc', symbol: 'USDC', name: 'USD Coin', price: 1.00, change24h: 0.02, balance: 150.00, valueUsd: 150.00, sparkline: [1, 1, 1, 1, 1, 1, 1] },
  { id: 'cry-sol', symbol: 'SOL', name: 'Solana', price: 142.80, change24h: 5.72, balance: 0.00, valueUsd: 0.00, sparkline: [131, 134, 133, 138, 140, 139, 142.8] },
  { id: 'cry-ton', symbol: 'TON', name: 'Toncoin', price: 7.35, change24h: 8.12, balance: 0.00, valueUsd: 0.00, sparkline: [6.6, 6.8, 6.9, 7.1, 7.0, 7.2, 7.35] },
  { id: 'cry-bnb', symbol: 'BNB', name: 'BNB Chain', price: 580.40, change24h: -0.45, balance: 0.00, valueUsd: 0.00, sparkline: [589, 582, 581, 585, 579, 582, 580.4] }
];

export const mockCards: CreditCard[] = [
  {
    id: 'card-1',
    type: 'visa',
    cardholderName: 'IVAN PETRENKO',
    number: '•••• •••• •••• 5678',
    expiry: '12/30',
    cvv: '123',
    pin: '1111',
    status: 'active',
    balance: 24560.00,
    currency: 'UAH',
    limit: 50000,
    isVirtual: false,
    colorTheme: 'black'
  },
  {
    id: 'card-2',
    type: 'mastercard',
    cardholderName: 'IVAN PETRENKO',
    number: '•••• •••• •••• 9912',
    expiry: '06/29',
    cvv: '456',
    pin: '2222',
    status: 'active',
    balance: 2500.00,
    currency: 'USD',
    limit: 10000,
    isVirtual: true,
    colorTheme: 'gradient'
  },
  {
    id: 'card-3',
    type: 'visa',
    cardholderName: 'IVAN PETRENKO',
    number: '•••• •••• •••• 7744',
    expiry: '09/31',
    cvv: '889',
    pin: '3333',
    status: 'frozen',
    balance: 1200.00,
    currency: 'EUR',
    limit: 5000,
    isVirtual: true,
    colorTheme: 'blue'
  }
];

export const mockNotifications: AppNotification[] = [
  { id: 'nt-1', type: 'success', title: 'Отримано P2P переказ', body: 'Эрибас Петренко надіслав вам +1 200.00 ₴', time: 'Сьогодні, 11:30', read: false },
  { id: 'nt-2', type: 'info', title: 'Обмін валюти', body: 'Ви успішно обміняли USDT на UAH на суму +2 300.00 ₴', time: 'Вчора, 16:20', read: false },
  { id: 'nt-3', type: 'warning', title: 'Оплата комунальних послуг', body: 'Знято -620.00 ₴ за Київенерго', time: 'Вчора, 18:40', read: true },
  { id: 'nt-4', type: 'success', title: 'Нарахування відсотків', body: 'Ваш крипто-портфель зріс на +2.45% за останню добу', time: '28 Червня, 12:00', read: true },
  { id: 'nt-5', type: 'error', title: 'Спроба входу', body: 'Зафіксовано вхід у систему з нового пристрою', time: '25 Червня, 09:15', read: true }
];

export const mockTransactions: Transaction[] = [
  { id: 'tx-1', type: 'income', title: 'Від: Эрибас Петренко', category: 'P2P переказ', amount: 1200.00, currency: 'UAH', date: 'Сьогодні, 11:30', status: 'completed', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80', senderName: 'Эрибас Петренко' },
  { id: 'tx-2', type: 'expense', title: 'Rozetka', category: 'Покупка', amount: 850.00, currency: 'UAH', date: 'Сьогодні, 10:15', status: 'completed' },
  { id: 'tx-3', type: 'expense', title: 'Київенерго', category: 'Комунальні послуги', amount: 620.00, currency: 'UAH', date: 'Вчора, 18:40', status: 'completed' },
  { id: 'tx-4', type: 'exchange', title: 'USDT → UAH', category: 'Обмін криптовалюти', amount: 2300.00, currency: 'UAH', date: 'Вчора, 16:20', status: 'completed' },
  { id: 'tx-5', type: 'expense', title: 'Сільпо', category: 'Супермаркети', amount: 450.50, currency: 'UAH', date: 'Вчора, 14:10', status: 'completed' },
  { id: 'tx-6', type: 'income', title: 'Зарахування ФОП', category: 'Бізнес', amount: 48000.00, currency: 'UAH', date: '28 Червня, 15:00', status: 'completed' },
  { id: 'tx-7', type: 'expense', title: 'WOG', category: 'Транспорт', amount: 1200.00, currency: 'UAH', date: '28 Червня, 11:20', status: 'completed' },
  { id: 'tx-8', type: 'expense', title: 'Netflix', category: 'Підписки', amount: 399.00, currency: 'UAH', date: '27 Червня, 08:00', status: 'completed' },
  { id: 'tx-9', type: 'crypto_buy', title: 'Купівля BTC', category: 'Крипто', amount: 0.001, currency: 'BTC', date: '26 Червня, 17:45', status: 'completed' },
  { id: 'tx-10', type: 'expense', title: 'Kyivstar', category: 'Мобільний зв\'язок', amount: 175.00, currency: 'UAH', date: '26 Червня, 09:30', status: 'completed' },
  { id: 'tx-11', type: 'income', title: 'Від: Сергій Коваленко', category: 'P2P переказ', amount: 500.00, currency: 'UAH', date: '25 Червня, 20:10', status: 'completed', senderName: 'Сергій Коваленко' },
  { id: 'tx-12', type: 'expense', title: 'McDonald\'s', category: 'Ресторани', amount: 320.00, currency: 'UAH', date: '25 Червня, 13:15', status: 'completed' },
  { id: 'tx-13', type: 'expense', title: 'Uber', category: 'Транспорт', amount: 180.00, currency: 'UAH', date: '24 Червня, 22:40', status: 'completed' },
  { id: 'tx-14', type: 'income', title: 'Дивіденди', category: 'Інвестиції', amount: 50.00, currency: 'USD', date: '24 Червня, 12:00', status: 'completed' },
  { id: 'tx-15', type: 'expense', title: 'Податок ФОП', category: 'Податки', amount: 1620.00, currency: 'UAH', date: '23 Червня, 10:00', status: 'completed' },
  { id: 'tx-16', type: 'exchange', title: 'UAH → EUR', category: 'Обмін валюти', amount: 100.00, currency: 'EUR', date: '22 Червня, 15:30', status: 'completed' },
  { id: 'tx-17', type: 'expense', title: 'Steam Games', category: 'Розваги', amount: 599.00, currency: 'UAH', date: '21 Червня, 19:45', status: 'completed' },
  { id: 'tx-18', type: 'expense', title: 'Bolt Food', category: 'Ресторани', amount: 430.00, currency: 'UAH', date: '21 Червня, 14:00', status: 'completed' },
  { id: 'tx-19', type: 'income', title: 'Продаж ETH', category: 'Крипто', amount: 0.15, currency: 'ETH', date: '20 Червня, 11:15', status: 'completed' },
  { id: 'tx-20', type: 'expense', title: 'SportLife', category: 'Спорт', amount: 1500.00, currency: 'UAH', date: '19 Червня, 09:00', status: 'completed' },
  { id: 'tx-21', type: 'expense', title: 'Ашан', category: 'Супермаркети', amount: 1120.40, currency: 'UAH', date: '18 Червня, 18:30', status: 'completed' },
  { id: 'tx-22', type: 'income', title: 'Від: Ганна Петрівна', category: 'P2P переказ', amount: 3000.00, currency: 'UAH', date: '18 Червня, 12:40', status: 'completed', senderName: 'Ганна Петрівна' },
  { id: 'tx-23', type: 'expense', title: 'Megogo', category: 'Підписки', amount: 199.00, currency: 'UAH', date: '17 Червня, 08:30', status: 'completed' },
  { id: 'tx-24', type: 'expense', title: 'Нова Пошта', category: 'Послуги', amount: 85.00, currency: 'UAH', date: '16 Червня, 16:15', status: 'completed' },
  { id: 'tx-25', type: 'income', title: 'Кешбек', category: 'Бонуси', amount: 245.00, currency: 'UAH', date: '16 Червня, 10:00', status: 'completed' },
  { id: 'tx-26', type: 'expense', title: 'Intertop', category: 'Одяг та взуття', amount: 2600.00, currency: 'UAH', date: '15 Червня, 14:30', status: 'completed' },
  { id: 'tx-27', type: 'expense', title: 'ПриватБанк', category: 'Штрафи', amount: 340.00, currency: 'UAH', date: '14 Червня, 11:20', status: 'completed' },
  { id: 'tx-28', type: 'crypto_buy', title: 'Купівля USDT', category: 'Крипто', amount: 200.00, currency: 'USDT', date: '13 Червня, 22:10', status: 'completed' },
  { id: 'tx-29', type: 'expense', title: 'Окко', category: 'Транспорт', amount: 1500.00, currency: 'UAH', date: '13 Червня, 08:15', status: 'completed' },
  { id: 'tx-30', type: 'income', title: 'Зарахування ФОП', category: 'Бізнес', amount: 35000.00, currency: 'UAH', date: '12 Червня, 16:00', status: 'completed' },
  { id: 'tx-31', type: 'expense', title: 'Епіцентр', category: 'Будівництво', amount: 3450.00, currency: 'UAH', date: '11 Червня, 13:40', status: 'completed' },
  { id: 'tx-32', type: 'expense', title: 'App Store', category: 'Покупки', amount: 12.00, currency: 'USD', date: '10 Червня, 09:10', status: 'completed' },
  { id: 'tx-33', type: 'income', title: 'Від: Дмитро Лисенко', category: 'P2P переказ', amount: 1500.00, currency: 'UAH', date: '09 Червня, 19:30', status: 'completed', senderName: 'Дмитро Лисенко' },
  { id: 'tx-34', type: 'expense', title: 'Київстар Інтернет', category: 'Інтернет', amount: 220.00, currency: 'UAH', date: '09 Червня, 10:15', status: 'completed' },
  { id: 'tx-35', type: 'expense', title: 'Sushi Master', category: 'Ресторани', amount: 890.00, currency: 'UAH', date: '08 Червня, 21:00', status: 'completed' },
  { id: 'tx-36', type: 'crypto_buy', title: 'Купівля SOL', category: 'Крипто', amount: 10.00, currency: 'USDT', date: '07 Червня, 14:25', status: 'completed' },
  { id: 'tx-37', type: 'expense', title: 'Comfy', category: 'Техніка', amount: 4999.00, currency: 'UAH', date: '06 Червня, 12:30', status: 'completed' },
  { id: 'tx-38', type: 'expense', title: 'Uber', category: 'Транспорт', amount: 240.00, currency: 'UAH', date: '05 Червня, 23:45', status: 'completed' },
  { id: 'tx-39', type: 'income', title: 'Від: Марія Іванова', category: 'P2P переказ', amount: 800.00, currency: 'UAH', date: '05 Червня, 15:10', status: 'completed', senderName: 'Марія Іванова' },
  { id: 'tx-40', type: 'expense', title: 'Сільпо', category: 'Супермаркети', amount: 670.30, currency: 'UAH', date: '04 Червня, 19:15', status: 'completed' },
  { id: 'tx-41', type: 'expense', title: 'Zara', category: 'Одяг та взуття', amount: 1800.00, currency: 'UAH', date: '03 Червня, 16:40', status: 'completed' },
  { id: 'tx-42', type: 'income', title: 'Зарахування ФОП', category: 'Бізнес', amount: 42000.00, currency: 'UAH', date: '02 Червня, 15:00', status: 'completed' },
  { id: 'tx-43', type: 'expense', title: 'Податкова', category: 'Податки', amount: 1620.00, currency: 'UAH', date: '02 Червня, 09:30', status: 'completed' },
  { id: 'tx-44', type: 'expense', title: 'Sweet.tv', category: 'Підписки', amount: 149.00, currency: 'UAH', date: '01 Червня, 08:00', status: 'completed' },
  { id: 'tx-45', type: 'income', title: 'Кешбек травень', category: 'Бонуси', amount: 380.00, currency: 'UAH', date: '01 Червня, 10:20', status: 'completed' },
  { id: 'tx-46', type: 'expense', title: 'WOG Cafe', category: 'Ресторани', amount: 180.00, currency: 'UAH', date: '31 Травня, 11:15', status: 'completed' },
  { id: 'tx-47', type: 'expense', title: 'Київгаз', category: 'Комунальні послуги', amount: 140.00, currency: 'UAH', date: '30 Травня, 17:40', status: 'completed' },
  { id: 'tx-48', type: 'crypto_buy', title: 'Купівля ETH', category: 'Крипто', amount: 0.5, currency: 'ETH', date: '29 Травня, 12:30', status: 'completed' },
  { id: 'tx-49', type: 'expense', title: 'Книгарня Є', category: 'Книги', amount: 420.00, currency: 'UAH', date: '28 Травня, 15:45', status: 'completed' },
  { id: 'tx-50', type: 'income', title: 'SWIFT від Wise', category: 'Міжнародні перекази', amount: 250.00, currency: 'EUR', date: '27 Травня, 14:00', status: 'completed' }
];

export const mockBalanceHistory = [
  { name: 'Січ', UAH: 18000, USD: 1500, EUR: 800 },
  { name: 'Лют', UAH: 22000, USD: 1700, EUR: 900 },
  { name: 'Бер', UAH: 20500, USD: 1600, EUR: 1100 },
  { name: 'Кві', UAH: 24000, USD: 2100, EUR: 1050 },
  { name: 'Тра', UAH: 23500, USD: 2300, EUR: 1200 },
  { name: 'Чер', UAH: 24560, USD: 2500, EUR: 1200 }
];

export const mockCryptoHistory = [
  { name: 'Пн', BTC: 61500, ETH: 3500, USDT: 1.00 },
  { name: 'Вт', BTC: 62200, ETH: 3530, USDT: 1.00 },
  { name: 'Ср', BTC: 62800, ETH: 3490, USDT: 1.00 },
  { name: 'Чт', BTC: 63400, ETH: 3450, USDT: 1.00 },
  { name: 'Пт', BTC: 63100, ETH: 3460, USDT: 1.00 },
  { name: 'Сб', BTC: 63900, ETH: 3480, USDT: 1.00 },
  { name: 'Нд', BTC: 64250, ETH: 3450, USDT: 1.00 }
];
