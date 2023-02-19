import {useNavigation} from '@react-navigation/native';
import {Box, Icon} from 'native-base';
import React, {FC} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import AnimatedPressable from '../AnimatedComponents/AnimatedPressable';

interface AddPostButtonProps {
  onPress: () => void;
}
const AddPostButton: FC<AddPostButtonProps> = (props) => {
  const {onPress} = props;
  return (
    <AnimatedPressable onPress={onPress} padding={'xs'}>
      <Box>
        <Icon as={Feather} name="plus-square" size="25" color="iconColor" />
      </Box>
    </AnimatedPressable>
  );
};

export default AddPostButton;
