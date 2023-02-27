import {Box, Icon, Input, Text} from 'native-base';
import React, {FC, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface FormInputProps {
  onChangeText: (e: string) => void;
  onBlur: (e: any) => void;
  value: string;
  placeholder: string;
  error: any;
  iconName: string;
  isSubmitted: boolean;
}

const FormInput: FC<FormInputProps> = (props) => {
  const [borderColor, setBorderColor] = useState('gray.200');
  const {onChangeText, value, placeholder, error, iconName, isSubmitted} =
    props;
  return (
    <Box>
      <Box borderWidth={'1'} borderColor={borderColor} borderRadius={'sm'}>
        <Input
          InputLeftElement={
            <Icon
              as={<Ionicons name={iconName} />}
              size={5}
              color="muted.400"
              ml={2}
              mr={-1}
            />
          }
          _focus={{
            selectionColor: 'cyan',
          }}
          onChangeText={onChangeText}
          value={value}
          placeholder={placeholder}
          backgroundColor={'itemBgDark'}
          color={'textDark'}
          cursorColor={'#1f8686'}
          fontSize={'md'}
          borderWidth={0}
          onFocus={() => setBorderColor('cyan')}
          onBlur={() => setBorderColor('gray.200')}
          autoComplete="off"
        />
      </Box>
      {error && isSubmitted && <Text color={'red.500'}>{error}</Text>}
    </Box>
  );
};

export default FormInput;
