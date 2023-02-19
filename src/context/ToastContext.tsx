import {createContext, ReactNode, useContext, useState} from 'react';
import ToastMessage from '../components/Shared/ToastMessage';

interface ToastContextProps {
  children: ReactNode;
}

interface ToastContextType {
  showToast: (message: string, type: ToastType, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType>({
  showToast: () => {},
});

export const ToastProvider = ({children}: ToastContextProps) => {
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [toastType, setToastType] = useState<ToastType>('success');

  const showToast = (message: string, type: ToastType, duration?: number) => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, duration || 3000);
  };

  return (
    <ToastContext.Provider value={{showToast}}>
      <>
        <ToastMessage
          message={toastMessage}
          isVisible={toastVisible}
          type={toastType}
        />
        {children}
      </>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  return useContext(ToastContext);
};
