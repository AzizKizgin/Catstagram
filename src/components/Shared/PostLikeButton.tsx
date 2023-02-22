import {Box, Icon} from 'native-base';
import React, {memo, useState} from 'react';
import AnimatedPressable from '../AnimatedComponents/AnimatedPressable';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useAuth} from '../../context/AuthContext';
import {usePost} from '../../context/PostContext';

const PostLikeButton = () => {
  const {post, like, isUserLiked} = usePost();

  return (
    <AnimatedPressable onPress={like}>
      {isUserLiked ? (
        <Box>
          <Icon as={AntDesign} name="like1" size={23} color="cyan" />
        </Box>
      ) : (
        <Box>
          <Icon as={AntDesign} name="like2" size={23} color="iconColor" />
        </Box>
      )}
    </AnimatedPressable>
  );
};

export default memo(PostLikeButton);
