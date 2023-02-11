import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {useAuth} from '../context/AuthContext';
import AuthenticationNavigation from './AuthenticationNavigation';
import MainNavigation from './MainNavigation';

const Router = () => {
  const {user} = useAuth();
  return (
    <NavigationContainer>
      {user ? <MainNavigation /> : <AuthenticationNavigation />}
    </NavigationContainer>
  );
};

export default Router;
