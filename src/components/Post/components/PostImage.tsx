import React, {FC, memo} from 'react';
import {Box} from 'native-base';
import {getImageHeight} from '../../../utils/helpers';
import {Image} from 'react-native';

interface Props {
  image: PostImage;
}

const PostImage: FC<Props> = ({image}) => {
  return (
    <Box>
      <Image
        source={{
          uri: `data:image/jpeg;base64,${image.imageUri}`,
        }}
        style={{
          width: '100%',
          height: image.height,
        }}
        resizeMode={'cover'}
      />
    </Box>
  );
};

export default memo(PostImage);
