import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Account, Search} from '../../screens';

const SearchNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade_from_bottom',
      }}>
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="UserAccount" component={Account} />
    </Stack.Navigator>
  );
};

export default SearchNavigation;
