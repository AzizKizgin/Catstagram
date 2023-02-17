import {Box, Text} from 'native-base';
import React, {FC, memo, useEffect, useState} from 'react';

interface AccountInfoProps {
  userInfo?: User | null;
}
const AccountInfo: FC<AccountInfoProps> = (props) => {
  const {userInfo} = props;
  return (
    <Box width={'80%'} marginX={'s'} marginTop={'s'}>
      <Text
        color={'textDark'}
        fontSize={'lg'}
        fontWeight={'bold'}
        textAlign={'left'}>
        {userInfo?.username}
      </Text>
      <Text
        color={'textDark'}
        fontSize={'sm'}
        textAlign={'left'}
        flexShrink={1}>
        {userInfo?.bio}
        autem.
      </Text>
    </Box>
  );
};

export default memo(AccountInfo);
