import {Box, Icon} from 'native-base';
import React, {FC, memo, useEffect, useState} from 'react';
import AnimatedPressable from '../AnimatedComponents/AnimatedPressable';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ThemeComponentSizeType} from 'native-base/lib/typescript/components/types';
interface LikeButtonProps {
  onPress?: () => void;
  size?: ThemeComponentSizeType<'Icon'>;
  id?: string;
  isUserLiked?: boolean;
}
const CommentLikeButton: FC<LikeButtonProps> = (props) => {
  const {size, onPress, id, isUserLiked = false} = props;
  const [isLiked, setIsLiked] = useState(isUserLiked);
  useEffect(() => {
    setIsLiked(isUserLiked);
  }, [isUserLiked]);

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

export default memo(CommentLikeButton);
