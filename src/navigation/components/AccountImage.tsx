import {Center} from 'native-base';
import React, {FC, useEffect, useState} from 'react';
import {Image} from 'react-native';
import theme from '../../../theme';
import {useAuth} from '../../context/AuthContext';
import {getUserById} from '../../data/Users/userData';
import {defaultProfileImage} from '../../utils/consts';

interface UserImageProps {
  focused: boolean;
}
const AccountImage: FC<UserImageProps> = ({focused}) => {
  const {user} = useAuth();
  const [userPicture, setUserPicture] = useState<string | undefined>(undefined);
  useEffect(() => {
    getUserById(user?.uid || '').then((user) => {
      setUserPicture(user?.image);
    });
  }, []);
  return (
    <Center>
      <Image
        source={{
          uri: `data:image/jpeg;base64,${userPicture || defaultProfileImage}`,
        }}
        style={{
          width: 35,
          height: 35,
          borderRadius: 50,
          borderColor: focused ? theme.colors.pink : theme.colors.cyan,
          borderWidth: 2,
        }}
        resizeMode="center"
      />
    </Center>
  );
};

export default AccountImage;
