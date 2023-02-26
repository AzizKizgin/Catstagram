import React, {FC, memo} from 'react';
import {Box, Center, Icon, Pressable} from 'native-base';
import {Image} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {
  GestureHandlerRootView,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AnimatedCenter from '../../AnimatedComponents/AnimatedCenter';
import AnimatedBox from '../../AnimatedComponents/AnimatedBox';
import {withDelay, withSpring, withTiming} from 'react-native-reanimated';
import {usePost} from '../../../context/PostContext';

interface Props {
  image: PostImage;
}
const AnimatedImage = Animated.createAnimatedComponent(Image);
const PostImage: FC<Props> = ({image}) => {
  const {like, isUserLiked} = usePost();
  const scale = useSharedValue(0);
  const scaleStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
    };
  });

  const doubleTap = () => {
    if (!isUserLiked) {
      like();
    }
    scale.value = withSpring(1, undefined, (isFinished) => {
      if (isFinished) {
        scale.value = withDelay(100, withTiming(0));
      }
    });
  };
  return (
    <GestureHandlerRootView>
      <TapGestureHandler
        onActivated={doubleTap}
        numberOfTaps={2}
        maxDurationMs={200}>
        <AnimatedBox justifyContent="center" alignItems="center">
          <AnimatedImage
            source={{
              uri: `data:image/jpeg;base64,${image.imageUri}`,
            }}
            style={{
              width: '100%',
              height: image.height,
            }}
            resizeMode={'cover'}
          />
          <AnimatedCenter position="absolute" style={scaleStyle}>
            <Icon as={AntDesign} name="like1" size={125} color="cyan" />
          </AnimatedCenter>
        </AnimatedBox>
      </TapGestureHandler>
    </GestureHandlerRootView>
  );
};

export default memo(PostImage);
