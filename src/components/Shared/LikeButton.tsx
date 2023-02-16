import {Box, Icon, Text} from 'native-base';
import React, {FC, useEffect, useState} from 'react';
import AnimatedPressable from '../AnimatedComponents/AnimatedPressable';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ThemeComponentSizeType} from 'native-base/lib/typescript/components/types';
import {useAuth} from '../../context/AuthContext';
import {checkUserLikedPost} from '../../data/Users/userData';
import {usePost} from '../../context/PostContext';
interface LikeButtonProps {
  onPress?: () => void;
  size?: ThemeComponentSizeType<'Icon'>;
  id?: string;
}
const LikeButton: FC<LikeButtonProps> = (props) => {
  const [isLiked, setIsLiked] = useState(false);
  const {post, like} = usePost();
  const {user} = useAuth();

  const {size} = props;

  checkUserLikedPost(post?.id, user?.uid).then((isLiked) => {
    setIsLiked(isLiked);
  });

  return (
    <AnimatedPressable onPress={like}>
      {isLiked ? (
        <Box>
          <Icon as={AntDesign} name="like1" size={size} color="cyan" />
        </Box>
      ) : (
        <Box>
          <Icon as={AntDesign} name="like2" size={size} color="iconColor" />
        </Box>
      )}
    </AnimatedPressable>
  );
};

export default LikeButton;
