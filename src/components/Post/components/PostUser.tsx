import React from 'react';
import {HStack, Text} from 'native-base';
import OptionButton from '../../Shared/OptionButton';
import UserImage from '../../User/components/UserImage';

const PostUser = () => {
  return (
    <HStack
      justifyContent={'space-between'}
      alignItems={'center'}
      paddingX={'s'}
      paddingTop={'xs'}>
      <HStack space={'xs'} justifyContent={'center'} alignItems={'center'}>
        <UserImage image={'https://picsum.photos/331'} size={'xs'} />
        <Text color={'white'}>User Name</Text>
      </HStack>
      <OptionButton />
    </HStack>
  );
};

export default PostUser;
