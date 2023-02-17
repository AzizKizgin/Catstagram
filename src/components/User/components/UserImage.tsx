import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Center} from 'native-base';
import React, {FC} from 'react';
import {Image, Pressable} from 'react-native';
import {defaultProfileImage} from '../../../utils/consts';

interface UserImageProps {
  image?: string | null;
  size: 'small' | 'large';
  userId?: string;
}
const UserImage: FC<UserImageProps> = ({image, size, userId}) => {
  const imageSize = size === 'small' ? 35 : 80;
  const navigation =
    useNavigation<NativeStackNavigationProp<FeedNavigationParamsList>>();
  const onPress = () => {
    if (userId) {
      navigation.navigate('UserAccount', {userId});
    }
  };
  return (
    <Pressable onPress={onPress}>
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
    </Pressable>
  );
};

export default UserImage;
