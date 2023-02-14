import {Box, HStack, Text} from 'native-base';
import React, {FC, memo} from 'react';
import {defaultProfileImage} from '../../utils/consts';
import {getTimeDifference} from '../../utils/helpers';
import LikeButton from '../Shared/LikeButton';
import UserImage from '../User/components/UserImage';

interface CommentProps {
  comment: string;
  userId: string;
  createdAt: string;
}

const Comment: FC<CommentProps> = (props) => {
  const {comment, userId, createdAt} = props;
  const diff =
    getTimeDifference(createdAt).split(' ')[0] +
    getTimeDifference(createdAt).split(' ')[1].charAt(0);
  return (
    <HStack
      justifyContent={'space-between'}
      alignItems={'center'}
      paddingY={'s'}
      paddingX={'m'}
      space={'4'}>
      <HStack space={'4'} alignItems={'center'} flex={1}>
        <UserImage image={defaultProfileImage} size={'xs'} />
        <Box flex={1}>
          <HStack space={'2'}>
            <Text color={'gray.400'} textAlign={'left'}>
              deneme
            </Text>
            <Text color={'gray.400'}>{diff}</Text>
          </HStack>
          <Text color={'gray.500'} textAlign={'left'}>
            {comment}
          </Text>
        </Box>
      </HStack>
      <LikeButton size={'md'} />
    </HStack>
  );
};

export default memo(Comment);
