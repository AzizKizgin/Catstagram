import React, {FC, memo} from 'react';
import {HStack, VStack, Text} from 'native-base';
import PostLikeButton from '../../Shared/PostLikeButton';
import CommentButton from '../../Shared/CommentButton';
import SaveButton from '../../Shared/SaveButton';
import {usePost} from '../../../context/PostContext';
import DownloadButton from '../../Shared/DownloadButton';

interface PostActionsProps {
  isDetail?: boolean;
}
const PostActions: FC<PostActionsProps> = ({isDetail = false}) => {
  const {likes} = usePost();
  return (
    <VStack paddingX={'sm'} space={'0.5'}>
      <HStack justifyContent={'space-between'} paddingTop={'xs'}>
        <HStack space={'sm'}>
          <PostLikeButton />
          {!isDetail && <CommentButton />}
          <DownloadButton />
        </HStack>
        <SaveButton />
      </HStack>
      {likes?.length > 0 && (
        <Text color={'textDark'}>{likes?.length} likes</Text>
      )}
    </VStack>
  );
};

export default memo(PostActions);
