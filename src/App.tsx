import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, Wallet as WalletIcon, Coins, Briefcase, User as UserIcon, Bell, Moon, Sun, X, Check, ShieldAlert, ArrowDownUp 
} from 'lucide-react';
import { useAuthStore } from './store/authStore';
import { useThemeStore } from './store/themeStore';
import { useNotificationStore } from './store/notificationStore';
import { translations } from './constants/translations';

// Import features
import { Welcome } from './features/Welcome';
import { Login } from './features/Login';
import { Dashboard } from './features/Dashboard';
import { Wallet } from './features/Wallet';
import { Crypto } from './features/Crypto';
import { Exchange } from './features/Exchange';
import { P2PTransfer } from './features/P2PTransfer';
import { InternationalTransfer } from './features/InternationalTransfer';
import { Payments } from './features/Payments';
import { Business } from './features/Business';
import { Profile } from './features/Profile';
import { Logo } from './components/Logo';

export default function App() {
  const { isAuthenticated, language, user } = useAuthStore();
  const { theme } = useThemeStore();
  const { notifications, unreadCount, toasts, removeToast, clearAllNotifications } = useNotificationStore();
  const t = translations[language];

  // Lifecycle States
  const [showSplash, setShowSplash] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  
  // Tab Routing
  const [activeTab, setActiveTab] = useState('home');
  const [showNotifHub, setShowNotifHub] = useState(false);

  // Scroll to top when tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any });
    const shell = document.getElementById('scarb-app-dashboard-shell');
    if (shell) {
      shell.scrollTop = 0;
    }
  }, [activeTab]);

  // Initialize theme Class on <html> element
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Splash timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleStartOnboarding = () => {
    setHasStarted(true);
  };

  // Render correct nested feature screen
  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return <Dashboard onNavigate={(tabId) => setActiveTab(tabId)} />;
      case 'wallet':
        return <Wallet />;
      case 'crypto':
        return <Crypto />;
      case 'exchange':
        return <Exchange />;
      case 'p2p':
        return <P2PTransfer />;
      case 'payments':
        return <Payments />;
      case 'swift':
        return <InternationalTransfer />;
      case 'business':
        return <Business />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard onNavigate={(tabId) => setActiveTab(tabId)} />;
    }
  };

  // Clear unread badge
  const toggleNotificationsHub = () => {
    setShowNotifHub(!showNotifHub);
    if (!showNotifHub) {
      useNotificationStore.getState().markAllAsRead();
    }
  };

  // Render Splash Screen
  if (showSplash) {
    return (
      <div className="fixed inset-0 z-[100] bg-[#0B0E14] flex flex-col items-center justify-center text-white" id="app-splash-screen">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex flex-col items-center"
        >
          <Logo size="xl" showText={true} />
          {/* Circular vector loading circle */}
          <div className="w-6 h-6 border-2 border-[#234CFF] border-t-transparent animate-spin rounded-full mt-8" />
        </motion.div>
      </div>
    );
  }

  // Auth Guards: Welcome screen
  if (!isAuthenticated && !hasStarted) {
    return (
      <AnimatePresence mode="wait">
        <Welcome onStart={handleStartOnboarding} />
      </AnimatePresence>
    );
  }

  // Auth Guards: Login form
  if (!isAuthenticated && hasStarted) {
    return (
      <AnimatePresence mode="wait">
        <Login />
      </AnimatePresence>
    );
  }

  // Authenticated Dashboard Shell Layout
  return (
    <div className="min-h-[100dvh] bg-slate-50 dark:bg-[#0B0E14] text-slate-900 dark:text-white transition-colors duration-200 font-sans" id="scarb-app-dashboard-shell">
      {/* Dynamic Toast Alert Notifications Portal */}
      <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[80] space-y-2 w-full max-w-sm px-4 pointer-events-none" id="toasts-alert-portal">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              className="p-4 rounded-[18px] bg-white dark:bg-[#1E2533] border border-slate-200/50 dark:border-white/10 shadow-2xl flex items-center justify-between pointer-events-auto"
            >
              <div className="flex items-center space-x-3">
                {toast.type === 'success' && <div className="w-7 h-7 rounded-full bg-[#00D26A]/10 text-[#00D26A] flex items-center justify-center"><Check className="w-4 h-4" /></div>}
                {toast.type === 'error' && <div className="w-7 h-7 rounded-full bg-[#FF4D4F]/10 text-[#FF4D4F] flex items-center justify-center"><ShieldAlert className="w-4 h-4" /></div>}
                {toast.type === 'info' && <div className="w-7 h-7 rounded-full bg-[#234CFF]/10 text-[#234CFF] flex items-center justify-center"><ArrowDownUp className="w-4 h-4" /></div>}
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">{toast.message}</span>
              </div>
              <button onClick={() => removeToast(toast.id)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 shrink-0 ml-2">
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Main Top Header Navigation */}
      <header className="sticky top-0 z-40 bg-slate-50/80 dark:bg-[#0B0E14]/80 backdrop-blur-md border-b border-slate-200/40 dark:border-white/5 py-3.5 px-6" id="scarb-header-bar">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <Logo size="sm" showText={true} />

          {/* Quick theme & notification icons */}
          <div className="flex items-center space-x-3">
            {/* Notification bell badge */}
            <button 
              onClick={toggleNotificationsHub} 
              className="w-10 h-10 rounded-full bg-white dark:bg-[#161B26] border border-slate-200/40 dark:border-white/5 flex items-center justify-center relative hover:scale-105 active:scale-95 transition-all"
            >
              <Bell className="w-4.5 h-4.5 text-slate-600 dark:text-slate-300" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#FF4D4F] text-white text-[9px] font-black flex items-center justify-center border-2 border-slate-50 dark:border-[#0B0E14]">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content frame */}
      <main className="max-w-md mx-auto px-6 pt-5" id="scarb-main-wrapper">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Dynamic Bottom App Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/80 dark:bg-[#161B26]/85 backdrop-blur-lg border-t border-slate-200/50 dark:border-white/5 py-2.5 px-4 rounded-t-[24px] shadow-2xl" id="scarb-bottom-nav">
        <div className="max-w-md mx-auto flex justify-around items-center">
          {[
            { id: 'home', label: t.navHome, icon: <Home className="w-5 h-5" /> },
            { id: 'wallet', label: t.navWallet, icon: <WalletIcon className="w-5 h-5" /> },
            { id: 'crypto', label: t.navCrypto, icon: <Coins className="w-5 h-5" /> },
            ...(user?.isFop ? [{ id: 'business', label: t.navBusiness, icon: <Briefcase className="w-5 h-5" /> }] : []),
            { id: 'profile', label: t.navProfile, icon: <UserIcon className="w-5 h-5" /> }
          ].map((item) => {
            const isActive = activeTab === item.id || 
              (item.id === 'home' && ['p2p', 'exchange', 'payments', 'swift'].includes(activeTab));
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center justify-center py-1 px-1.5 sm:px-3.5 rounded-2xl transition-all ${isActive ? 'text-[#234CFF]' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
              >
                <div className={`transition-transform duration-200 ${isActive ? 'scale-110' : ''}`}>
                  {item.icon}
                </div>
                <span className="text-[9px] font-black tracking-wide mt-1 uppercase">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* NOTIFICATIONS HUB OVERLAY PANEL */}
      <AnimatePresence>
        {showNotifHub && (
          <div className="fixed inset-0 z-50 flex justify-end" id="notifications-sidebar-hub">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowNotifHub(false)} 
              className="absolute inset-0 bg-[#0B0E14]/60 backdrop-blur-sm"
            />
            
            {/* Sidebar Frame */}
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="relative w-full max-w-sm h-full bg-white dark:bg-[#161B26] border-l border-slate-200 dark:border-white/5 flex flex-col justify-between shadow-2xl z-10"
            >
              {/* Header */}
              <div className="p-5 border-b border-slate-100 dark:border-white/5 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Bell className="w-5 h-5 text-[#234CFF]" />
                  <h3 className="font-sans font-black text-base text-slate-900 dark:text-white">{language === 'uk' ? 'Сповіщення' : 'Notifications'}</h3>
                </div>
                <button onClick={() => setShowNotifHub(false)} className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center">
                  <X className="w-4 h-4 text-slate-400" />
                </button>
              </div>

              {/* List */}
              <div className="flex-1 overflow-y-auto p-5 space-y-3" id="notifications-list-container">
                {notifications.length === 0 ? (
                  <div className="text-center py-20 text-slate-400">
                    <Bell className="w-10 h-10 mx-auto mb-2.5 opacity-30 animate-bounce" />
                    <p className="text-xs font-bold uppercase tracking-wider">No notifications yet</p>
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div 
                      key={notif.id}
                      className={`p-4 rounded-[18px] bg-slate-50 dark:bg-[#11141D] border transition-all ${notif.read ? 'border-slate-100 dark:border-white/5 opacity-75' : 'border-[#234CFF]/20 bg-[#234CFF]/5'}`}
                    >
                      <div className="flex justify-between items-start">
                        <h4 className="font-sans font-bold text-xs text-slate-800 dark:text-white">{notif.title}</h4>
                        <span className="text-[9px] font-bold text-slate-400">{notif.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 font-semibold mt-1.5 leading-relaxed">{notif.body}</p>
                    </div>
                  ))
                )}
              </div>

              {/* Clear action */}
              <div className="p-5 border-t border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-[#11141D] flex space-x-3">
                <button
                  onClick={() => { clearAllNotifications(); setShowNotifHub(false); }}
                  className="w-full py-3 text-xs font-bold rounded-xl bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-white/15 transition-all text-center"
                >
                  Clear Notifications History
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
