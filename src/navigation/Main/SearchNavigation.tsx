import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Search} from '../../screens';

const SearchNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Search" component={Search} />
    </Stack.Navigator>
  );
};

export default SearchNavigation;
