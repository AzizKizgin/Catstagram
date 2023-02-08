import {Box, Icon} from 'native-base';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AnimatedPressable from '../AnimatedComponents/AnimatedPressable';

const CommentButton = () => {
  return (
    <AnimatedPressable>
      <Box>
        <Icon
          as={Ionicons}
          name="ios-chatbox-outline"
          size="23"
          color="white"
          marginTop={'xxs'}
        />
      </Box>
    </AnimatedPressable>
  );
};

export default CommentButton;
