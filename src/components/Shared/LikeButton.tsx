import {Box, Icon, Text} from 'native-base';
import React, {FC, useEffect, useState} from 'react';
import AnimatedPressable from '../AnimatedComponents/AnimatedPressable';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ThemeComponentSizeType} from 'native-base/lib/typescript/components/types';
import {useAuth} from '../../context/AuthContext';
import {checkUserLikedPost} from '../../data/getData';
interface LikeButtonProps {
  onPress?: () => void;
  size?: ThemeComponentSizeType<'Icon'>;
  id?: string;
}
const LikeButton: FC<LikeButtonProps> = (props) => {
  const [isLiked, setIsLiked] = useState(false);
  const {onPress, size, id} = props;
  const {user} = useAuth();

  checkUserLikedPost(id, user?.uid).then((isLiked) => {
    setIsLiked(isLiked);
  });

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

export default LikeButton;
