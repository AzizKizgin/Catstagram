import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {VStack} from 'native-base';
import React, {useState, memo, FC} from 'react';
import PostActions from './components/PostActions';
import PostImage from './components/PostImage';
import PostInfo from './components/PostInfo';
import PostUser from './components/PostUser';

interface PostProps {
  post: Post;
}
const Post: FC<PostProps> = (props) => {
  const {post} = props;
  const navigation =
    useNavigation<NativeStackNavigationProp<FeedNavigationParamsList>>();
  const onCommentPress = () => {
    navigation.navigate('Comments', {postId: post.id});
  };
  return (
    <VStack space={'xs'}>
      <PostUser userId={post.userId} />
      <PostImage image={post.image} />
      <VStack space={'0.5'}>
        <PostActions onCommentPress={onCommentPress} />
        <PostInfo caption={post.caption} timestamp={post.createdAt} />
      </VStack>
    </VStack>
  );
};

export default memo(Post);
