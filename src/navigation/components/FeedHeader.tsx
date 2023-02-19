import React, {FC} from 'react';
import {Box, HStack} from 'native-base';
import HeaderLogo from '../../components/Shared/HeaderLogo';
import AddPostButton from '../../components/Shared/AddPostButton';
import MessageButton from '../../components/Shared/MessageButton';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';

interface FeedHeaderProps {
  props: NativeStackHeaderProps;
}
const FeedHeader: FC<FeedHeaderProps> = ({props}) => {
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
        <MessageButton />
      </HStack>
    </Box>
  );
};

export default FeedHeader;
