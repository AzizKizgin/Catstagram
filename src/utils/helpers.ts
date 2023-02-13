import {useState} from 'react';
import {Dimensions, Image} from 'react-native';

export const getImageHeight = (image: string) => {
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

export const getImageRatio = (width?: number) => {
  if (!width) return 1;
  const screenWidth = Dimensions.get('window').width;
  const ratio = width / screenWidth;
  return ratio;
};

export const getTimeDifference = (timestamp: string) => {
  const date = new Date(Number(timestamp));
  const now = new Date();
  const diff = (now.getTime() - date.getTime()) / 1000;

  switch (true) {
    case diff < 1:
      return 'just now';
    case diff < 60:
      return Math.floor(diff) + 'seconds ago';
    case diff < 3600:
      return Math.floor(Number(diff) / 60) + ' minutes ago';
    case diff < 86400:
      return Math.floor(Number(diff) / 3600) + ' hours ago';
    case diff < 604800:
      return Math.floor(Number(diff) / 86400) + ' days ago';
    case diff < 2592000:
      return Math.floor(Number(diff) / 604800) + ' weeks ago';
    case diff < 31536000:
      return Math.floor(Number(diff) / 2592000) + ' months ago';
    default:
      return Math.floor(Number(diff) / 31536000) + ' years ago';
  }
};
