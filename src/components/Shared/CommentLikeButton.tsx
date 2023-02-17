import {Box, Icon} from 'native-base';
import React, {FC, useState} from 'react';
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
const CommentLikeButton: FC<LikeButtonProps> = (props) => {
  const [isLiked, setIsLiked] = useState(false);

  const {size, onPress, id} = props;

  return (
    <AnimatedPressable onPress={onPress}>
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

export default CommentLikeButton;
