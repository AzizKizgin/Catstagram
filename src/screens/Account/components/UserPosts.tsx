import React, {FC, memo} from 'react';
import {Box, HStack, Pressable} from 'native-base';
import {Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

interface UserPostsProps {
  posts: Post[];
}
const UserPosts: FC<UserPostsProps> = (props) => {
  const {posts} = props;
  const navigation =
    useNavigation<NativeStackNavigationProp<AccountNavigationParamsList>>();

  const onPress = (post: Post) => {
    navigation.navigate('PostDetail', {post});
  };
  return (
    <HStack marginTop={'l'} flexWrap={'wrap'}>
      {posts.map((post) => (
        <Pressable key={post.id} onPress={() => onPress(post)}>
          <Box marginTop={'xxs'} marginX={'xxs'}>
            <Image
              source={{
                uri: `data:image/jpeg;base64,${post.image.imageUri}`,
              }}
              style={{width: 125, height: 100}}
              resizeMode={'cover'}
            />
          </Box>
        </Pressable>
      ))}
    </HStack>
  );
};

export default memo(UserPosts);
