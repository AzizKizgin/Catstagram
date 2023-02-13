import React, {FC} from 'react';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {Box} from 'native-base';
import BackButton from '../../components/Shared/BackButton';
import HeaderLogo from '../../components/Shared/HeaderLogo';

interface AddPostHeaderProps {
  props: NativeStackHeaderProps;
}
const AddPostHeader: FC<AddPostHeaderProps> = ({props}) => {
  return (
    <Box
      paddingX={'sm'}
      backgroundColor={'bgDark'}
      flexDirection={'row'}
      alignItems={'center'}>
      <BackButton onPress={() => props.navigation.goBack()} />
      <HeaderLogo />
    </Box>
  );
};

export default AddPostHeader;
