import {Box, Icon, Pressable} from 'native-base';
import React, {FC} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface SendButtonProps {
  onPress: () => void;
}
const SendButton: FC<SendButtonProps> = ({onPress}) => {
  return (
    <Pressable onPress={onPress}>
      <Box padding={'s'}>
        <Icon as={Ionicons} name="ios-send" size="lg" color="cyan" />
      </Box>
    </Pressable>
  );
};

export default SendButton;
