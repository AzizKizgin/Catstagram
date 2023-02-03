import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NativeBaseProvider} from 'native-base';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NativeBaseProvider>
        <View>
          <Text>App</Text>
        </View>
      </NativeBaseProvider>
    </QueryClientProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
