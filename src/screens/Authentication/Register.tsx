import {Box, Button, VStack} from 'native-base';
import React, {useState} from 'react';
import {Formik} from 'formik';
import FormInput from './components/FormInput';
import {useAuth} from '../../context/AuthContext';
import {
  inputIcons,
  registerForm,
  registerValidate,
} from './constants/AuthenticationConstants';
import Logo from '../../components/Shared/Logo';
import {NavigationProp, useNavigation} from '@react-navigation/native';
const Register = () => {
  const {register} = useAuth();
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
        validate={registerValidate}
        onSubmit={(values, errors) => {
          register({
            email: values.email,
            password: values.password,
            userName: values.username,
          });
          navigation.navigate('Login');
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isSubmitting,
        }) => (
          <VStack space={'lg'}>
            <Logo />
            <FormInput
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
              placeholder={'Username'}
              error={errors.username}
              iconName={inputIcons.username}
              isSubmitted={isSubmitted}
            />
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
            <FormInput
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
              placeholder={'Confirm Password'}
              error={errors.confirmPassword}
              iconName={inputIcons.confirmPassword}
              isSubmitted={isSubmitted}
            />
            <Button
              onPress={() => {
                handleSubmit();
                setIsSubmitted(true);
              }}
              isDisabled={isSubmitting}
              backgroundColor={'cyan'}
              marginTop={'sm'}>
              {isSubmitting ? 'Please Wait...' : 'Register'}
            </Button>
          </VStack>
        )}
      </Formik>
    </Box>
  );
};

export default Register;
