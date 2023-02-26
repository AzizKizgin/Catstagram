import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Center} from 'native-base';
import React, {FC, memo} from 'react';
import {Image, Pressable} from 'react-native';
import {defaultProfileImage} from '../../../utils/consts';

interface UserImageProps {
  image?: string | null;
  size: 'small' | 'medium' | 'large';
  userId?: string;
  setImage?: () => void;
}
const UserImage: FC<UserImageProps> = ({image, size, userId, setImage}) => {
  let imageSize = 35;
  switch (size) {
    case 'small':
      imageSize = 35;
      break;
    case 'medium':
      imageSize = 80;
      break;
    case 'large':
      imageSize = 150;
      break;
  }
  const navigation =
    useNavigation<NativeStackNavigationProp<FeedNavigationParamsList>>();
  const onPress = () => {
    if (userId) {
      navigation.navigate('UserAccount', {userId});
    }
  };
  return (
    <Pressable onPress={setImage || onPress}>
      <Center>
        <Image
          source={{
            uri: `data:image/jpeg;base64,${image || defaultProfileImage}`,
          }}
          style={{
            width: imageSize,
            height: imageSize,
            borderRadius: imageSize / 2,
          }}
        />
      </Center>
    </Pressable>
  );
};

export default memo(UserImage);
