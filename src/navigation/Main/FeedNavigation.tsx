import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Feed} from '../../screens';

const FeedNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Feed" component={Feed} />
    </Stack.Navigator>
  );
};

export default FeedNavigation;
