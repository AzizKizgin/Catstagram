import {Box, Button, VStack} from 'native-base';
import React, {useState} from 'react';
import {Formik} from 'formik';
import FormInput from './components/FormInput';
import {useAuth} from '../../context/AuthContext';
import {
  inputIcons,
  registerForm,
  loginValidate,
} from './constants/AuthenticationConstants';
const Login = () => {
  const {login} = useAuth();
  const [errors, setErrors] = useState<any>(null);

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
            setErrors,
          })
        }>
        {({handleChange, handleBlur, handleSubmit, values, errors}) => (
          <VStack space={'lg'}>
            <FormInput
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              placeholder={'Email'}
              error={errors.email}
              iconName={inputIcons.email}
            />
            <FormInput
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              placeholder={'Password'}
              error={errors.password}
              iconName={inputIcons.password}
            />
            <Button
              onPress={() => handleSubmit()}
              backgroundColor={'cyan'}
              marginTop={'sm'}>
              Login
            </Button>
          </VStack>
        )}
      </Formik>
    </Box>
  );
};

export default Login;
