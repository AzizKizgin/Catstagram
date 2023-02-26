import React from 'react';
import {Box, Text} from 'native-base';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {LikedPosts, SavedPosts} from '../screens';
import theme from '../../theme';

const UserActivityNavigation = () => {
  const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarStyle: {
          backgroundColor: theme.colors.bgDark,
        },
        tabBarLabelStyle: {
          color: theme.colors.textDark,
        },
        tabBarLabel(props) {
          return (
            <Text
              color={props.focused ? theme.colors.cyan : theme.colors.textDark}
              fontSize={'md'}>
              {route.name === 'LikedPosts' ? 'Liked Posts' : 'Saved Posts'}
            </Text>
          );
        },
        tabBarIndicatorStyle: {
          backgroundColor: theme.colors.cyan,
        },
      })}>
      <Tab.Screen name="LikedPosts" component={LikedPosts} />
      <Tab.Screen name="SavedPosts" component={SavedPosts} />
    </Tab.Navigator>
  );
};

export default UserActivityNavigation;
