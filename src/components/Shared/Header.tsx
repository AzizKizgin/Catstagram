import React, {FC} from 'react';
import {Box, Text} from 'native-base';
import BackButton from './BackButton';
import HeaderLogo from './HeaderLogo';
import {useNavigation} from '@react-navigation/native';
interface HeaderProps {
  onPress?: () => void;
}
const Header: FC<HeaderProps> = (props) => {
  const {onPress} = props;
  const navigation = useNavigation();
  return (
    <Box
      paddingX={'sm'}
      backgroundColor={'bgDark'}
      flexDirection={'row'}
      alignItems={'center'}>
      <BackButton onPress={onPress || (() => navigation.goBack())} />
      <HeaderLogo />
    </Box>
  );
};

export default Header;
