import {Box, Button, HStack, VStack, Text} from 'native-base';
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
import PrivacyModal from './components/PrivacyModal';
import TermsModal from './components/TermsModal';
import {Alert} from 'react-native';
import {CheckBox} from '@aziz_kizgin/react-native-checkbox';
import theme from '../../../theme';
const Register = () => {
  const {register} = useAuth();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigation = useNavigation<NavigationProp<AuthNavigationParamsList>>();
  const [privacyModalVisible, setPrivacyModalVisible] = useState(false);
  const [termsModalVisible, setTermsModalVisible] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
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
            <HStack alignItems={'center'} justifyContent={'center'} space={1}>
              <CheckBox
                isChecked={isAgreed}
                onChange={() => setIsAgreed(!isAgreed)}
                customColor={theme.colors.cyan}
                size={16}
              />
              <Text color={'textDark'} fontSize={'sm'}>
                By registering, you agree to our{' '}
                <Text color={'cyan'} onPress={() => setTermsModalVisible(true)}>
                  Terms of Service
                </Text>{' '}
                and{' '}
                <Text
                  color={'cyan'}
                  onPress={() => setPrivacyModalVisible(true)}>
                  Privacy Policy
                </Text>
              </Text>
            </HStack>
            <Button
              onPress={() => {
                if (isAgreed) {
                  handleSubmit();
                  setIsSubmitted(true);
                } else {
                  Alert.alert('Please agree to the terms and conditions');
                }
              }}
              isDisabled={isAgreed && isSubmitting}
              backgroundColor={'cyan'}
              marginTop={'sm'}>
              {isAgreed && isSubmitting ? 'Please Wait...' : 'Register'}
            </Button>
          </VStack>
        )}
      </Formik>
      <PrivacyModal
        modalVisible={privacyModalVisible}
        setModalVisible={setPrivacyModalVisible}
      />
      <TermsModal
        modalVisible={termsModalVisible}
        setModalVisible={setTermsModalVisible}
      />
    </Box>
  );
};

export default Register;
