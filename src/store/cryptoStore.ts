import { create } from 'zustand';
import { CryptoAsset, CurrencyType, Transaction } from '../types';
import { mockCryptoAssets } from '../mock/data';
import { useWalletStore } from './walletStore';

interface CryptoState {
  cryptoAssets: CryptoAsset[];
  
  // Actions
  buyCrypto: (symbol: CurrencyType, fiatAmount: number, fiatCurrency: 'UAH' | 'USD' | 'EUR') => Promise<boolean>;
  sellCrypto: (symbol: CurrencyType, cryptoAmount: number, fiatCurrency: 'UAH' | 'USD' | 'EUR') => Promise<boolean>;
  swapCrypto: (fromSymbol: CurrencyType, toSymbol: CurrencyType, amount: number) => Promise<boolean>;
  transferCrypto: (symbol: CurrencyType, amount: number, walletAddress: string) => Promise<boolean>;
  updatePrices: () => void;
}

export const useCryptoStore = create<CryptoState>((set, get) => {
  return {
    cryptoAssets: [...mockCryptoAssets],

    buyCrypto: async (symbol, fiatAmount, fiatCurrency) => {
      await new Promise((r) => setTimeout(r, 800));
      const { cryptoAssets } = get();
      const cryptoIndex = cryptoAssets.findIndex(c => c.symbol === symbol);
      if (cryptoIndex === -1) return false;

      const cryptoAsset = cryptoAssets[cryptoIndex];
      const walletStore = useWalletStore.getState();

      // Find fiat account
      const fiatAccount = walletStore.accounts.find(a => a.currency === fiatCurrency);
      if (!fiatAccount || fiatAccount.balance < fiatAmount) return false;

      // Calculate how much crypto is bought
      const cryptoToBuy = fiatAmount / (cryptoAsset.price * (fiatCurrency === 'UAH' ? 41 : fiatCurrency === 'EUR' ? 0.92 : 1));

      // Update fiat balance
      const updatedAccounts = walletStore.accounts.map(a => {
        if (a.currency === fiatCurrency) {
          return { ...a, balance: a.balance - fiatAmount };
        }
        return a;
      });

      // Update crypto balance in wallet accounts as well
      const updatedAccountsWithCrypto = updatedAccounts.map(a => {
        if (a.currency === symbol) {
          return { ...a, balance: a.balance + cryptoToBuy };
        }
        return a;
      });

      // Update card balance
      const updatedCards = walletStore.cards.map(c => {
        if (c.currency === fiatCurrency) {
          return { ...c, balance: c.balance - fiatAmount };
        }
        return c;
      });

      // Update crypto asset portfolio
      const updatedCryptoAssets = [...cryptoAssets];
      updatedCryptoAssets[cryptoIndex] = {
        ...cryptoAsset,
        balance: cryptoAsset.balance + cryptoToBuy,
        valueUsd: (cryptoAsset.balance + cryptoToBuy) * cryptoAsset.price
      };

      // Add transaction
      const newTx: Transaction = {
        id: `tx-${Date.now()}`,
        type: 'crypto_buy',
        title: `Купівля ${symbol}`,
        category: 'Крипто',
        amount: cryptoToBuy,
        currency: symbol,
        date: 'Щойно',
        status: 'completed',
        description: `Списано ${fiatAmount.toFixed(2)} ${fiatCurrency}`
      };

      // Apply to both stores
      useWalletStore.setState({
        accounts: updatedAccountsWithCrypto,
        cards: updatedCards,
        transactions: [newTx, ...walletStore.transactions]
      });

      set({ cryptoAssets: updatedCryptoAssets });
      return true;
    },

    sellCrypto: async (symbol, cryptoAmount, fiatCurrency) => {
      await new Promise((r) => setTimeout(r, 800));
      const { cryptoAssets } = get();
      const cryptoIndex = cryptoAssets.findIndex(c => c.symbol === symbol);
      if (cryptoIndex === -1) return false;

      const cryptoAsset = cryptoAssets[cryptoIndex];
      if (cryptoAsset.balance < cryptoAmount) return false;

      const walletStore = useWalletStore.getState();

      // Convert crypto to fiat
      const rate = cryptoAsset.price * (fiatCurrency === 'UAH' ? 41 : fiatCurrency === 'EUR' ? 0.92 : 1);
      const fiatReceived = cryptoAmount * rate;

      // Update fiat and crypto balances in wallet accounts
      const updatedAccounts = walletStore.accounts.map(a => {
        if (a.currency === fiatCurrency) {
          return { ...a, balance: a.balance + fiatReceived };
        }
        if (a.currency === symbol) {
          return { ...a, balance: a.balance - cryptoAmount };
        }
        return a;
      });

      // Update card balance for fiat
      const updatedCards = walletStore.cards.map(c => {
        if (c.currency === fiatCurrency) {
          return { ...c, balance: c.balance + fiatReceived };
        }
        return c;
      });

      // Update crypto asset portfolio
      const updatedCryptoAssets = [...cryptoAssets];
      updatedCryptoAssets[cryptoIndex] = {
        ...cryptoAsset,
        balance: cryptoAsset.balance - cryptoAmount,
        valueUsd: (cryptoAsset.balance - cryptoAmount) * cryptoAsset.price
      };

      // Add transaction
      const newTx: Transaction = {
        id: `tx-${Date.now()}`,
        type: 'crypto_sell',
        title: `Продаж ${symbol}`,
        category: 'Крипто',
        amount: cryptoAmount,
        currency: symbol,
        date: 'Щойно',
        status: 'completed',
        description: `Отримано ${fiatReceived.toFixed(2)} ${fiatCurrency}`
      };

      // Apply to both stores
      useWalletStore.setState({
        accounts: updatedAccounts,
        cards: updatedCards,
        transactions: [newTx, ...walletStore.transactions]
      });

      set({ cryptoAssets: updatedCryptoAssets });
      return true;
    },

    swapCrypto: async (fromSymbol, toSymbol, amount) => {
      await new Promise((r) => setTimeout(r, 800));
      const { cryptoAssets } = get();
      
      const fromIndex = cryptoAssets.findIndex(c => c.symbol === fromSymbol);
      const toIndex = cryptoAssets.findIndex(c => c.symbol === toSymbol);
      if (fromIndex === -1 || toIndex === -1) return false;

      const fromAsset = cryptoAssets[fromIndex];
      const toAsset = cryptoAssets[toIndex];
      if (fromAsset.balance < amount) return false;

      const walletStore = useWalletStore.getState();

      // Swap calculations based on USD price
      const usdValue = amount * fromAsset.price;
      const receivedAmount = usdValue / toAsset.price;

      // Update wallet accounts
      const updatedAccounts = walletStore.accounts.map(a => {
        if (a.currency === fromSymbol) {
          return { ...a, balance: a.balance - amount };
        }
        if (a.currency === toSymbol) {
          return { ...a, balance: a.balance + receivedAmount };
        }
        return a;
      });

      // Update crypto asset portfolio
      const updatedCryptoAssets = [...cryptoAssets];
      updatedCryptoAssets[fromIndex] = {
        ...fromAsset,
        balance: fromAsset.balance - amount,
        valueUsd: (fromAsset.balance - amount) * fromAsset.price
      };
      updatedCryptoAssets[toIndex] = {
        ...toAsset,
        balance: toAsset.balance + receivedAmount,
        valueUsd: (toAsset.balance + receivedAmount) * toAsset.price
      };

      // Transaction logs
      const newTx: Transaction = {
        id: `tx-${Date.now()}`,
        type: 'exchange',
        title: `${fromSymbol} → ${toSymbol}`,
        category: 'Криптосвоп',
        amount: receivedAmount,
        currency: toSymbol,
        date: 'Щойно',
        status: 'completed',
        description: `Обміняно ${amount} ${fromSymbol}`
      };

      useWalletStore.setState({
        accounts: updatedAccounts,
        transactions: [newTx, ...walletStore.transactions]
      });

      set({ cryptoAssets: updatedCryptoAssets });
      return true;
    },

    transferCrypto: async (symbol, amount, walletAddress) => {
      await new Promise((r) => setTimeout(r, 800));
      const { cryptoAssets } = get();
      
      const cryptoIndex = cryptoAssets.findIndex(c => c.symbol === symbol);
      if (cryptoIndex === -1) return false;

      const cryptoAsset = cryptoAssets[cryptoIndex];
      if (cryptoAsset.balance < amount) return false;

      const walletStore = useWalletStore.getState();

      // Update wallet accounts
      const updatedAccounts = walletStore.accounts.map(a => {
        if (a.currency === symbol) {
          return { ...a, balance: a.balance - amount };
        }
        return a;
      });

      // Update portfolio
      const updatedCryptoAssets = [...cryptoAssets];
      updatedCryptoAssets[cryptoIndex] = {
        ...cryptoAsset,
        balance: cryptoAsset.balance - amount,
        valueUsd: (cryptoAsset.balance - amount) * cryptoAsset.price
      };

      // Add transaction
      const newTx: Transaction = {
        id: `tx-${Date.now()}`,
        type: 'transfer',
        title: `Виведення ${symbol}`,
        category: 'Крипто',
        amount,
        currency: symbol,
        date: 'Щойно',
        status: 'completed',
        description: `Адреса: ${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}`
      };

      useWalletStore.setState({
        accounts: updatedAccounts,
        transactions: [newTx, ...walletStore.transactions]
      });

      set({ cryptoAssets: updatedCryptoAssets });
      return true;
    },

    updatePrices: () => {
      // Simulate real-time price changes
      set((state) => {
        const updated = state.cryptoAssets.map(c => {
          if (c.symbol === 'USDT' || c.symbol === 'USDC') return c;
          const pct = (Math.random() - 0.49) * 0.5; // slight upward drift
          const nextPrice = c.price * (1 + pct / 100);
          const nextChange = c.change24h + pct;
          const nextSparkline = [...c.sparkline.slice(1), nextPrice];
          return {
            ...c,
            price: Number(nextPrice.toFixed(2)),
            change24h: Number(nextChange.toFixed(2)),
            valueUsd: Number((c.balance * nextPrice).toFixed(2)),
            sparkline: nextSparkline
          };
        });
        return { cryptoAssets: updated };
      });
    }
  };
});
