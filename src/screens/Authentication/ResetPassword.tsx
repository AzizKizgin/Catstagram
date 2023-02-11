import {Formik} from 'formik';
import {Box, Button, VStack} from 'native-base';
import React, {useState} from 'react';
import {useAuth} from '../../context/AuthContext';
import FormInput from './components/FormInput';
import {
  resetPasswordValidate,
  inputIcons,
} from './constants/AuthenticationConstants';

const ResetPassword = () => {
  const {resetPassword} = useAuth();
  const [errors, setErrors] = useState<any>(null);
  return (
    <Box
      flex={1}
      backgroundColor={'bgDark'}
      justifyContent={'center'}
      paddingX={'xl'}>
      <Formik
        initialValues={{email: ''}}
        validate={resetPasswordValidate}
        onSubmit={(values) =>
          resetPassword({
            email: values.email,
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

export default ResetPassword;
