import React, {FC, useEffect, useState} from 'react';
import {HStack, Button, Icon, Text, Pressable} from 'native-base';
import {
  followUser,
  isTargetFallowingUser,
  isUserFallowingTarget,
  unfollowUser,
} from '../../../data/Users/userData';
import {useAuth} from '../../../context/AuthContext';
import {Alert} from 'react-native';
import Fontisto from 'react-native-vector-icons/MaterialIcons';
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
      'Unfollow User',
      'Are you sure you want to unfollow this user?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            unfollowUser(appUser?.uid, userId).then(() => {
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
        <Pressable
          borderWidth={1}
          borderColor={'cyan'}
          padding={'s'}
          width={'45%'}
          backgroundColor={'bgDark'}
          alignItems={'center'}
          justifyContent={'center'}
          borderRadius={10}
          onPress={unFallowUser}>
          <Text color={'textDark'} marginLeft={'s'}>
            Unfollow
          </Text>
        </Pressable>
      ) : (
        <Pressable
          width={'45%'}
          padding={'s'}
          backgroundColor={'cyan'}
          alignItems={'center'}
          justifyContent={'center'}
          borderRadius={10}
          onPress={() => {
            console.log(appUser?.uid, appUser?.displayName, userId, userToken);
            followUser(
              appUser?.uid,
              appUser?.displayName || '',
              userId,
              userToken || '',
            ).then(() => {
              setIsFallowing(true);
            });
          }}>
          <Text color={'textDark'} marginLeft={'s'}>
            Fallow
          </Text>
        </Pressable>
      )}
      <Pressable
        width={'45%'}
        padding={'s'}
        backgroundColor={
          isTargetFallowing && isFallowing ? 'cyan' : 'blueGreen'
        }
        isDisabled={!(isTargetFallowing && isFallowing)}
        onPress={() => {
          isTargetFallowing && isFallowing && Alert.alert('coming soon');
        }}
        alignItems={'center'}
        justifyContent={'center'}
        borderRadius={10}>
        <HStack justifyContent={'center'} alignItems={'center'}>
          <Icon as={Fontisto} name="lock" size="21" color="textDark" />
          <Text color={'textDark'} marginLeft={'s'}>
            Message
          </Text>
        </HStack>
      </Pressable>
    </HStack>
  );
};

export default ActivityButtons;
