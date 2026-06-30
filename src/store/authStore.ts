import { create } from 'zustand';
import { User, AppLanguage, AppCurrency } from '../types';
import { mockUser } from '../mock/data';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  language: AppLanguage;
  currency: AppCurrency;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  setLanguage: (lang: AppLanguage) => void;
  setCurrency: (curr: AppCurrency) => void;
  toggleFop: () => void;
  updateProfile: (name: string, phone: string, email: string) => void;
}

export const useAuthStore = create<AuthState>((set) => {
  // Initialize state from localStorage
  const savedAuth = localStorage.getItem('scarb-auth');
  const savedUser = localStorage.getItem('scarb-user');
  const savedLang = localStorage.getItem('scarb-lang') as AppLanguage || 'uk';
  const savedCurr = localStorage.getItem('scarb-curr') as AppCurrency || 'UAH';

  let parsedUser = savedUser ? JSON.parse(savedUser) : null;
  if (parsedUser) {
    parsedUser.avatar = mockUser.avatar;
  }

  return {
    isAuthenticated: savedAuth === 'true',
    user: parsedUser,
    language: savedLang,
    currency: savedCurr,
    
    login: async (username, password) => {
      // Simulate API promise delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      if (username === 'jora228' && (password === 'jora228' || password === '123456')) {
        const user = { ...mockUser };
        localStorage.setItem('scarb-auth', 'true');
        localStorage.setItem('scarb-user', JSON.stringify(user));
        set({ isAuthenticated: true, user });
        return true;
      }
      return false;
    },
    
    logout: () => {
      localStorage.removeItem('scarb-auth');
      localStorage.removeItem('scarb-user');
      set({ isAuthenticated: false, user: null });
    },
    
    setLanguage: (lang) => {
      localStorage.setItem('scarb-lang', lang);
      set({ language: lang });
    },
    
    setCurrency: (curr) => {
      localStorage.setItem('scarb-curr', curr);
      set({ currency: curr });
    },

    toggleFop: () => set((state) => {
      if (!state.user) return {};
      const updatedUser = { ...state.user, isFop: !state.user.isFop };
      localStorage.setItem('scarb-user', JSON.stringify(updatedUser));
      return { user: updatedUser };
    }),

    updateProfile: (name, phone, email) => set((state) => {
      if (!state.user) return {};
      const updatedUser = { ...state.user, name, phone, email };
      localStorage.setItem('scarb-user', JSON.stringify(updatedUser));
      return { user: updatedUser };
    })
  };
});
