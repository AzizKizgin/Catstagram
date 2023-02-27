import {useRoute} from '@react-navigation/native';
import {Box, Icon, Menu, Pressable} from 'native-base';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAuth} from '../../context/AuthContext';
import {usePost} from '../../context/PostContext';
import {useToast} from '../../context/ToastContext';
import {deletePost} from '../../data/Posts/postData';
import {downloadImage} from '../../utils/helpers';

const OptionButton = () => {
  const {user} = useAuth();
  const {post} = usePost();
  const route = useRoute();
  const {showToast} = useToast();
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
            downloadImage(post?.image.imageUri).then(() => {
              showToast('Image has been downloaded to your gallery', 'success');
            });
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
            deletePost(post?.id, user?.uid).then(() => {});
          }}>
          Delete
        </Menu.Item>
      </Menu>
    </Box>
  );
};

export default OptionButton;
