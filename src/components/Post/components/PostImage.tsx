import React, {FC, useState} from 'react';
import {Box, Image} from 'native-base';
import {getImageHeight} from '../../../utils/helpers';

interface Props {
  image: string;
}

const PostImage: FC<Props> = ({image}) => {
  const height = getImageHeight(image);
  return (
    <Box>
      <Image
        source={{uri: image}}
        alt="post image"
        resizeMode="contain"
        height={height}
        width="100%"
      />
    </Box>
  );
};

export default PostImage;
