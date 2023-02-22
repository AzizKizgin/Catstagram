import AsyncStorage from '@react-native-async-storage/async-storage';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {Box} from 'native-base';
import React, {useState, useEffect} from 'react';
import Header from '../../components/Shared/Header';
import {useAuth} from '../../context/AuthContext';
import {
  getUserById,
  getUserFallowers,
  getUserFallowing,
  getUserPostsCount,
} from '../../data/Users/userData';
import AccountInfo from './components/AccountInfo';
import AccountTop from './components/AccountTop';
import ActivityButtons from './components/ActivityButtons';
import EditProfile from './components/EditProfile';
import UserPosts from './components/UserPosts';
import firestore from '@react-native-firebase/firestore';

const Account = () => {
  const route = useRoute<RouteProp<{params: {userId: string}}>>();
  const userId = route.params?.userId;
  const navigation = useNavigation();
  const [posts, setPosts] = useState<Post[]>([]);
  const {user} = useAuth();
  const [userInfo, setUserInfo] = useState<User | null>();
  const [lastDoc, setLastDoc] = useState<any>(undefined);
  const [postsCount, setPostsCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const getPosts = async () => {
    firestore()
      .collection('posts')
      .orderBy('createdAt', 'desc')
      .where('userId', '==', userId || user?.uid)
      .limit(15)
      .get()
      .then((querySnapshot) => {
        let posts: Post[] = [];
        querySnapshot.forEach((documentSnapshot) => {
          posts.push(documentSnapshot.data() as Post);
        });
        setPosts(posts);
        setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
      });
  };

  const getMorePosts = () => {
    if (lastDoc) {
      setLoading(true);
      firestore()
        .collection('posts')
        .orderBy('createdAt', 'desc')
        .where('userId', '==', userId || user?.uid)
        .startAfter(lastDoc)
        .limit(15)
        .get()
        .then((querySnapshot) => {
          let newPosts: Post[] = [];
          querySnapshot.forEach((documentSnapshot) => {
            newPosts.push(documentSnapshot.data() as Post);
          });
          setPosts([...posts, ...newPosts]);
          setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  const refreshData = () => {
    getPosts();
    getUserById(userId || user?.uid).then((user) => {
      setUserInfo(user);
    });
  };

  useEffect(() => {
    getUserPostsCount(userId || user?.uid).then((count) => {
      setPostsCount(count);
    });
    refreshData();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const shouldRefresh = await AsyncStorage.getItem('refreshProfile');
      if (shouldRefresh !== null && shouldRefresh === 'true') {
        getPosts();
        getUserPostsCount(userId || user?.uid).then((count) => {
          setPostsCount(count);
        });
        AsyncStorage.removeItem('refreshProfile');
      }
    });
    return unsubscribe;
  }, []);

  return (
    <Box flex={1} backgroundColor={'bgDark'}>
      {userId && userId !== user?.uid && <Header />}
      <Box paddingX={'m'}>
        <AccountTop userId={userId || user?.uid} postCount={postsCount} />
        <AccountInfo userInfo={userInfo} />
        {userId && userId !== user?.uid ? (
          <ActivityButtons userId={userId} userToken={userInfo?.deviceToken} />
        ) : (
          <EditProfile userInfo={userInfo} />
        )}
      </Box>
      <UserPosts
        posts={posts}
        getMorePosts={getMorePosts}
        getPosts={getPosts}
        loading={loading}
      />
    </Box>
  );
};

export default Account;
