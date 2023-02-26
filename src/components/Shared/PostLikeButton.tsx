import {Box, Icon, Pressable} from 'native-base';
import React, {memo, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {usePost} from '../../context/PostContext';

const PostLikeButton = () => {
  const {like, isUserLiked} = usePost();

  return (
    <Pressable onPress={like}>
      {isUserLiked ? (
        <Box>
          <Icon as={AntDesign} name="like1" size={23} color="cyan" />
        </Box>
      ) : (
        <Box>
          <Icon as={AntDesign} name="like2" size={23} color="iconColor" />
        </Box>
      )}
    </Pressable>
  );
};

export default memo(PostLikeButton);
