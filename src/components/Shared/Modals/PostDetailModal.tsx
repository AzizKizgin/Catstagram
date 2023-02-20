import React, {FC, useEffect, useState, memo} from 'react';
import {Box, FlatList} from 'native-base';
import {Modal} from 'react-native';
import {useAuth} from '../../../context/AuthContext';
import {addComment, getComments} from '../../../data/Comments/commentData';
import Header from '../Header';
import Comment from '../../Comment';
import TextInput from '../TextInput';
import SendButton from '../SendButton';
import Post from '../../Post';

interface PostDetailProps {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
  currentPost: Post;
}

const PostDetailModal: FC<PostDetailProps> = (props) => {
  const {isVisible, setIsVisible, currentPost} = props;
  const [text, setText] = useState('');
  const {user} = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [post, setPost] = useState<Post>();
  useEffect(() => {
    setPost(currentPost);
    getComments(currentPost?.id).then((comments) => setComments(comments));
  }, [isVisible, currentPost]);

  const closeModal = () => {
    setPost(undefined);
    setComments([]);
    setIsVisible(false);
  };
  return (
    <Modal
      animationType="slide"
      visible={isVisible}
      onRequestClose={closeModal}>
      {post && (
        <Box flex={1} backgroundColor={'bgDark'}>
          <Header onPress={closeModal} />
          <FlatList
            data={[post]}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => <Post post={item} isDetail={true} />}
            ListFooterComponent={
              <>
                <FlatList
                  data={comments}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item}) => (
                    <Comment
                      comment={item}
                      createdAt={item.createdAt}
                      key={item.id}
                      postId={post.id}
                    />
                  )}
                />
              </>
            }
          />
          <Box
            flexDirection={'row'}
            backgroundColor={'itemBgDark'}
            padding={'sm'}
            alignItems={'center'}
            justifyContent={'space-between'}>
            <TextInput
              placeholder={'Add a comment...'}
              value={text}
              onChangeText={setText}
            />
            <SendButton
              onPress={() => {
                addComment(post?.id, text, user?.uid, user?.displayName);
                setComments([
                  {
                    id: '',
                    likes: [],
                    text,
                    userId: user?.uid || '',
                    username: user?.displayName || '',
                    createdAt: new Date().getTime().toString(),
                  },
                  ...comments,
                ]);
                setText('');
              }}
            />
          </Box>
        </Box>
      )}
    </Modal>
  );
};

export default memo(PostDetailModal);
