import {useNavigation, useRoute} from '@react-navigation/native';
import {Box, Icon, Menu, Pressable} from 'native-base';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../../../theme';
import {useAuth} from '../../context/AuthContext';
import {usePost} from '../../context/PostContext';
import {deletePost} from '../../data/Posts/postData';
import {goBack} from '../../utils/helpers';

const OptionButton = () => {
  const {user} = useAuth();
  const {post} = usePost();
  const route = useRoute();
  const navigation = useNavigation();
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
        <Menu.Item _text={{color: 'textDark', fontSize: 'sm'}}>
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
            deletePost(post?.id, user?.uid);
            goBack(navigation);
          }}>
          Delete
        </Menu.Item>
      </Menu>
    </Box>
  );
};

export default OptionButton;
