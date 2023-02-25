import {Box, Icon} from 'native-base';
import React, {FC, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {usePost} from '../../context/PostContext';
import AnimatedPressable from '../AnimatedComponents/AnimatedPressable';
import PostCommentModal from '../Post/components/PostCommentModal';

const CommentButton = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const {post} = usePost();
  const onPress = () => {
    setModalVisible(true);
  };
  return (
    <>
      <AnimatedPressable onPress={onPress}>
        <Box>
          <Icon
            as={Ionicons}
            name="ios-chatbox-outline"
            size="23"
            color="iconColor"
            marginTop={'xxs'}
          />
        </Box>
      </AnimatedPressable>
      <PostCommentModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        postId={post?.id}
      />
    </>
  );
};

export default CommentButton;
