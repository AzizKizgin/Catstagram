import React, {FC, memo, useEffect, useState} from 'react';
import {HStack, Text} from 'native-base';
import OptionButton from '../../Shared/OptionButton';
import UserImage from '../../User/components/UserImage';
import {getUserById} from '../../../data/Users/userData';

interface PostUserProps {
  userId: string;
}
const PostUser: FC<PostUserProps> = ({userId}) => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    getUserById(userId).then((user) => setUser(user));
  }, []);
  return (
    <HStack
      justifyContent={'space-between'}
      alignItems={'center'}
      paddingX={'s'}
      paddingTop={'xs'}>
      <HStack space={'xs'} justifyContent={'center'} alignItems={'center'}>
        <UserImage image={user?.image} size={'small'} />
        <Text color={'white'}>{user?.username}</Text>
      </HStack>
      <OptionButton />
    </HStack>
  );
};

export default memo(PostUser);
