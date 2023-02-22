import {useNavigation, useRoute} from '@react-navigation/native';
import {Box, Icon, Menu, Pressable} from 'native-base';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAuth} from '../../context/AuthContext';
import {usePost} from '../../context/PostContext';
import {usePostDetailModal} from '../../context/PostDetailModalContex';
import {deletePost} from '../../data/Posts/postData';

const OptionButton = () => {
  const {user} = useAuth();
  const {post} = usePost();
  const route = useRoute();
  const {closePostDetailModal} = usePostDetailModal();
  return (
    <Box alignItems="center">
      <Menu
        w="190"
        backgroundColor={'bgDark'}
        borderWidth={0.5}
        borderColor={'iconColor'}
        trigger={(triggerProps) => {
          return (
            <Pressable accessibilityLabel="More options menu" {...triggerProps}>
              <Icon
                as={MaterialCommunityIcons}
                name="dots-vertical"
                size="lg"
                color="iconColor"
              />
            </Pressable>
          );
        }}>
        <Menu.Item
          _text={{color: 'textDark', fontSize: 'sm'}}
          onPress={() => {
            closePostDetailModal();
          }}>
          Download Image
        </Menu.Item>
        <Menu.Item
          _text={{color: 'textDark', fontSize: 'sm'}}
          display={
            post?.userId === user?.uid && route.name !== 'Feed'
              ? 'flex'
              : 'none'
          }
          onPress={() => {
            deletePost(post?.id, user?.uid).then(() => {
              closePostDetailModal();
            });
          }}>
          Delete
        </Menu.Item>
      </Menu>
    </Box>
  );
};

export default OptionButton;
