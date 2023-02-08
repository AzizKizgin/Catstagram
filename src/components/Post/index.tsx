import {VStack} from 'native-base';
import React from 'react';
import PostBottom from './components/PostBottom';
import PostImage from './components/PostImage';
import PostUser from './components/PostUser';

const Post = () => {
  return (
    <VStack space={'xs'}>
      <PostUser />
      <PostImage
        image={
          'http://www.alleycat.org/wp-content/uploads/2019/03/FELV-cat.jpg'
        }
      />
      <PostBottom />
    </VStack>
  );
};

export default Post;
