import React, {FC, useEffect, useState, memo} from 'react';
import {Box, Text} from 'native-base';
import {useAuth} from '../../../context/AuthContext';
import {addComment, getComments} from '../../../data/Comments/commentData';
import Header from '../Header';
import Comment from '../../Comment';
import TextInput from '../TextInput';
import SendButton from '../SendButton';
import Post from '../../Post';
import Modal from 'react-native-modal';
import {FlatList, RefreshControl} from 'react-native-gesture-handler';
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
  const [loading, setLoading] = useState(false);

  const closeModal = () => {
    setIsVisible(false);
    setPost(undefined);
    setComments([]);
  };
  return (
    <Modal
      style={{margin: 0}}
      isVisible={isVisible}
      onBackButtonPress={closeModal}
      animationInTiming={100}
      onModalShow={() => {
        setPost(currentPost);
        setLoading(true);
        getComments(currentPost?.id)
          .then((comments) => setComments(comments))
          .then(() => setLoading(false));
      }}
      coverScreen={true}>
      <Box flex={1} backgroundColor={'bgDark'}>
        <Header onPress={closeModal} />
        {post && (
          <Box flex={1}>
            <FlatList
              data={[post]}
              refreshControl={
                <RefreshControl
                  refreshing={loading}
                  onRefresh={() => {
                    setLoading(true);
                    getComments(post?.id)
                      .then((comments) => setComments(comments))
                      .then(() => setLoading(false));
                  }}
                />
              }
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
                    ListEmptyComponent={
                      <Box
                        flex={1}
                        justifyContent={'center'}
                        alignItems={'center'}
                        padding={'sm'}>
                        <Text color={'textDark'}>No comments yet</Text>
                      </Box>
                    }
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
      </Box>
    </Modal>
  );
};

export default memo(PostDetailModal);
