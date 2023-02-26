import React, {useEffect, useState} from 'react';
import {Box, Center, Text} from 'native-base';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {useAuth} from '../../context/AuthContext';
import {FlatList, RefreshControl} from 'react-native-gesture-handler';
import Post from '../../components/Post';
import {ActivityIndicator} from 'react-native';
import theme from '../../../theme';
import {getUserSavedPostIds} from '../../data/Users/userData';
import {useNavigation} from '@react-navigation/native';

const SavedPostsScreen = () => {
  const [savedPosts, setSavedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [lastDoc, setLastDoc] = useState<any>(undefined);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const {user} = useAuth();
  const navigation = useNavigation();

  const getSavedPosts = (ids: string[]) => {
    if (ids.length === 0) return;
    setLoading(true);
    firestore()
      .collection('posts')
      .where('id', 'in', ids)
      .get()
      .then((querySnapshot) => {
        let posts: Post[] = [];
        querySnapshot.forEach((documentSnapshot) => {
          posts.push(documentSnapshot.data() as Post);
        });
        setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
        setSavedPosts(posts);
      })
      .then(() => setLoading(false));
  };

  const getMoreSavedPosts = async (ids: string[]) => {
    if (lastDoc && ids.length > 0) {
      setLoading(true);
      firestore()
        .collection('posts')
        .where('id', 'in', ids)
        .startAfter(lastDoc)
        .limit(15)
        .get()
        .then((querySnapshot) => {
          let newPosts: Post[] = [];
          querySnapshot.forEach((documentSnapshot) => {
            newPosts.push(documentSnapshot.data() as Post);
          });
          setLoading(false);
          setSavedPosts((prev) => [...prev, ...newPosts]);
          setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
        });
    }
  };

  const getPosts = async () => {
    setSavedPosts([]);
    await getUserSavedPostIds(user?.uid).then((ids) => {
      getSavedPosts(ids);
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Box flex={1} backgroundColor={'bgDark'}>
      <FlatList
        data={savedPosts}
        renderItem={({item}) => <Post post={item} />}
        ListEmptyComponent={
          <Center flex={1}>
            <Text color={'textDark'}>
              {loading || refreshing ? 'Loading...' : 'No posts to show'}
            </Text>
          </Center>
        }
        keyExtractor={(item, index) => index.toString()}
        onEndReachedThreshold={0.5}
        onEndReached={async () => {
          await getUserSavedPostIds(user?.uid).then((ids) => {
            getMoreSavedPosts(ids);
          });
        }}
        ListFooterComponent={
          <Box height={50}>
            {loading && (
              <ActivityIndicator size="large" color={theme.colors.cyan} />
            )}
          </Box>
        }
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
      />
    </Box>
  );
};

export default SavedPostsScreen;
