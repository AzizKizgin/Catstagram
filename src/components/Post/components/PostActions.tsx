import React, {FC, memo, useEffect, useState} from 'react';
import {HStack, VStack, Text} from 'native-base';
import LikeButton from '../../Shared/LikeButton';
import CommentButton from '../../Shared/CommentButton';
import ShareButton from '../../Shared/ShareButton';
import SaveButton from '../../Shared/SaveButton';
import {checkUserLikedPost, getPostLikes} from '../../../data/getData';
import {useAuth} from '../../../context/AuthContext';
import {likePost} from '../../../data/postData';

interface PostActionsProps {
  onCommentPress: () => void;
  postId?: string;
}
const PostActions: FC<PostActionsProps> = (props) => {
  const {onCommentPress, postId} = props;
  const [likes, setLikes] = useState<string[]>([]);
  const {user} = useAuth();
  getPostLikes(postId).then((likes) => {
    setLikes(likes);
  });
  return (
    <VStack paddingX={'sm'} space={'0.5'}>
      <HStack justifyContent={'space-between'} paddingTop={'xs'}>
        <HStack space={'sm'}>
          <LikeButton
            size={23}
            id={postId}
            onPress={() => {
              user && likePost(postId, user.uid);
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
