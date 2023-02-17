import {Box, Center, HStack, Pressable, Text} from 'native-base';
import React, {useState, useEffect} from 'react';
import {Image} from 'react-native';
import {useAuth} from '../../context/AuthContext';
import {getUserById, getUserPosts} from '../../data/Users/userData';
import {getPostById} from '../../data/Posts/postData';
import AccountInfo from './components/AccountInfo';
import AccountTop from './components/AccountTop';
import EditProfile from './components/EditProfile';
import UserPosts from './components/UserPosts';

const Account = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const {user} = useAuth();
  const [userInfo, setUserInfo] = useState<User | null>();

  useEffect(() => {
    getUserPosts(user?.uid).then((posts) => {
      setPosts(posts);
    });
    getUserById(user?.uid).then((user) => {
      setUserInfo(user);
    });
  }, []);
  return (
    <Box flex={1} backgroundColor={'bgDark'}>
      <Box paddingX={'m'}>
        <AccountTop postCount={posts.length} />
        <AccountInfo userInfo={userInfo} />
        <EditProfile userInfo={userInfo} />
      </Box>
      <UserPosts posts={posts} />
    </Box>
  );
};

export default Account;
