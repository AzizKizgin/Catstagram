import {VStack} from 'native-base';
import React, {useState, memo, FC} from 'react';
import CommentModal from './components/modals/CommentModal';
import PostActions from './components/PostActions';
import PostImage from './components/PostImage';
import PostInfo from './components/PostInfo';
import PostUser from './components/PostUser';
const fakeComments = [
  {
    comment: 'Lorem ipsum dolor sit amet.',
    user: {
      name: 'User Name',
      image: 'https://picsum.photos/331',
    },
  },
  {
    comment: 'Consectetur adipiscing elit.',
    user: {
      name: 'User Name',
      image: 'https://picsum.photos/331',
    },
  },
];
interface PostProps {
  post: Post;
}
const Post: FC<PostProps> = (props) => {
  const {post} = props;
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const onCommentPress = () => {
    setIsCommentModalOpen(true);
  };
  return (
    <VStack space={'xs'}>
      <PostUser />
      <PostImage image={post.image} />
      <VStack space={'0.5'}>
        <PostActions onCommentPress={onCommentPress} />
        <PostInfo caption={post.caption} timestamp={post.createdAt} />
      </VStack>
      <CommentModal
        isOpen={isCommentModalOpen}
        setIsOpen={setIsCommentModalOpen}
        comments={fakeComments}
      />
    </VStack>
  );
};

export default memo(Post);
