import {Box, Icon} from 'native-base';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AnimatedPressable from '../AnimatedComponents/AnimatedPressable';

const SaveButton = () => {
  return (
    <AnimatedPressable>
      <Box>
        <Icon as={FontAwesome} name="bookmark-o" size="23" color="white" />
      </Box>
    </AnimatedPressable>
  );
};

export default SaveButton;
