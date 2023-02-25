import React, {FC, useState} from 'react';
import Header from '../../../../components/Shared/Header';
import {Box, Center, Text} from 'native-base';
import Post from '../../../../components/Post';
import Modal from 'react-native-modal';
import {FlatList} from 'react-native-gesture-handler';

interface UserPostsModalProps {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  selectedPost: Post;
}
const UserPostsModal: FC<UserPostsModalProps> = (props) => {
  const {modalVisible, setModalVisible, selectedPost} = props;

  return (
    <Modal
      isVisible={modalVisible}
      onBackButtonPress={() => setModalVisible(false)}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      onModalShow={() => {}}
      onModalHide={() => {}}
      style={{margin: 0}}>
      <Box flex={1} backgroundColor={'bgDark'}>
        <Header onPress={() => setModalVisible(false)} />
        <FlatList
          style={{flex: 1}}
          data={[selectedPost]}
          renderItem={({item}) => <Post post={item} />}
        />
      </Box>
    </Modal>
  );
};

export default UserPostsModal;
