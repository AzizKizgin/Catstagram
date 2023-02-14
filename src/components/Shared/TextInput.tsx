import {View, Text} from 'react-native';
import React, {FC, useState} from 'react';
import {Box, IInputProps, Input} from 'native-base';

interface TextInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  inputProps?: IInputProps;
}
const TextInput: FC<TextInputProps> = (props) => {
  const {placeholder, value, onChangeText, inputProps} = props;
  const [borderColor, setBorderColor] = useState('gray.200');
  return (
    <Box
      flex={1}
      borderWidth={'1'}
      borderColor={borderColor}
      borderRadius={'sm'}
      marginRight={'s'}>
      <Input
        _focus={{
          selectionColor: 'cyan',
        }}
        value={value}
        onChangeText={onChangeText}
        borderWidth={0}
        placeholder={placeholder}
        backgroundColor={'itemBgDark'}
        fontSize={'sm'}
        color={'textDark'}
        onFocus={() => setBorderColor('cyan')}
        onBlur={() => setBorderColor('gray.200')}
        {...inputProps}
      />
    </Box>
  );
};

export default TextInput;
