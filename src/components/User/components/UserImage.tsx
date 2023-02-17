import {Center} from 'native-base';
import React, {FC} from 'react';
import {Image} from 'react-native';
import {defaultProfileImage} from '../../../utils/consts';

interface UserImageProps {
  image?: string | null;
  size: 'small' | 'large';
}
const UserImage: FC<UserImageProps> = ({image, size}) => {
  const imageSize = size === 'small' ? 35 : 80;
  return (
    <Center>
      <Image
        source={{
          uri: `data:image/jpeg;base64,${image || defaultProfileImage}`,
        }}
        style={{
          width: imageSize,
          height: imageSize,
        }}
      />
    </Center>
  );
};

export default UserImage;
