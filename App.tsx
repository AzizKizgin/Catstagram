import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Box, NativeBaseProvider} from 'native-base';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import theme from './theme';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NativeBaseProvider theme={theme}>
        <Box bg={'pink'}>
          <Text>App</Text>
        </Box>
      </NativeBaseProvider>
    </QueryClientProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
