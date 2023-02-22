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
  getUserPosts,
} from '../../data/Users/userData';
import AccountInfo from './components/AccountInfo';
import AccountTop from './components/AccountTop';
import ActivityButtons from './components/ActivityButtons';
import EditProfile from './components/EditProfile';
import UserPosts from './components/UserPosts';

const Account = () => {
  const route = useRoute<RouteProp<{params: {userId: string}}>>();
  const userId = route.params?.userId;
  const navigation = useNavigation();
  const [posts, setPosts] = useState<Post[]>([]);
  const {user} = useAuth();
  const [userInfo, setUserInfo] = useState<User | null>();
  const [userFallowers, setUserFallowers] = useState<User[]>([]);
  const [userFallowing, setUserFallowing] = useState<User[]>([]);

  const refreshData = () => {
    getUserPosts(userId || user?.uid).then((posts) => {
      setPosts(posts);
      console.log(posts.length);
    });
    getUserById(userId || user?.uid).then((user) => {
      setUserInfo(user);
    });
    getUserFallowers(userId || user?.uid).then((users) => {
      setUserFallowers(users);
    });
    getUserFallowing(userId || user?.uid).then((users) => {
      setUserFallowing(users);
    });
  };

  useEffect(() => {
    console.log(posts.length);
    refreshData();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      AsyncStorage.getItem('refreshProfile').then((refresh) => {
        if (refresh === 'true') {
          getUserPosts(userId || user?.uid).then((posts) => {
            setPosts(posts);
          });
          AsyncStorage.removeItem('refreshProfile');
        }
      });
    });
    return unsubscribe;
  }, []);

  return (
    <Box flex={1} backgroundColor={'bgDark'}>
      {userId && userId !== user?.uid && <Header />}
      <Box paddingX={'m'}>
        <AccountTop
          postCount={posts.length}
          fallowerCount={userFallowers.length}
          fallowingCount={userFallowing.length}
        />
        <AccountInfo userInfo={userInfo} />
        {userId && userId !== user?.uid ? (
          <ActivityButtons userId={userId} userToken={userInfo?.deviceToken} />
        ) : (
          <EditProfile userInfo={userInfo} />
        )}
      </Box>
      <UserPosts posts={posts} />
    </Box>
  );
};

export default Account;
