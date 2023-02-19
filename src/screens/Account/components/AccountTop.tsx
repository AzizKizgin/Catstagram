import {Center, HStack, Text} from 'native-base';
import React, {FC, memo} from 'react';
import UserImage from '../../../components/User/components/UserImage';

interface AccountTopProps {
  postCount: number;
  fallowerCount?: number;
  fallowingCount?: number;
}
const AccountTop: FC<AccountTopProps> = (props) => {
  const {postCount, fallowerCount = 1, fallowingCount = 1} = props;
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
          {fallowerCount}
        </Text>
        <Text color={'textDark'} fontSize={'md'} fontWeight={'semibold'}>
          Fallowers
        </Text>
      </Center>
      <Center>
        <Text color={'textDark'} fontSize={'lg'} fontWeight={'bold'}>
          {fallowingCount}
        </Text>
        <Text color={'textDark'} fontSize={'md'} fontWeight={'semibold'}>
          Fallowing
        </Text>
      </Center>
    </HStack>
  );
};

export default memo(AccountTop);
