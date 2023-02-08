import React, {FC, useState} from 'react';
import {Box, Image} from 'native-base';
import {useGetImageHeight} from '../../../utils/helpers';

interface Props {
  image: string;
}

const PostImage: FC<Props> = ({image}) => {
  const height = useGetImageHeight(image);
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
