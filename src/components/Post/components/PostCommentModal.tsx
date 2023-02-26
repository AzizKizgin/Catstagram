import React, {FC, memo, useEffect, useState} from 'react';
import {Box, Center, Text} from 'native-base';
import Modal from 'react-native-modal';
import Header from '../../Shared/Header';
import firestore from '@react-native-firebase/firestore';
import {useAuth} from '../../../context/AuthContext';
import Comment from '../../Comment';
import {FlatList, RefreshControl} from 'react-native-gesture-handler';
import theme from '../../../../theme';
import TextInput from '../../Shared/TextInput';
import SendButton from '../../Shared/SendButton';
import {addComment} from '../../../data/Comments/commentData';
import {ActivityIndicator} from 'react-native';

interface PostCommentModalProps {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  postId?: string;
}
const PostCommentModal: FC<PostCommentModalProps> = (props) => {
  const {modalVisible, setModalVisible, postId} = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [newComment, setNewComment] = useState<Comment[]>([]);
  const [allComments, setAllComments] = useState<Comment[]>([]);
  const [text, setText] = useState('');
  const {user} = useAuth();

  const getUserComments = async () => {
    firestore()
      .collection('posts')
      .doc(postId)
      .collection('activities')
      .doc('postComments')
      .collection('comments')
      .where('userId', '==', user?.uid)
      .get()
      .then((querySnapshot) => {
        let comments: Comment[] = [];
        querySnapshot.forEach((documentSnapshot) => {
          comments.push(documentSnapshot.data() as Comment);
        });
        comments.sort((a, b) => {
          if (b.likes && a.likes) {
            return b.likes.length - a.likes.length;
          }
          return 0;
        });
        setAllComments(comments);
      });
  };

  const getAllComments = async () => {
    firestore()
      .collection('posts')
      .doc(postId)
      .collection('activities')
      .doc('postComments')
      .collection('comments')
      .where('userId', '!=', user?.uid)
      .get()
      .then((querySnapshot) => {
        let comments: Comment[] = [];
        querySnapshot.forEach((documentSnapshot) => {
          comments.push(documentSnapshot.data() as Comment);
        });
        comments.sort((a, b) => {
          if (b.likes && a.likes) {
            return b.likes.length - a.likes.length;
          }
          return 0;
        });
        setAllComments((prev) => [...prev, ...comments]);
      });
  };

  const getPostComments = async () => {
    getUserComments().then(() => {
      getAllComments();
    });
  };

  return (
    <Modal
      isVisible={modalVisible}
      onBackButtonPress={() => setModalVisible(false)}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      onModalShow={() => {
        setLoading(true);
        getPostComments().then(() => setLoading(false));
      }}
      onModalHide={() => {
        setAllComments([]);
        setNewComment([]);
      }}
      style={{margin: 0}}>
      <Box flex={1} backgroundColor={'bgDark'}>
        <Header onPress={() => setModalVisible(false)} />
        {loading || refreshing ? (
          <Box flex={1} justifyContent={'center'} alignItems={'center'}>
            <ActivityIndicator size={'large'} color={theme.colors.cyan} />
          </Box>
        ) : (
          <Box flex={1}>
            {newComment.map((comment, index) => (
              <Comment
                comment={comment}
                postId={postId}
                key={comment.id as string}
              />
            ))}
            <FlatList
              style={{flex: 1}}
              data={allComments}
              keyExtractor={(item, index) => item.id as string}
              renderItem={({item}) => (
                <Comment comment={item} postId={postId} />
              )}
              refreshControl={
                <RefreshControl
                  colors={[theme.colors.cyan]}
                  refreshing={refreshing}
                  onRefresh={async () => {
                    setRefreshing(true);
                    setAllComments([]);
                    setNewComment([]);
                    getPostComments().then(() => setRefreshing(false));
                  }}
                />
              }
              ListEmptyComponent={
                <Center flex={1} marginTop={'s'}>
                  <Text color={'textDark'}>No comments yet</Text>
                </Center>
              }
            />
          </Box>
        )}
        <Box
          flexDirection={'row'}
          backgroundColor={'itemBgDark'}
          padding={'sm'}
          position={'absolute'}
          bottom={0}
          alignItems={'center'}
          justifyContent={'space-between'}>
          <TextInput
            placeholder={'Add a comment...'}
            value={text}
            onChangeText={setText}
          />
          <SendButton
            onPress={() => {
              addComment(postId, text, user?.uid, user?.displayName);
              setText('');
              const newComment: Comment = {
                createdAt: new Date().getTime().toString(),
                text,
                userId: user?.uid as string,
                username: user?.displayName as string,
                id: '',
                likes: [],
                userImage: user?.photoURL as string,
              };
              setNewComment((prev) => [newComment, ...prev]);
            }}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default memo(PostCommentModal);
