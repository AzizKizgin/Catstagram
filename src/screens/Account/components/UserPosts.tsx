import React, {FC, memo} from 'react';
import {Box, Pressable} from 'native-base';
import {Image} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

interface UserPostsProps {
  posts: Post[];
}
const UserPosts: FC<UserPostsProps> = (props) => {
  const {posts} = props;
  const onPress = (post: Post) => {};
  return (
    <FlatList
      style={{marginTop: 40}}
      data={posts}
      numColumns={3}
      renderItem={({item: post}) => (
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
      )}
    />
  );
};

export default memo(UserPosts);
