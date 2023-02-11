import {Center, Image} from 'native-base';
import React, {FC} from 'react';

interface UserImageProps {
  image: string;
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
}
const UserImage: FC<UserImageProps> = ({image, size}) => {
  return (
    <Center>
      <Image
        source={{uri: image}}
        alt="image base"
        size={size}
        rounded="full"
        resizeMode="cover"
      />
    </Center>
  );
};

export default UserImage;
