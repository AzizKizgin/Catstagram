import {Icon, Input} from 'native-base';
import React, {FC} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface FormInputProps {
  onChangeText: (e: string) => void;
  onBlur: (e: any) => void;
  value: string;
  placeholder: string;
  error: any;
  iconName: string;
}

const FormInput: FC<FormInputProps> = (props) => {
  const {onChangeText, onBlur, value, placeholder, error, iconName} = props;
  return (
    <Input
      InputLeftElement={
        <Icon
          as={<Ionicons name={iconName} />}
          size={5}
          ml="2"
          color="muted.400"
        />
      }
      onChangeText={onChangeText}
      onBlur={onBlur}
      value={value}
      placeholder={placeholder}
      backgroundColor={'itemBgDark'}
      color={'textDark'}
      cursorColor={'#1f8686'}
      fontSize={'md'}
      _input={{
        paddingX: 'xs',
      }}
    />
  );
};

export default FormInput;
