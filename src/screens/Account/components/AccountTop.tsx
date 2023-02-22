import {Center, HStack, Text} from 'native-base';
import React, {FC, memo, useEffect, useState} from 'react';
import UserImage from '../../../components/User/components/UserImage';
import {getUserFallowers, getUserFallowing} from '../../../data/Users/userData';

interface AccountTopProps {
  userId?: string;
  postCount?: number;
}
const AccountTop: FC<AccountTopProps> = (props) => {
  const [userFallowers, setUserFallowers] = useState<User[]>([]);
  const [userFallowing, setUserFallowing] = useState<User[]>([]);
  const {postCount = 0, userId} = props;

  useEffect(() => {
    getUserFallowers(userId).then((users) => {
      setUserFallowers(users);
    });
    getUserFallowing(userId).then((users) => {
      setUserFallowing(users);
    });
  }, []);
  return (
    <HStack
      justifyContent={'center'}
      alignItems={'center'}
      space={8}
      paddingTop={'l'}>
      <UserImage size={'medium'} />
      <Center>
        <Text color={'textDark'} fontSize={'lg'} fontWeight={'bold'}>
          {postCount}
        </Text>
        <Text color={'textDark'} fontSize={'md'} fontWeight={'semibold'}>
          Posts
        </Text>
      </Center>
      <Center>
        <Text color={'textDark'} fontSize={'lg'} fontWeight={'bold'}>
          {userFallowers.length}
        </Text>
        <Text color={'textDark'} fontSize={'md'} fontWeight={'semibold'}>
          Fallowers
        </Text>
      </Center>
      <Center>
        <Text color={'textDark'} fontSize={'lg'} fontWeight={'bold'}>
          {userFallowing.length}
        </Text>
        <Text color={'textDark'} fontSize={'md'} fontWeight={'semibold'}>
          Fallowing
        </Text>
      </Center>
    </HStack>
  );
};

export default memo(AccountTop);
