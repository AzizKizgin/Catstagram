import {useState} from 'react';
import {Dimensions, Image} from 'react-native';

export const useGetImageHeight = (image: string) => {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const screenWidth = Dimensions.get('window').width;
  Image.getSize(image, (width, height) => {
    setHeight(height);
    setWidth(width);
  });
  const ratio = width / screenWidth;
  if (ratio === 0) return 300;
  return height / ratio;
};
