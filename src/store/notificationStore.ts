import { create } from 'zustand';
import { AppNotification } from '../types';
import { mockNotifications } from '../mock/data';

interface NotificationState {
  notifications: AppNotification[];
  unreadCount: number;
  toasts: { id: string; message: string; type: 'success' | 'error' | 'info' }[];
  
  // Actions
  addNotification: (type: 'info' | 'success' | 'warning' | 'error', title: string, body: string) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotification: (id: string) => void;
  clearAllNotifications: () => void;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
}

export const useNotificationStore = create<NotificationState>((set, get) => {
  return {
    notifications: [...mockNotifications],
    unreadCount: mockNotifications.filter(n => !n.read).length,
    toasts: [],

    showToast: (message, type = 'success') => {
      const id = `toast-${Date.now()}`;
      set((state) => ({
        toasts: [...state.toasts, { id, message, type }]
      }));
      // Auto-remove after 4 seconds
      setTimeout(() => {
        get().removeToast(id);
      }, 4000);
    },

    removeToast: (id) => {
      set((state) => ({
        toasts: state.toasts.filter(t => t.id !== id)
      }));
    },

    addNotification: (type, title, body) => {
      const { notifications } = get();
      const newNotification: AppNotification = {
        id: `nt-${Date.now()}`,
        type,
        title,
        body,
        time: 'Щойно',
        read: false
      };
      
      const nextList = [newNotification, ...notifications];
      set({
        notifications: nextList,
        unreadCount: nextList.filter(n => !n.read).length
      });
    },

    markAsRead: (id) => {
      const { notifications } = get();
      const nextList = notifications.map(n => n.id === id ? { ...n, read: true } : n);
      set({
        notifications: nextList,
        unreadCount: nextList.filter(n => !n.read).length
      });
    },

    markAllAsRead: () => {
      const { notifications } = get();
      const nextList = notifications.map(n => ({ ...n, read: true }));
      set({
        notifications: nextList,
        unreadCount: 0
      });
    },

    clearNotification: (id) => {
      const { notifications } = get();
      const nextList = notifications.filter(n => n.id !== id);
      set({
        notifications: nextList,
        unreadCount: nextList.filter(n => !n.read).length
      });
    },

    clearAllNotifications: () => {
      set({
        notifications: [],
        unreadCount: 0
      });
    }
  };
});
