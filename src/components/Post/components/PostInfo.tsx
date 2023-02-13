import {Text, VStack} from 'native-base';
import React, {FC, memo} from 'react';
import {getTimeDifference} from '../../../utils/helpers';

interface PostInfoProps {
  caption: string;
  timestamp: string;
}
const PostInfo: FC<PostInfoProps> = (props) => {
  const {caption, timestamp} = props;
  const diff = getTimeDifference(timestamp);
  return (
    <VStack paddingX={'sm'}>
      {caption && (
        <Text fontSize={'md'} color={'textDark'}>
          {caption}
        </Text>
      )}
      <Text fontSize={'12'} color={'inactiveTextDark'}>
        {diff}
      </Text>
    </VStack>
  );
};

export default memo(PostInfo);
