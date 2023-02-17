import {VStack} from 'native-base';
import React, {memo, FC} from 'react';
import {PostProvider} from '../../context/PostContext';
import PostActions from './components/PostActions';
import PostImage from './components/PostImage';
import PostInfo from './components/PostInfo';
import PostUser from './components/PostUser';

interface PostProps {
  post: Post;
}
const Post: FC<PostProps> = (props) => {
  const {post} = props;
  return (
    <PostProvider post={post}>
      <VStack space={'xs'} marginBottom={'sm'}>
        <PostUser userId={post.userId} />
        <PostImage image={post.image} />
        <VStack>
          <PostActions />
          <PostInfo caption={post.caption} timestamp={post.createdAt} />
        </VStack>
      </VStack>
    </PostProvider>
  );
};

export default memo(Post);
