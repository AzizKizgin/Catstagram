import {Formik} from 'formik';
import {Box, Button, VStack} from 'native-base';
import React, {useState} from 'react';
import Logo from '../../components/Shared/Logo';
import {useAuth} from '../../context/AuthContext';
import FormInput from './components/FormInput';
import {
  resetPasswordValidate,
  inputIcons,
} from './constants/AuthenticationConstants';

const ResetPassword = () => {
  const {resetPassword} = useAuth();
  const [isSubmitted, setIsSubmitted] = useState(false);
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
            <Button
              onPress={() => {
                setIsSubmitted(true);
                handleSubmit();
              }}
              backgroundColor={'cyan'}
              marginTop={'sm'}>
              Send
            </Button>
          </VStack>
        )}
      </Formik>
    </Box>
  );
};

export default ResetPassword;
