import {Box, Icon} from 'native-base';
import React from 'react';
import AnimatedPressable from '../AnimatedComponents/AnimatedPressable';
import AntDesign from 'react-native-vector-icons/AntDesign';

const LikeButton = () => {
  return (
    <AnimatedPressable>
      <Box>
        <Icon as={AntDesign} name="like2" size="23" color="white" />
      </Box>
    </AnimatedPressable>
  );
};

export default LikeButton;
