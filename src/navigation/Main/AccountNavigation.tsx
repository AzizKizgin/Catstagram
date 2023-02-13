import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Account} from '../../screens';

const AccountNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Account" component={Account} />
    </Stack.Navigator>
  );
};

export default AccountNavigation;
