import {Center} from 'native-base';
import React, {FC} from 'react';
import {Image} from 'react-native';
import theme from '../../../theme';
import {defaultProfileImage} from '../../utils/consts';

interface UserImageProps {
  image?: string | null;
  focused: boolean;
}
const AccountImage: FC<UserImageProps> = ({image, focused}) => {
  return (
    <Center>
      <Image
        source={{
          uri: `data:image/jpeg;base64,${image || defaultProfileImage}`,
        }}
        style={{
          width: 35,
          height: 35,
          borderRadius: 50,
          borderColor: focused ? theme.colors.pink : theme.colors.cyan,
          borderWidth: 2,
        }}
        resizeMode="center"
      />
    </Center>
  );
};

export default AccountImage;
