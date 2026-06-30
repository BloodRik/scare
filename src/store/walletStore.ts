import { create } from 'zustand';
import { WalletAccount, CreditCard, Transaction, CurrencyType } from '../types';
import { mockAccounts, mockCards, mockTransactions } from '../mock/data';

interface WalletState {
  accounts: WalletAccount[];
  cards: CreditCard[];
  transactions: Transaction[];
  
  // Actions
  deposit: (accountId: string, amount: number, cardId?: string) => Promise<boolean>;
  transferP2P: (params: {
    recipientName: string;
    cardNumber?: string;
    phoneNumber?: string;
    username?: string;
    amount: number;
    currency: CurrencyType;
    comment?: string;
  }) => Promise<boolean>;
  transferInternational: (params: {
    country: string;
    recipientName: string;
    iban: string;
    swift: string;
    amount: number;
    currency: CurrencyType;
    fee: number;
  }) => Promise<boolean>;
  payService: (params: {
    serviceName: string;
    category: string;
    amount: number;
    currency: CurrencyType;
    accountNumber: string;
  }) => Promise<boolean>;
  
  // Card management
  freezeCard: (cardId: string) => void;
  unfreezeCard: (cardId: string) => void;
  updateCardLimit: (cardId: string, limit: number) => void;
  updateCardPin: (cardId: string, pin: string) => void;
  addVirtualCard: (type: 'visa' | 'mastercard', currency: CurrencyType, colorTheme: 'black' | 'blue' | 'gradient') => void;
  addAccount: (currency: CurrencyType, name: string) => void;
}

export const useWalletStore = create<WalletState>((set, get) => {
  return {
    accounts: [...mockAccounts],
    cards: [...mockCards],
    transactions: [...mockTransactions],

    deposit: async (accountId, amount) => {
      await new Promise((r) => setTimeout(r, 600));
      
      const { accounts, transactions } = get();
      const accountIndex = accounts.findIndex(a => a.id === accountId);
      if (accountIndex === -1) return false;

      const updatedAccounts = [...accounts];
      updatedAccounts[accountIndex] = {
        ...updatedAccounts[accountIndex],
        balance: updatedAccounts[accountIndex].balance + amount
      };

      // Also if there's a card associated with this currency, update its balance
      const currency = updatedAccounts[accountIndex].currency;
      const updatedCards = get().cards.map(c => {
        if (c.currency === currency) {
          return { ...c, balance: c.balance + amount };
        }
        return c;
      });

      const newTx: Transaction = {
        id: `tx-${Date.now()}`,
        type: 'income',
        title: 'Поповнення рахунку',
        category: 'Поповнення',
        amount,
        currency,
        date: 'Щойно',
        status: 'completed'
      };

      set({
        accounts: updatedAccounts,
        cards: updatedCards,
        transactions: [newTx, ...transactions]
      });
      return true;
    },

    transferP2P: async ({ recipientName, cardNumber, phoneNumber, username, amount, currency, comment }) => {
      await new Promise((r) => setTimeout(r, 800));
      const { accounts, transactions, cards } = get();
      
      // Find account
      const account = accounts.find(a => a.currency === currency);
      if (!account || account.balance < amount) return false;

      // Update account balance
      const updatedAccounts = accounts.map(a => {
        if (a.id === account.id) {
          return { ...a, balance: a.balance - amount };
        }
        return a;
      });

      // Update card balance if applicable
      const updatedCards = cards.map(c => {
        if (c.currency === currency) {
          return { ...c, balance: c.balance - amount };
        }
        return c;
      });

      const description = [
        cardNumber ? `Карта: ${cardNumber}` : null,
        phoneNumber ? `Тел: ${phoneNumber}` : null,
        username ? `Логін: @${username}` : null,
        comment ? `"${comment}"` : null
      ].filter(Boolean).join(', ');

      const newTx: Transaction = {
        id: `tx-${Date.now()}`,
        type: 'transfer',
        title: `Переказ: ${recipientName}`,
        category: 'P2P переказ',
        amount,
        currency,
        date: 'Щойно',
        status: 'completed',
        recipientName,
        description
      };

      set({
        accounts: updatedAccounts,
        cards: updatedCards,
        transactions: [newTx, ...transactions]
      });
      return true;
    },

    transferInternational: async ({ country, recipientName, iban, swift, amount, currency, fee }) => {
      await new Promise((r) => setTimeout(r, 1000));
      const { accounts, transactions, cards } = get();
      
      const account = accounts.find(a => a.currency === currency);
      const totalCost = amount + fee;
      if (!account || account.balance < totalCost) return false;

      const updatedAccounts = accounts.map(a => {
        if (a.id === account.id) {
          return { ...a, balance: a.balance - totalCost };
        }
        return a;
      });

      const updatedCards = cards.map(c => {
        if (c.currency === currency) {
          return { ...c, balance: c.balance - totalCost };
        }
        return c;
      });

      const newTx: Transaction = {
        id: `tx-${Date.now()}`,
        type: 'transfer',
        title: `SWIFT: ${recipientName}`,
        category: 'Міжнародні перекази',
        amount,
        currency,
        date: 'Щойно',
        status: 'completed',
        recipientName,
        description: `Країна: ${country}, IBAN: ${iban}, SWIFT: ${swift}`,
        fee
      };

      set({
        accounts: updatedAccounts,
        cards: updatedCards,
        transactions: [newTx, ...transactions]
      });
      return true;
    },

    payService: async ({ serviceName, category, amount, currency, accountNumber }) => {
      await new Promise((r) => setTimeout(r, 700));
      const { accounts, transactions, cards } = get();

      const account = accounts.find(a => a.currency === currency);
      if (!account || account.balance < amount) return false;

      const updatedAccounts = accounts.map(a => {
        if (a.id === account.id) {
          return { ...a, balance: a.balance - amount };
        }
        return a;
      });

      const updatedCards = cards.map(c => {
        if (c.currency === currency) {
          return { ...c, balance: c.balance - amount };
        }
        return c;
      });

      const newTx: Transaction = {
        id: `tx-${Date.now()}`,
        type: 'expense',
        title: serviceName,
        category,
        amount,
        currency,
        date: 'Щойно',
        status: 'completed',
        description: `Рахунок: ${accountNumber}`
      };

      set({
        accounts: updatedAccounts,
        cards: updatedCards,
        transactions: [newTx, ...transactions]
      });
      return true;
    },

    freezeCard: (cardId) => {
      const updatedCards = get().cards.map(c => {
        if (c.id === cardId) {
          return { ...c, status: 'frozen' as const };
        }
        return c;
      });
      set({ cards: updatedCards });
    },

    unfreezeCard: (cardId) => {
      const updatedCards = get().cards.map(c => {
        if (c.id === cardId) {
          return { ...c, status: 'active' as const };
        }
        return c;
      });
      set({ cards: updatedCards });
    },

    updateCardLimit: (cardId, limit) => {
      const updatedCards = get().cards.map(c => {
        if (c.id === cardId) {
          return { ...c, limit };
        }
        return c;
      });
      set({ cards: updatedCards });
    },

    updateCardPin: (cardId, pin) => {
      const updatedCards = get().cards.map(c => {
        if (c.id === cardId) {
          return { ...c, pin };
        }
        return c;
      });
      set({ cards: updatedCards });
    },

    addVirtualCard: (type, currency, colorTheme) => {
      const { cards, accounts } = get();
      const account = accounts.find(a => a.currency === currency);
      const cardBalance = account ? account.balance : 0;
      
      const randomDigits = Math.floor(1000 + Math.random() * 9000);
      const newCard: CreditCard = {
        id: `card-${Date.now()}`,
        type,
        cardholderName: 'IVAN PETRENKO',
        number: `•••• •••• •••• ${randomDigits}`,
        expiry: '10/31',
        cvv: Math.floor(100 + Math.random() * 900).toString(),
        pin: '0000',
        status: 'active',
        balance: cardBalance,
        currency,
        limit: 10000,
        isVirtual: true,
        colorTheme
      };

      set({ cards: [...cards, newCard] });
    },

    addAccount: (currency, name) => {
      const { accounts } = get();
      if (accounts.some(a => a.currency === currency)) return; // Already exists

      const symbolMap: Record<string, string> = {
        UAH: '₴', USD: '$', EUR: '€', USDT: '₮', BTC: '₿', ETH: 'Ξ', USDC: '$', SOL: 'SOL', TON: 'TON', BNB: 'BNB'
      };

      const isCrypto = ['USDT', 'BTC', 'ETH', 'USDC', 'SOL', 'TON', 'BNB'].includes(currency);
      const newAcc: WalletAccount = {
        id: `acc-${currency.toLowerCase()}`,
        currency,
        type: isCrypto ? 'crypto' : 'fiat',
        balance: 0,
        symbol: symbolMap[currency] || '$',
        name
      };

      set({ accounts: [...accounts, newAcc] });
    }
  };
});
