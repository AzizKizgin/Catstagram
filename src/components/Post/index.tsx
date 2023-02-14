import {VStack} from 'native-base';
import React, {useState, memo, FC} from 'react';
import CommentModal from './components/modals/CommentModal';
import PostActions from './components/PostActions';
import PostImage from './components/PostImage';
import PostInfo from './components/PostInfo';
import PostUser from './components/PostUser';

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
      <PostUser userId={post.userId} />
      <PostImage image={post.image} />
      <VStack space={'0.5'}>
        <PostActions onCommentPress={onCommentPress} />
        <PostInfo caption={post.caption} timestamp={post.createdAt} />
      </VStack>
      <CommentModal
        isOpen={isCommentModalOpen}
        setIsOpen={setIsCommentModalOpen}
        postId={post.id}
      />
    </VStack>
  );
};

export default memo(Post);
