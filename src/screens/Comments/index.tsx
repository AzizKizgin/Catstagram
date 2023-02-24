import {Box, Icon, Text, Center} from 'native-base';
import React, {useState, useEffect} from 'react';
import {FlatList, RefreshControl} from 'react-native-gesture-handler';
import Comment from '../../components/Comment';
import SendButton from '../../components/Shared/SendButton';
import TextInput from '../../components/Shared/TextInput';
import {useAuth} from '../../context/AuthContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {addComment} from '../../data/Comments/commentData';
import theme from '../../../theme';
import {BackHandler} from 'react-native';
import {goBack} from '../../utils/helpers';
import firestore from '@react-native-firebase/firestore';

const Comments = () => {
  const route = useRoute<RouteProp<FeedNavigationParamsList, 'Comments'>>();
  const navigation = useNavigation();
  const postId = route.params?.postId;
  const [text, setText] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const {user} = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [newComment, setNewComment] = useState<Comment[]>([]);
  const getPostComments = () => {
    setLoading(true);
    firestore()
      .collection('posts')
      .doc(postId)
      .collection('activities')
      .doc('postComments')
      .collection('comments')
      .orderBy('likes', 'desc')
      .get()
      .then((querySnapshot) => {
        let comments: Comment[] = [];
        querySnapshot.forEach((documentSnapshot) => {
          comments.push(documentSnapshot.data() as Comment);
        });
        const userComments = comments.filter(
          (comment) => comment.userId === user?.uid,
        );
        const filteredComment = comments.filter(
          (comment) => comment.userId !== user?.uid,
        );
        setComments([...userComments, ...filteredComment]);
        setLoading(false);
      });
  };

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {display: 'none'},
    });
    getPostComments();
  }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        goBack(navigation);
        return true;
      },
    );
    return () => backHandler.remove();
  }, []);

  return (
    <Box flex={1} backgroundColor={'bgDark'}>
      <Box paddingY={'sm'} flexDirection={'row'} backgroundColor={'itemBgDark'}>
        <Icon
          as={Ionicons}
          name="ios-arrow-back"
          size="xl"
          color="iconColor"
          marginLeft={'sm'}
          onPress={() => goBack(navigation)}
        />
        <Center flex={1}>
          <Text
            color={'white'}
            fontSize={'xl'}
            fontWeight={'bold'}
            marginRight={'xl'}>
            Comments
          </Text>
        </Center>
      </Box>
      {newComment.map((comment, index) => (
        <Comment comment={comment} postId={postId} key={index} />
      ))}
      <FlatList
        data={comments}
        keyExtractor={(item, index) => item.id as string}
        renderItem={({item}) => <Comment comment={item} postId={postId} />}
        refreshControl={
          <RefreshControl
            colors={[theme.colors.cyan]}
            refreshing={loading}
            onRefresh={async () => {
              setLoading(true);
              setComments([]);
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
  );
};

export default Comments;
