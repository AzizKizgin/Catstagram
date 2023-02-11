import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {ResetPassword, Login, Register} from '../screens';

const AuthenticationNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
    </Stack.Navigator>
  );
};

export default AuthenticationNavigation;
