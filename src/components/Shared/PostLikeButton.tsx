import {Box, Icon} from 'native-base';
import React, {useState} from 'react';
import AnimatedPressable from '../AnimatedComponents/AnimatedPressable';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useAuth} from '../../context/AuthContext';
import {checkUserLikedPost} from '../../data/Users/userData';
import {usePost} from '../../context/PostContext';

const PostLikeButton = () => {
  const [isLiked, setIsLiked] = useState(false);
  const {post, like} = usePost();
  const {user} = useAuth();

  checkUserLikedPost(post?.id, user?.uid).then((isLiked) => {
    setIsLiked(isLiked);
  });

  return (
    <AnimatedPressable onPress={like}>
      {isLiked ? (
        <Box>
          <Icon as={AntDesign} name="like1" size={23} color="cyan" />
        </Box>
      ) : (
        <Box>
          <Icon as={AntDesign} name="like2" size={23} color="iconColor" />
        </Box>
      )}
    </AnimatedPressable>
  );
};

export default PostLikeButton;
