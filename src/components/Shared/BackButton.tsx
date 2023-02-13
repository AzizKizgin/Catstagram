import {Box, Icon} from 'native-base';
import React, {FC} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AnimatedPressable from '../AnimatedComponents/AnimatedPressable';

interface BackButtonProps {
  onPress: () => void;
}
const BackButton: FC<BackButtonProps> = (props) => {
  const {onPress} = props;
  return (
    <AnimatedPressable onPress={onPress} padding={'xs'}>
      <Box>
        <Icon as={Ionicons} name="ios-arrow-back" size="23" color="iconColor" />
      </Box>
    </AnimatedPressable>
  );
};

export default BackButton;
