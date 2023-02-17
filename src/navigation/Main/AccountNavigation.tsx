import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Account, PostDetail} from '../../screens';

const AccountNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'fade_from_bottom',
        headerShown: false,
      }}>
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="PostDetail" component={PostDetail} />
    </Stack.Navigator>
  );
};

export default AccountNavigation;
