import {Box, Icon} from 'native-base';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/Ionicons';
import AnimatedPressable from '../AnimatedComponents/AnimatedPressable';

const MessageButton = () => {
  return (
    <AnimatedPressable padding={'xs'}>
      <Box>
        <Icon
          as={MaterialCommunityIcons}
          name="ios-chatbubble-ellipses-outline"
          size="25"
          color="iconColor"
        />
      </Box>
    </AnimatedPressable>
  );
};

export default MessageButton;
