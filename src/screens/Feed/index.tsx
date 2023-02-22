import React, {useCallback, useEffect, useState} from 'react';
import {Box, Center, Text} from 'native-base';
import Post from '../../components/Post';
import {FlatList, RefreshControl} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import theme from '../../../theme';
import {ActivityIndicator} from 'react-native';
import firestore from '@react-native-firebase/firestore';
const Feed = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(false);
  const [lastDoc, setLastDoc] = useState<any>(undefined);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const getPosts = useCallback(async () => {
    setRefreshing(true);
    firestore()
      .collection('posts')
      .orderBy('createdAt', 'desc')
      .limit(5)
      .get()
      .then((querySnapshot) => {
        let posts: Post[] = [];
        querySnapshot.forEach((documentSnapshot) => {
          posts.push(documentSnapshot.data() as Post);
        });
        setPosts(posts);
        setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
        setRefreshing(false);
      });
  }, []);

  const getMorePosts = useCallback(() => {
    if (lastDoc) {
      setLoading(true);
      firestore()
        .collection('posts')
        .orderBy('createdAt', 'desc')
        .startAfter(lastDoc)
        .limit(15)
        .get()
        .then((querySnapshot) => {
          let newPosts: Post[] = [];
          querySnapshot.forEach((documentSnapshot) => {
            newPosts.push(documentSnapshot.data() as Post);
          });
          setLoading(false);
          setPosts((prev) => [...prev, ...newPosts]);
          setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
        });
    }
  }, [lastDoc]);

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      AsyncStorage.getItem('refreshFeed').then((refresh) => {
        if (refresh === 'true') {
          getPosts();
          AsyncStorage.removeItem('refreshFeed');
        }
      });
    });
    return unsubscribe;
  }, []);

  return (
    <Box flex={1} backgroundColor={'bgDark'}>
      <FlatList
        data={posts}
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
        onEndReached={() => {
          getMorePosts();
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

export default Feed;
