import { createContext, useContext, useState, type ReactNode } from 'react';
import { Snackbar, Alert } from '@mui/material';

type SnackbarSeverity = 'success' | 'error' | 'warning' | 'info';

interface SnackbarContextType {
  showSnackbar: (message: string, severity?: SnackbarSeverity) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};

interface SnackbarProviderProps {
  children: ReactNode;
}

interface SnackbarState {
  open: boolean;
  message: string;
  severity: SnackbarSeverity;
}

const getSnackbarStyles = (severity: string) => {
    switch (severity) {
      case 'success':
        return { bgcolor: '#0f5132', color: '#00ff88', border: '1px solid #00ff88' };
      case 'error':
        return { bgcolor: '#58151c', color: '#ff6b6b', border: '1px solid #ff6b6b' };
      case 'warning':
        return { bgcolor: '#664d03', color: '#ffda6a', border: '1px solid #ffda6a' };
      case 'info':
        return { bgcolor: '#031633', color: '#6ea8fe', border: '1px solid #6ea8fe' };
      default:
        return { bgcolor: '#0f5132', color: '#00ff88', border: '1px solid #00ff88' };
    }
  };

export const SnackbarProvider = ({ children }: SnackbarProviderProps) => {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: '',
    severity: 'success',
  });

  const showSnackbar = (message: string, severity: SnackbarSeverity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const hideSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={hideSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={hideSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{
            ...getSnackbarStyles(snackbar.severity),
            '& .MuiAlert-icon': { color: 'inherit' },
            '& .MuiAlert-action': { color: 'inherit' },
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};