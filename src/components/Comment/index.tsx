import {Box, HStack, Text} from 'native-base';
import React, {FC, memo} from 'react';
import LikeButton from '../Shared/LikeButton';
import UserImage from '../User/components/UserImage';

interface CommentProps {
  comment: string;
  user: {
    name: string;
    image: string;
  };
}

const Comment: FC<CommentProps> = (props) => {
  const {comment, user} = props;
  return (
    <HStack
      justifyContent={'space-between'}
      alignItems={'center'}
      paddingY={'s'}>
      <HStack space={'4'} alignItems={'center'}>
        <UserImage image={user.image} size={'xs'} />
        <Box>
          <Text color={'gray.400'} textAlign={'left'}>
            {user.name}
          </Text>
          <Text color={'gray.500'} textAlign={'left'}>
            {comment}
          </Text>
        </Box>
      </HStack>
      <LikeButton />
    </HStack>
  );
};

export default memo(Comment);
