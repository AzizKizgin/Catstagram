import {Box, Icon, Pressable} from 'native-base';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/Ionicons';
import {useToast} from '../../context/ToastContext';

const MessageButton = () => {
  const {showToast} = useToast();
  return (
    <Pressable
      padding={'xs'}
      onPress={() => {
        showToast('This feature is not available yet', 'info');
      }}>
      <Box>
        <Icon
          as={MaterialCommunityIcons}
          name="ios-chatbubble-ellipses-outline"
          size="25"
          color="iconColor"
        />
      </Box>
    </Pressable>
  );
};

export default MessageButton;
