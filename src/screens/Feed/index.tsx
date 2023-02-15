import React, {useEffect, useState} from 'react';
import {Box} from 'native-base';
import Post from '../../components/Post';
import {FlatList} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {getPosts} from '../../data/Posts/postData';

const Feed = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const navigation = useNavigation();
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getPosts().then((posts) => setPosts(posts));
    });
    return unsubscribe;
  }, []);

  return (
    <Box flex={1} backgroundColor={'bgDark'}>
      <FlatList
        data={posts}
        renderItem={({item}) => <Post post={item} />}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={<Box height={50} />}
      />
    </Box>
  );
};

export default Feed;
