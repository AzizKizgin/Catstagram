import {Box, VStack, Icon, Text, Center, Input, HStack} from 'native-base';
import React, {FC, useEffect} from 'react';
import {Modal} from 'react-native';
import Comment from '../../../Comment';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface CommentModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  comments: Array<{
    comment: string;
    user: {
      name: string;
      image: string;
    };
  }>;
}
const CommentModal: FC<CommentModalProps> = (props) => {
  const {isOpen, comments, setIsOpen} = props;

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
        <VStack space={2} flex={1} paddingX={'sm'}>
          {comments.map((comment, index) => (
            <Comment
              key={index}
              comment={comment.comment}
              user={comment.user}
            />
          ))}
        </VStack>
        <Box
          flexDirection={'row'}
          backgroundColor={'itemBgDark'}
          padding={'sm'}
          alignItems={'center'}
          justifyContent={'space-between'}>
          <Input
            placeholder="Add a comment..."
            flex={1}
            focusOutlineColor={'inactiveTextDark'}
            backgroundColor={'itemBgDark'}
            fontSize={'sm'}
            color={'textDark'}
            cursorColor={'textDark'}
          />
          <Icon
            as={Ionicons}
            name="ios-send"
            size="lg"
            color="iconColor"
            marginLeft={'sm'}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default CommentModal;
