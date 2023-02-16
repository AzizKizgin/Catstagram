import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {getPostLikes, likePost} from '../data/Posts/postData';
import {useAuth} from './AuthContext';

interface PostContextProps {
  children: ReactNode;
  post: Post | null;
}

interface PostContextType {
  like: () => void;
  likes: string[];
  isUserLiked: boolean;
  onCommentPress: () => void;
  post: Post | null;
}

const PostContext = createContext<PostContextType>({
  like: () => {},
  likes: [],
  isUserLiked: false,
  onCommentPress: () => {},
  post: null,
});

export const PostProvider = ({children, post}: PostContextProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<FeedNavigationParamsList>>();
  const [likes, setLikes] = useState<string[]>([]);
  const {user} = useAuth();
  const like = () => {
    likePost(post?.id, user?.uid);
  };

  const onCommentPress = () => {
    navigation.navigate('Comments', {postId: post?.id});
  };

  getPostLikes(post?.id).then((likes) => {
    setLikes(likes);
  });

  return (
    <PostContext.Provider
      value={{
        like,
        likes,
        post,
        isUserLiked: likes.includes(user?.uid || ''),
        onCommentPress,
      }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => {
  return useContext(PostContext);
};
