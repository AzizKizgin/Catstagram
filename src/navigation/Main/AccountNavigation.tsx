import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Account, PostDetail} from '../../screens';
import AccountHeader from '../components/AccountHeader';

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
          } else {
            return null;
          }
        },
      }}>
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="PostDetail" component={PostDetail} />
    </Stack.Navigator>
  );
};

export default AccountNavigation;
