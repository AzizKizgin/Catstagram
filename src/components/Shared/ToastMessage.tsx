import React, {FC, useEffect, useState} from 'react';
import {Box, Text} from 'native-base';
import theme from '../../../theme';

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
  useEffect(() => {
    setShowToast(isVisible);
  }, [isVisible]);

  return (
    <Box
      display={showToast ? 'flex' : 'none'}
      position={'absolute'}
      bottom={5}
      left={5}
      right={5}
      backgroundColor={toastColor}
      padding={'sm'}
      alignItems={'center'}
      justifyContent={'center'}
      zIndex={999}
      opacity={0.8}
      borderRadius={'md'}>
      <Text color={'white'}>{message}</Text>
    </Box>
  );
};

export default ToastMessage;
