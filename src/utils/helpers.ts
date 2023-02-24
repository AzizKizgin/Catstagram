import axios from 'axios';
import {useState} from 'react';
import {Dimensions, Image} from 'react-native';
import theme from '../../theme';

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
      return '1 second ago';
    case diff < 60:
      return Math.floor(diff) + ' seconds ago';
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

export const goBack = (navigation: any) => {
  navigation.getParent()?.setOptions({
    tabBarStyle: {
      backgroundColor: theme.colors.itemBgDark,
      borderTopColor: theme.colors.itemBgDark,
      height: 50,
    },
  });
  navigation.goBack();
};

export const sendNotification = async (
  targetToken?: string,
  notification?: string,
  title?: string,
) => {
  axios
    .post(
      'https://fcm.googleapis.com/fcm/send',
      {
        to: targetToken,
        notification: {
          title: title,
          body: notification,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'key=AAAACy4oxVc:APA91bEk8q7J-0H4uku1st0vX-3nDaTWA1EO5G5SEmcVh0RCufejYzXhKLyotHR8pndioGq6gB-a3askaCOOn3Vz4q4p8tYQkL2xLbWTD8Xah7wbK2-ppk0PFPB4EEFoiC1n0fzpQJLW',
        },
      },
    )
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
