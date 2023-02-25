import React, {FC, memo, useEffect, useState} from 'react';
import {Box, Pressable} from 'native-base';
import {ActivityIndicator, Image} from 'react-native';
import {FlatList, RefreshControl} from 'react-native-gesture-handler';
import theme from '../../../../theme';
import UserPostsModal from './Modal/UserPostsModal';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {getMoreUserPosts, getUserPosts} from '../../../data/Posts/postData';

interface UserPostsProps {
  userId?: string;
  postCount?: number;
}
const UserPosts: FC<UserPostsProps> = (props) => {
  const {userId, postCount} = props;
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post>({} as Post);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [lastDoc, setLastDoc] =
    useState<
      FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>
    >();

  const getPosts = async () => {
    getUserPosts({
      userId: userId,
      limit: 15,
      setLastDoc: setLastDoc,
      setPosts: setPosts,
    });
  };
  const getMorePosts = () => {
    getMoreUserPosts({
      userId: userId,
      limit: 15,
      lastDoc: lastDoc,
      setLastDoc: setLastDoc,
      setPosts: setPosts,
      setLoading: setLoading,
    });
  };

  const onPress = (post: Post) => {
    setSelectedPost(post);
    setModalVisible(true);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <FlatList
        style={{marginTop: 40}}
        data={posts}
        numColumns={3}
        onEndReached={() => {
          getMorePosts();
        }}
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
      <UserPostsModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        selectedPost={selectedPost}
      />
    </>
  );
};

export default memo(UserPosts);
