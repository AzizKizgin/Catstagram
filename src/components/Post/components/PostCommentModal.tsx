import React, {FC, useEffect, useState} from 'react';
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

interface PostCommentModalProps {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  postId?: string;
}
const PostCommentModal: FC<PostCommentModalProps> = (props) => {
  const {modalVisible, setModalVisible, postId} = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [newComment, setNewComment] = useState<Comment[]>([]);
  const [allComments, setAllComments] = useState<Comment[]>([]);
  const [text, setText] = useState('');
  const {user} = useAuth();

  const getUserComments = async () => {
    let comments: Comment[] = [];
    firestore()
      .collection('posts')
      .doc(postId)
      .collection('activities')
      .doc('postComments')
      .collection('comments')
      .where('userId', '==', user?.uid)
      .orderBy('likes', 'desc')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          comments.push(documentSnapshot.data() as Comment);
        });
      });
    return comments;
  };

  const getAllComments = async () => {
    let comments: Comment[] = [];
    firestore()
      .collection('posts')
      .doc(postId)
      .collection('activities')
      .doc('postComments')
      .collection('comments')
      .orderBy('likes', 'desc')
      .where('userId', '!=', user?.uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          comments.push(documentSnapshot.data() as Comment);
        });
      });
    return comments;
  };

  const getPostComments = async () => {
    setLoading(true);
    getUserComments()
      .then((comments) => setAllComments(comments))
      .then(() => {
        getAllComments()
          .then((comments) => setAllComments((prev) => [...prev, ...comments]))
          .then(() => setLoading(false));
      });
  };

  return (
    <Modal
      isVisible={modalVisible}
      onBackButtonPress={() => setModalVisible(false)}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      onModalShow={() => {
        getPostComments();
      }}
      onModalHide={() => {
        setAllComments([]);
        setNewComment([]);
      }}
      style={{margin: 0}}>
      <Box flex={1} backgroundColor={'bgDark'}>
        <Header onPress={() => setModalVisible(false)} />
        {newComment.map((comment, index) => (
          <Comment comment={comment} postId={postId} key={index} />
        ))}
        <FlatList
          data={allComments}
          keyExtractor={(item, index) => item.id as string}
          renderItem={({item}) => <Comment comment={item} postId={postId} />}
          refreshControl={
            <RefreshControl
              colors={[theme.colors.cyan]}
              refreshing={loading}
              onRefresh={async () => {
                setLoading(true);
                setAllComments([]);
                setNewComment([]);
                getPostComments();
                setLoading(false);
              }}
            />
          }
          ListEmptyComponent={
            <Center flex={1} marginTop={'s'}>
              <Text color={'textDark'}>No comments yet</Text>
            </Center>
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
              addComment(postId, text, user?.uid, user?.displayName);
              setText('');
              const newComment: Comment = {
                createdAt: new Date().getTime().toString(),
                text,
                userId: user?.uid as string,
                username: user?.displayName as string,
                id: '',
                likes: [],
              };
              setNewComment((prev) => [newComment, ...prev]);
            }}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default PostCommentModal;
