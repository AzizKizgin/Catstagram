import React, {FC, memo} from 'react';
import {HStack} from 'native-base';
import LikeButton from '../../Shared/LikeButton';
import CommentButton from '../../Shared/CommentButton';
import ShareButton from '../../Shared/ShareButton';
import SaveButton from '../../Shared/SaveButton';

interface PostActionsProps {
  onCommentPress: () => void;
}
const PostActions: FC<PostActionsProps> = (props) => {
  const {onCommentPress} = props;
  return (
    <HStack justifyContent={'space-between'} paddingX={'sm'} paddingTop={'xs'}>
      <HStack space={'sm'}>
        <LikeButton />
        <CommentButton onPress={onCommentPress} />
        <ShareButton />
      </HStack>
      <SaveButton />
    </HStack>
  );
};

export default memo(PostActions);
