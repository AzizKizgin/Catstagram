import React, {FC, useEffect, useState} from 'react';
import {Text} from 'native-base';
import theme from '../../../theme';
import {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import AnimatedBox from '../AnimatedComponents/AnimatedBox';

interface ToastMessageProps {
  message: string;
  isVisible: boolean;
  type: ToastType;
}

const ToastMessage: FC<ToastMessageProps> = (props) => {
  const {message, isVisible, type} = props;
  const [showToast, setShowToast] = useState(isVisible);
  let toastColor = theme.colors.green;
  switch (type) {
    case 'warning':
      toastColor = theme.colors.yellow;
      break;
    case 'success':
      toastColor = theme.colors.green;
      break;
    case 'info':
      toastColor = theme.colors.cyan;
      break;
  }

  const bottom = useSharedValue(-100);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      bottom: bottom.value,
    };
  });

  useEffect(() => {
    setShowToast(isVisible);
  }, [isVisible]);

  useEffect(() => {
    if (showToast) {
      bottom.value = withTiming(15, {duration: 500}, (isFinished) => {
        if (isFinished) {
          bottom.value = withDelay(2000, withTiming(-100, {duration: 500}));
        }
      });
    }
  }, [showToast]);

  return (
    <AnimatedBox
      display={showToast ? 'flex' : 'none'}
      position={'absolute'}
      left={5}
      right={5}
      backgroundColor={toastColor}
      padding={'m'}
      alignItems={'center'}
      justifyContent={'center'}
      zIndex={999}
      borderRadius={'md'}
      style={animatedStyle}>
      <Text color={'white'}>{message}</Text>
    </AnimatedBox>
  );
};

export default ToastMessage;
