import {Box, Icon} from 'native-base';
import React, {FC} from 'react';
import AnimatedPressable from '../AnimatedComponents/AnimatedPressable';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ThemeComponentSizeType} from 'native-base/lib/typescript/components/types';
interface LikeButtonProps {
  onPress?: () => void;
  size?: ThemeComponentSizeType<'Icon'>;
}
const LikeButton: FC<LikeButtonProps> = (props) => {
  const {onPress, size} = props;
  return (
    <AnimatedPressable>
      <Box>
        <Icon as={AntDesign} name="like2" size={size} color="iconColor" />
      </Box>
    </AnimatedPressable>
  );
};

export default LikeButton;
