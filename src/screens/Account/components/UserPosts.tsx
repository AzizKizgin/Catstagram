import React, {FC, memo, useState} from 'react';
import {Box, Pressable} from 'native-base';
import {Image} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import PostDetailModal from '../../../components/Shared/Modals/PostDetailModal';

interface UserPostsProps {
  posts: Post[];
}
const UserPosts: FC<UserPostsProps> = (props) => {
  const {posts} = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState(0);
  const onPress = (index: number) => {
    setId(index);
    setModalVisible(true);
  };
  return (
    <>
      <FlatList
        style={{marginTop: 40}}
        data={posts}
        numColumns={3}
        renderItem={({item: post, index}) => (
          <Pressable key={post.id} onPress={() => onPress(index)}>
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
      <PostDetailModal
        isVisible={modalVisible}
        setIsVisible={setModalVisible}
        currentPost={posts[id]}
      />
    </>
  );
};

export default memo(UserPosts);
