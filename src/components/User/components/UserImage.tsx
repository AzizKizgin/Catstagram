import {Center, Image} from 'native-base';
import React, {FC} from 'react';

interface UserImageProps {
  image: string;
}
const UserImage: FC<UserImageProps> = ({image}) => {
  return (
    <Center>
      <Image
        source={{uri: image}}
        alt="image base"
        size="xs"
        rounded="full"
        resizeMode="cover"
      />
    </Center>
  );
};

export default UserImage;
