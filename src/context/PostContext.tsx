import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {favoritePost, getPostLikes, likePost} from '../data/Posts/postData';
import {useAuth} from './AuthContext';

interface PostContextProps {
  children: ReactNode;
  post: Post | null;
}

interface PostContextType {
  like: () => void;
  likes: string[];
  isUserLiked: boolean;
  post: Post | null;
  favorite: () => void;
}

const PostContext = createContext<PostContextType>({
  like: () => {},
  likes: [],
  isUserLiked: false,
  post: null,
  favorite: () => {},
});

export const PostProvider = ({children, post}: PostContextProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<FeedNavigationParamsList>>();
  const [likes, setLikes] = useState<string[]>([]);
  const {user} = useAuth();
  const like = () => {
    likePost(post?.id, user?.uid);
  };

  getPostLikes(post?.id).then((likes) => {
    setLikes(likes);
  });

  const favorite = () => {
    favoritePost(post?.id, user?.uid);
  };

  return (
    <PostContext.Provider
      value={{
        like,
        likes,
        post,
        isUserLiked: likes?.includes(user?.uid || ''),
        favorite,
      }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => {
  return useContext(PostContext);
};
