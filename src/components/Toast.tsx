import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';
import { useNotificationStore } from '../store/notificationStore';

export const Toast: React.FC = () => {
  const { toasts, removeToast } = useNotificationStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm px-4 pointer-events-none" id="scarb-toast-overlay">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`
              pointer-events-auto flex items-center justify-between p-4 rounded-[20px] shadow-xl border backdrop-blur-xl mb-2
              bg-white dark:bg-[#1E2533] border-slate-200/50 dark:border-white/10 text-slate-800 dark:text-white
            `}
            id={`scarb-toast-content-${toast.id}`}
          >
            <div className="flex items-center space-x-3">
              {toast.type === 'success' && <div className="w-6 h-6 rounded-full bg-[#00D26A]/10 text-[#00D26A] flex items-center justify-center shrink-0"><CheckCircle2 className="w-4 h-4" /></div>}
              {toast.type === 'error' && <div className="w-6 h-6 rounded-full bg-[#FF4D4F]/10 text-[#FF4D4F] flex items-center justify-center shrink-0"><AlertTriangle className="w-4 h-4" /></div>}
              {toast.type === 'info' && <div className="w-6 h-6 rounded-full bg-[#234CFF]/10 text-[#234CFF] flex items-center justify-center shrink-0"><Info className="w-4 h-4" /></div>}
              <span className="font-sans font-semibold text-xs text-slate-800 dark:text-slate-100">{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors ml-2 shrink-0 pointer-events-auto"
            >
              <X className="w-4 h-4 text-slate-400 dark:text-slate-300" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
