import React from 'react';
import {Box, NativeBaseProvider} from 'native-base';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import theme from './theme';
import {AuthProvider} from './src/context/AuthContext';
import Router from './src/navigation/Router';
import {ToastProvider} from './src/context/ToastContext';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NativeBaseProvider theme={theme}>
        <AuthProvider>
          <ToastProvider>
            <Router />
          </ToastProvider>
        </AuthProvider>
      </NativeBaseProvider>
    </QueryClientProvider>
  );
};

export default App;
