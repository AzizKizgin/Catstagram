import {Box, HStack, Text, VStack} from 'native-base';
import React, {FC, memo, useEffect, useState} from 'react';
import {useAuth} from '../../context/AuthContext';
import {getCommentLikes, likeComment} from '../../data/Comments/commentData';
import {defaultProfileImage} from '../../utils/consts';
import {getTimeDifference} from '../../utils/helpers';
import CommentLikeButton from '../Shared/CommentLikeButton';
import UserImage from '../User/components/UserImage';

interface CommentProps {
  comment: Comment;
  createdAt: string;
  postId?: string;
}

const Comment: FC<CommentProps> = (props) => {
  const {comment, createdAt, postId} = props;
  const [likes, setLikes] = useState<string[]>([]);
  const {user} = useAuth();
  const diff =
    getTimeDifference(createdAt).split(' ')[0] +
    getTimeDifference(createdAt).split(' ')[1].charAt(0);
  const onPress = () => {
    likeComment(postId, comment.id, comment.userId);
    if (likes.includes(user?.uid as string)) {
      setLikes(likes.filter((like) => like !== (user?.uid as string)));
    } else {
      setLikes([...likes, user?.uid as string]);
    }
  };
  useEffect(() => {
    getCommentLikes(postId, comment.id).then((likes) => setLikes(likes));
  }, []);
  return (
    <HStack
      justifyContent={'space-between'}
      alignItems={'center'}
      paddingY={'s'}
      paddingX={'m'}
      space={'4'}>
      <HStack space={'4'} alignItems={'center'} flex={1}>
        <UserImage
          image={defaultProfileImage}
          size={'small'}
          userId={comment.userId}
        />
        <Box flex={1}>
          <HStack space={'2'}>
            <Text color={'gray.400'} textAlign={'left'}>
              {comment.username}
            </Text>
            <Text color={'gray.400'}>{diff}</Text>
          </HStack>
          <Text color={'gray.500'} textAlign={'left'}>
            {comment.text}
          </Text>
        </Box>
      </HStack>
      <VStack alignItems={'center'}>
        <CommentLikeButton
          size={'md'}
          onPress={onPress}
          id={comment.id}
          isUserLiked={likes.includes(comment.userId)}
        />
        <Text color={'gray.400'}>{likes.length > 0 && likes.length}</Text>
      </VStack>
    </HStack>
  );
};

export default memo(Comment);
