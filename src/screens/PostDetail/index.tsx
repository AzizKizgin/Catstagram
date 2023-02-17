import React, {useEffect, useState} from 'react';
import {Box, FlatList, ScrollView, Text} from 'native-base';
import Header from '../../components/Shared/Header';
import Post from '../../components/Post';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {addComment, getComments} from '../../data/Comments/commentData';
import Comment from '../../components/Comment';
import SendButton from '../../components/Shared/SendButton';
import {useAuth} from '../../context/AuthContext';
import TextInput from '../../components/Shared/TextInput';

const PostDetail = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<AccountNavigationParamsList>>();
  const post = route.params?.post as Post;
  const [text, setText] = useState('');
  const {user} = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);

  getComments(post.id).then((comments) => setComments(comments));
  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {display: 'none'},
    });
  }, []);
  return (
    <Box flex={1} backgroundColor={'bgDark'}>
      <Header />
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
            addComment(post.id, text, user?.uid, user?.displayName);
            setText('');
          }}
        />
      </Box>
    </Box>
  );
};

export default PostDetail;
