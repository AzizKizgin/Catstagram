import {Box, Icon} from 'native-base';
import React, {useEffect, useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useAuth} from '../../context/AuthContext';
import {usePost} from '../../context/PostContext';
import {isPostFavorited} from '../../data/Posts/postData';
import AnimatedPressable from '../AnimatedComponents/AnimatedPressable';

const SaveButton = () => {
  const {favorite, post} = usePost();
  const {user} = useAuth();

  const [isFavorited, setIsFavorited] = useState<boolean>(false);
  isPostFavorited(post?.id, user?.uid).then((isFavorited) => {
    setIsFavorited(isFavorited);
  });
  return (
    <AnimatedPressable onPress={favorite}>
      {isFavorited ? (
        <Box>
          <Icon as={FontAwesome} name="bookmark" size="23" color="cyan" />
        </Box>
      ) : (
        <Box>
          <Icon
            as={FontAwesome}
            name="bookmark-o"
            size="23"
            color="iconColor"
          />
        </Box>
      )}
    </AnimatedPressable>
  );
};

export default SaveButton;
