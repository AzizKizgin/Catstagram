import {Box, Icon} from 'native-base';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AnimatedPressable from '../AnimatedComponents/AnimatedPressable';

const OptionButton = () => {
  return (
    <AnimatedPressable>
      <Box>
        <Icon
          as={MaterialCommunityIcons}
          name="dots-vertical"
          size="lg"
          color="iconColor"
        />
      </Box>
    </AnimatedPressable>
  );
};

export default OptionButton;
