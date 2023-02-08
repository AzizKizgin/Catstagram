import {Box, Icon, Pressable} from 'native-base';
import React from 'react';
import Feather from 'react-native-vector-icons/Ionicons';

const ShareButton = () => {
  return (
    <Pressable>
      <Box>
        <Icon as={Feather} name="arrow-redo-outline" size="25" color="white" />
      </Box>
    </Pressable>
  );
};

export default ShareButton;
