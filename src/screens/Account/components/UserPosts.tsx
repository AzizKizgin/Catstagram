import React, {FC, memo} from 'react';
import {Box, HStack, Pressable} from 'native-base';
import {Image} from 'react-native';

interface UserPostsProps {
  posts: Post[];
}
const UserPosts: FC<UserPostsProps> = (props) => {
  const {posts} = props;
  return (
    <HStack marginTop={'l'} flexWrap={'wrap'}>
      {posts.map((post) => (
        <Pressable key={post.id} onPress={() => {}}>
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
