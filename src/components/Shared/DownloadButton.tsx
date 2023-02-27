import React from 'react';
import {Box, Icon, Pressable, Text} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import {usePost} from '../../context/PostContext';
import {downloadImage} from '../../utils/helpers';
import {useToast} from '../../context/ToastContext';

const DownloadButton = () => {
  const {post} = usePost();
  const {showToast} = useToast();
  return (
    <Pressable
      onPress={() => {
        downloadImage(post?.image.imageUri).then(() => {
          showToast('Image has been downloaded to your gallery', 'success');
        });
      }}>
      <Box>
        <Icon as={Feather} name="download" size="23" color="iconColor" />
      </Box>
    </Pressable>
  );
};

export default DownloadButton;
