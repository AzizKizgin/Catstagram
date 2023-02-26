import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Header from '../../components/Shared/Header';
import {Account} from '../../screens';
import AccountHeader from '../components/AccountHeader';
import UserActivityNavigation from '../UserActivityNavigation';

const AccountNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'fade_from_bottom',
        headerShown: true,
        header(props) {
          if (props.route.name === 'Account') {
            return <AccountHeader props={props} />;
          } else if (props.route.name === 'UserActivities') {
            return <Header />;
          } else {
            return null;
          }
        },
      }}>
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="UserActivities" component={UserActivityNavigation} />
    </Stack.Navigator>
  );
};

export default AccountNavigation;
