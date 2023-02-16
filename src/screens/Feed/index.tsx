import React, {useEffect, useState} from 'react';
import {Box, Center, Text} from 'native-base';
import Post from '../../components/Post';
import {FlatList, RefreshControl} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {getPosts} from '../../data/Posts/postData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import theme from '../../../theme';
import {ActivityIndicator} from 'react-native';

const Feed = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(false);
  const refreshData = () => {
    getPosts().then((posts) => {
      setPosts(posts);
    });
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      AsyncStorage.getItem('refresh').then((value) => {
        if (value === 'true') {
          refreshData();
          AsyncStorage.setItem('refresh', 'false');
        }
      });
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    getPosts().then((posts) => setPosts(posts));
  }, []);

  return (
    <Box flex={1} backgroundColor={'bgDark'}>
      <FlatList
        data={posts}
        renderItem={({item}) => <Post post={item} />}
        ListEmptyComponent={
          <Center flex={1}>
            <ActivityIndicator size="large" color={theme.colors.cyan} />
          </Center>
        }
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={<Box height={50} />}
        refreshControl={
          <RefreshControl
            colors={[theme.colors.cyan]}
            refreshing={loading}
            onRefresh={async () => {
              setLoading(true);
              refreshData();
              setLoading(false);
            }}
          />
        }
      />
    </Box>
  );
};

export default Feed;
