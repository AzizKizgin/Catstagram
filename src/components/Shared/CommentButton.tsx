import {Box, Icon} from 'native-base';
import React, {FC} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AnimatedPressable from '../AnimatedComponents/AnimatedPressable';

interface CommentButtonProps {
  onPress: () => void;
}
const CommentButton: FC<CommentButtonProps> = ({onPress}) => {
  return (
    <AnimatedPressable onPress={onPress}>
      <Box>
        <Icon
          as={Ionicons}
          name="ios-chatbox-outline"
          size="23"
          color="iconColor"
          marginTop={'xxs'}
        />
      </Box>
    </AnimatedPressable>
  );
};

export default CommentButton;
