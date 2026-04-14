import { createContext, useContext, ReactNode } from 'react';
import { toast } from 'sonner';

interface NotificationContextType {
  success: (message: string, description?: string) => void;
  error: (message: string, description?: string) => void;
  info: (message: string, description?: string) => void;
  warning: (message: string, description?: string) => void;
  promise: <T,>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string;
      error: string;
    }
  ) => Promise<T>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const success = (message: string, description?: string) => {
    toast.success(message, { description });
  };

  const error = (message: string, description?: string) => {
    toast.error(message, { description });
  };

  const info = (message: string, description?: string) => {
    toast.info(message, { description });
  };

  const warning = (message: string, description?: string) => {
    toast.warning(message, { description });
  };

  const promiseNotification = async <T,>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string;
      error: string;
    }
  ): Promise<T> => {
    return toast.promise(promise, messages);
  };

  return (
    <NotificationContext.Provider
      value={{
        success,
        error,
        info,
        warning,
        promise: promiseNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}
