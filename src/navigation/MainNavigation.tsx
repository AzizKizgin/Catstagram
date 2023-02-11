import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import React from 'react';
import {AccountNavigation, FeedNavigation, SearchNavigation} from './Main';

const MainNavigation = () => {
  const Tab = createMaterialBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={FeedNavigation} />
      <Tab.Screen name="Search" component={SearchNavigation} />
      <Tab.Screen name="Profile" component={AccountNavigation} />
    </Tab.Navigator>
  );
};

export default MainNavigation;
