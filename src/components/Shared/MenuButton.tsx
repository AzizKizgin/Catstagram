import React from 'react';
import {Box, Icon, Text} from 'native-base';
import AnimatedPressable from '../AnimatedComponents/AnimatedPressable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const MenuButton = () => {
  return (
    <AnimatedPressable padding={'xs'}>
      <Box>
        <Icon
          as={MaterialCommunityIcons}
          name="dots-vertical"
          size="25"
          color="iconColor"
        />
      </Box>
    </AnimatedPressable>
  );
};

export default MenuButton;
