import React, {FC, useEffect, useState} from 'react';
import {HStack, Button} from 'native-base';
import {
  fallowUser,
  isTargetFallowingUser,
  isUserFallowingTarget,
  unfallowUser,
} from '../../../data/Users/userData';
import {useAuth} from '../../../context/AuthContext';
import {Alert} from 'react-native';

interface ActivityButtonsProps {
  userId: string;
  userToken?: string;
}

const ActivityButtons: FC<ActivityButtonsProps> = ({userId, userToken}) => {
  const [isFallowing, setIsFallowing] = useState<boolean>(false);
  const [isTargetFallowing, setIsTargetFallowing] = useState<boolean>(false);
  const {user: appUser} = useAuth();
  const unFallowUser = () => {
    Alert.alert(
      'Unfallow User',
      'Are you sure you want to unfallow this user?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            unfallowUser(appUser?.uid, userId).then(() => {
              setIsFallowing(false);
            });
          },
        },
      ],
    );
  };

  useEffect(() => {
    isUserFallowingTarget(appUser?.uid, userId).then((isFallowing) => {
      setIsFallowing(isFallowing);
    });
    isTargetFallowingUser(appUser?.uid, userId).then((isFallowing) => {
      setIsTargetFallowing(isFallowing);
    });
  }, []);
  return (
    <HStack justifyContent={'space-evenly'} marginTop={'sm'}>
      {isFallowing ? (
        <Button
          width={'45%'}
          color={'cyan'}
          variant={'outline'}
          onPress={unFallowUser}>
          Fallowing
        </Button>
      ) : (
        <Button
          width={'45%'}
          color={'cyan'}
          onPress={() => {
            fallowUser(
              appUser?.uid,
              appUser?.displayName || '',
              userId,
              userToken || '',
            ).then(() => {
              setIsFallowing(true);
            });
          }}>
          Fallow
        </Button>
      )}
      <Button width={'45%'} color={'cyan'}>
        Message
      </Button>
    </HStack>
  );
};

export default ActivityButtons;
