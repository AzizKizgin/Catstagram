import {Box, VStack, Icon, Text, Center, Button} from 'native-base';
import React, {FC, useEffect, useState} from 'react';
import {Modal} from 'react-native';
import Comment from '../../../Comment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TextInput from '../../../Shared/TextInput';
import SendButton from '../../../Shared/SendButton';
import {addComment} from '../../../../data/postData';
import {useAuth} from '../../../../context/AuthContext';
import {getComments} from '../../../../data/getData';
import {FlatList} from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';

interface CommentModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  postId?: string;
}
const CommentModal: FC<CommentModalProps> = (props) => {
  const {isOpen, postId, setIsOpen} = props;
  const [text, setText] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const {user} = useAuth();
  getComments(postId).then((comments) => setComments(comments));
  return (
    <Modal
      visible={isOpen}
      onRequestClose={() => setIsOpen(false)}
      animationType={'slide'}>
      <Box flex={1} backgroundColor={'bgDark'}>
        <Box
          paddingY={'sm'}
          flexDirection={'row'}
          backgroundColor={'itemBgDark'}>
          <Icon
            as={Ionicons}
            name="ios-arrow-back"
            size="xl"
            color="iconColor"
            marginLeft={'sm'}
            onPress={() => setIsOpen(false)}
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
            <Comment
              comment={item.text}
              userId={item.userId}
              createdAt={item.createdAt}
            />
          )}
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
              addComment(postId, text, user?.uid);
            }}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default CommentModal;
