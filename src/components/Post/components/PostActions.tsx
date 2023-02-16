import React, {memo} from 'react';
import {HStack, VStack, Text} from 'native-base';
import LikeButton from '../../Shared/LikeButton';
import CommentButton from '../../Shared/CommentButton';
import ShareButton from '../../Shared/ShareButton';
import SaveButton from '../../Shared/SaveButton';
import {usePost} from '../../../context/PostContext';

const PostActions = () => {
  const {onCommentPress, likes, like, post} = usePost();
  return (
    <VStack paddingX={'sm'} space={'0.5'}>
      <HStack justifyContent={'space-between'} paddingTop={'xs'}>
        <HStack space={'sm'}>
          <LikeButton
            size={23}
            id={post?.id}
            onPress={() => {
              like();
            }}
          />
          <CommentButton onPress={onCommentPress} />
          <ShareButton />
        </HStack>
        <SaveButton />
      </HStack>
      {likes.length > 0 && <Text color={'textDark'}>{likes.length} likes</Text>}
    </VStack>
  );
};

export default memo(PostActions);
