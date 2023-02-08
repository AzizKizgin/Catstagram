import {Box, Icon, Pressable} from 'native-base';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';

const ShareButton = () => {
  return (
    <Pressable>
      <Box>
        <Icon as={Feather} name="share-2" size="23" color="white" />
      </Box>
    </Pressable>
  );
};

export default ShareButton;
