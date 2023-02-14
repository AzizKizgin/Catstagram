import {Center} from 'native-base';
import React, {FC} from 'react';
import {Image} from 'react-native';
import {defaultProfileImage} from '../../../utils/consts';

interface UserImageProps {
  image?: string;
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
}
const UserImage: FC<UserImageProps> = ({image, size}) => {
  return (
    <Center>
      <Image
        source={{
          uri: `data:image/jpeg;base64,${image || defaultProfileImage}`,
        }}
        style={{
          width: 35,
          height: 35,
        }}
      />
    </Center>
  );
};

export default UserImage;
