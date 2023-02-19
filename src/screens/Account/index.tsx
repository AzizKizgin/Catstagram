import {RouteProp, useRoute} from '@react-navigation/native';
import {Box} from 'native-base';
import React, {useState, useEffect} from 'react';
import Header from '../../components/Shared/Header';
import {useAuth} from '../../context/AuthContext';
import {getUserById, getUserPosts} from '../../data/Users/userData';
import AccountInfo from './components/AccountInfo';
import AccountTop from './components/AccountTop';
import ActivityButtons from './components/ActivityButtons';
import EditProfile from './components/EditProfile';
import UserPosts from './components/UserPosts';

const Account = () => {
  const route = useRoute<RouteProp<{params: {userId: string}}>>();
  const userId = route.params?.userId;
  const [posts, setPosts] = useState<Post[]>([]);
  const {user} = useAuth();
  const [userInfo, setUserInfo] = useState<User | null>();
  useEffect(() => {
    getUserPosts(userId || user?.uid).then((posts) => {
      setPosts(posts);
    });
    getUserById(userId || user?.uid).then((user) => {
      setUserInfo(user);
    });
  }, []);

  return (
    <Box flex={1} backgroundColor={'bgDark'}>
      {userId && <Header />}
      <Box paddingX={'m'}>
        <AccountTop postCount={posts.length} />
        <AccountInfo userInfo={userInfo} />
        {userId && userId !== user?.uid ? (
          <ActivityButtons />
        ) : (
          <EditProfile userInfo={userInfo} />
        )}
      </Box>
      <UserPosts posts={posts} />
    </Box>
  );
};

export default Account;
