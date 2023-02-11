import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import theme from '../../theme';
import {ResetPassword, Login, Register} from '../screens';

const AuthenticationNavigation = () => {
  const Stack = createNativeStackNavigator<AuthNavigationParamsList>();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.itemBgDark,
        },
        headerTintColor: theme.colors.textDark,
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
    </Stack.Navigator>
  );
};

export default AuthenticationNavigation;
