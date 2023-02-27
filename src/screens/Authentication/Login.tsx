import {Box, Button, Text, VStack, Center, Pressable, Image} from 'native-base';
import React, {useState} from 'react';
import {Formik} from 'formik';
import FormInput from './components/FormInput';
import {useAuth} from '../../context/AuthContext';
import {
  inputIcons,
  registerForm,
  loginValidate,
} from './constants/AuthenticationConstants';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import Logo from '../../components/Shared/Logo';
const Login = () => {
  const {login, user} = useAuth();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigation = useNavigation<NavigationProp<AuthNavigationParamsList>>();
  return (
    <Box
      flex={1}
      backgroundColor={'bgDark'}
      justifyContent={'center'}
      paddingX={'xl'}>
      <Formik
        initialValues={registerForm}
        validate={loginValidate}
        onSubmit={(values) =>
          login({
            email: values.email,
            password: values.password,
          })
        }>
        {({handleChange, handleBlur, handleSubmit, values, errors}) => (
          <VStack space={'lg'}>
            <Logo />
            <FormInput
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              placeholder={'Email'}
              error={errors.email}
              iconName={inputIcons.email}
              isSubmitted={isSubmitted}
            />
            <FormInput
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              placeholder={'Password'}
              error={errors.password}
              iconName={inputIcons.password}
              isSubmitted={isSubmitted}
            />
            <VStack space={'xs'}>
              <Button
                onPress={() => {
                  handleSubmit();
                  setIsSubmitted(true);
                }}
                backgroundColor={'cyan'}
                marginTop={'sm'}>
                Login
              </Button>
              <Center>
                <Pressable
                  variant={'login'}
                  onPress={() => navigation.navigate('ResetPassword')}>
                  <Text color={'textDark'}>Forgot Password?</Text>
                </Pressable>
                <Pressable
                  variant={'login'}
                  onPress={() => navigation.navigate('Register')}>
                  <Text color={'textDark'} marginTop={'xs'}>
                    Don't have an account? Sign Up
                  </Text>
                </Pressable>
              </Center>
            </VStack>
          </VStack>
        )}
      </Formik>
    </Box>
  );
};

export default Login;
