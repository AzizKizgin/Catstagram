import React, {FC} from 'react';
import {Box, HStack} from 'native-base';
import HeaderLogo from '../../components/Shared/HeaderLogo';
import AddPostButton from '../../components/Shared/AddPostButton';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import AccountMenuButton from '../../components/Shared/AccountMenuButton';

interface AccountHeaderProps {
  props: NativeStackHeaderProps;
}
const AccountHeader: FC<AccountHeaderProps> = ({props}) => {
  return (
    <Box
      paddingX={'sm'}
      backgroundColor={'bgDark'}
      flexDirection={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}>
      <HeaderLogo />
      <HStack space={1}>
        <AddPostButton
          onPress={() => {
            props.navigation.navigate('AddPost');
          }}
        />
        <AccountMenuButton props={props} />
      </HStack>
    </Box>
  );
};

export default AccountHeader;
