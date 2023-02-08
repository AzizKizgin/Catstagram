import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {HStack} from 'native-base';
import LikeButton from '../../Shared/LikeButton';
import CommentButton from '../../Shared/CommentButton';
import ShareButton from '../../Shared/ShareButton';
import SaveButton from '../../Shared/SaveButton';

const PostBottom = () => {
  return (
    <HStack justifyContent={'space-between'} paddingX={'sm'} paddingY={'xs'}>
      <HStack space={'sm'}>
        <LikeButton />
        <CommentButton />
        <ShareButton />
      </HStack>
      <SaveButton />
    </HStack>
  );
};

export default PostBottom;

const styles = StyleSheet.create({});
