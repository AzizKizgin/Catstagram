import {Box, Icon, Text} from 'native-base';
import React, {FC, memo, useEffect, useState} from 'react';
import AnimatedPressable from '../AnimatedComponents/AnimatedPressable';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ThemeComponentSizeType} from 'native-base/lib/typescript/components/types';
import {useAuth} from '../../context/AuthContext';
interface LikeButtonProps {
  onPress?: () => void;
  size?: ThemeComponentSizeType<'Icon'>;
  likes?: string[];
}
const CommentLikeButton: FC<LikeButtonProps> = (props) => {
  const {size, onPress, likes} = props;
  const {user} = useAuth();
  return (
    <AnimatedPressable
      onPress={onPress}
      alignItems={'center'}
      justifyContent={'center'}>
      {user?.uid && likes?.includes(user?.uid) ? (
        <Box>
          <Icon as={AntDesign} name="like1" size={size} color="cyan" />
        </Box>
      ) : (
        <Box>
          <Icon as={AntDesign} name="like2" size={size} color="iconColor" />
        </Box>
      )}
      <Text color={'gray.400'}>
        {likes && likes?.length > 0 && likes?.length}
      </Text>
    </AnimatedPressable>
  );
};

export default memo(CommentLikeButton);
