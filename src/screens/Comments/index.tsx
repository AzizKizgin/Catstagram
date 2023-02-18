import {Box, Icon, Text, Center} from 'native-base';
import React, {useState, useEffect} from 'react';
import {FlatList, RefreshControl} from 'react-native-gesture-handler';
import Comment from '../../components/Comment';
import SendButton from '../../components/Shared/SendButton';
import TextInput from '../../components/Shared/TextInput';
import {useAuth} from '../../context/AuthContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {addComment, getComments} from '../../data/Comments/commentData';
import theme from '../../../theme';

const Comments = () => {
  const route = useRoute<RouteProp<FeedNavigationParamsList, 'Comments'>>();
  const navigation = useNavigation();
  const postId = route.params?.postId;
  const [text, setText] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const {user} = useAuth();
  const [loading, setLoading] = useState<boolean>(false);

  const getPostComments = () => {
    getComments(postId).then((comments) => {
      setComments(comments);
    });
  };
  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {display: 'none'},
    });
    getPostComments();
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
          onPress={() => navigation.goBack()}
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
      <FlatList
        data={comments}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <Comment comment={item} createdAt={item.createdAt} postId={postId} />
        )}
        refreshControl={
          <RefreshControl
            colors={[theme.colors.cyan]}
            refreshing={loading}
            onRefresh={async () => {
              setLoading(true);
              getPostComments();
              setLoading(false);
            }}
          />
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
            setComments([newComment, ...comments]);
          }}
        />
      </Box>
    </Box>
  );
};

export default Comments;
