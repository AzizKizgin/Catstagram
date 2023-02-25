import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {Box} from 'native-base';
import React, {useState, useEffect} from 'react';
import Header from '../../components/Shared/Header';
import {useAuth} from '../../context/AuthContext';
import {getUserById, getUserPostsCount} from '../../data/Users/userData';
import AccountInfo from './components/AccountInfo';
import AccountTop from './components/AccountTop';
import ActivityButtons from './components/ActivityButtons';
import EditProfile from './components/EditProfile';
import UserPosts from './components/UserPosts';

const Account = () => {
  const route = useRoute<RouteProp<{params: {userId: string}}>>();
  const userId = route.params?.userId;

  const {user} = useAuth();
  const [userInfo, setUserInfo] = useState<User | null>();
  const [postsCount, setPostsCount] = useState<number>(0);

  const refreshData = () => {
    getUserById(userId || user?.uid).then((user) => {
      setUserInfo(user);
    });
  };

  getUserPostsCount(userId || user?.uid).then((count) => {
    setPostsCount(count);
  });
  useEffect(() => {
    refreshData();
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
      <UserPosts postCount={postsCount} userId={userId || user?.uid} />
    </Box>
  );
};

export default Account;
