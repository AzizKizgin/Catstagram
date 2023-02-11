import React, {FC} from 'react';
import {HStack} from 'native-base';
import LikeButton from '../../Shared/LikeButton';
import CommentButton from '../../Shared/CommentButton';
import ShareButton from '../../Shared/ShareButton';
import SaveButton from '../../Shared/SaveButton';

interface PostBottomProps {
  onCommentPress: () => void;
}
const PostBottom: FC<PostBottomProps> = (props) => {
  const {onCommentPress} = props;
  return (
    <HStack justifyContent={'space-between'} paddingX={'sm'} paddingY={'xs'}>
      <HStack space={'sm'}>
        <LikeButton />
        <CommentButton onPress={onCommentPress} />
        <ShareButton />
      </HStack>
      <SaveButton />
    </HStack>
  );
};

export default PostBottom;
