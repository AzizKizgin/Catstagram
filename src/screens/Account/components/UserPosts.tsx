import React, {FC, memo, useState} from 'react';
import {Box, Pressable} from 'native-base';
import {ActivityIndicator, Image} from 'react-native';
import {FlatList, RefreshControl} from 'react-native-gesture-handler';
import theme from '../../../../theme';

interface UserPostsProps {
  posts: Post[];
  getMorePosts: () => void;
  getPosts: () => Promise<void>;
  loading: boolean;
}
const UserPosts: FC<UserPostsProps> = (props) => {
  const {posts, getMorePosts, getPosts, loading} = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
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
        onEndReached={() => {
          getMorePosts();
        }}
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
        refreshControl={
          <RefreshControl
            colors={[theme.colors.cyan]}
            refreshing={refreshing}
            onRefresh={async () => {
              setRefreshing(true);
              getPosts().then(() => {
                setRefreshing(false);
              });
            }}
          />
        }
        ListFooterComponent={
          <Box height={50} marginTop={'xs'}>
            {loading && (
              <ActivityIndicator size="large" color={theme.colors.cyan} />
            )}
          </Box>
        }
      />
    </>
  );
};

export default memo(UserPosts);
