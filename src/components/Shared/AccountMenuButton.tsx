import React, {FC} from 'react';
import {Actionsheet, Box, HStack, Icon, Text, useDisclose} from 'native-base';
import AnimatedPressable from '../AnimatedComponents/AnimatedPressable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useAuth} from '../../context/AuthContext';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface AccountMenuButtonProps {
  props: NativeStackHeaderProps;
}
const AccountMenuButton: FC<AccountMenuButtonProps> = ({props}) => {
  const {isOpen, onOpen, onClose} = useDisclose();
  const {logout} = useAuth();

  return (
    <>
      <AnimatedPressable padding={'xs'} onPress={onOpen}>
        <Box>
          <Icon
            as={Ionicons}
            name="settings-outline"
            size="25"
            color="iconColor"
          />
        </Box>
      </AnimatedPressable>
      <Actionsheet
        isOpen={isOpen}
        onClose={onClose}
        _backdrop={{
          backgroundColor: 'rgba(0,0,0,0.0)',
        }}>
        <Actionsheet.Content
          backgroundColor={'bgDark'}
          padding={0}
          borderTopLeftRadius={15}
          borderTopRightRadius={15}>
          <Actionsheet.Item
            onPress={() => {
              onClose();
              props.navigation.navigate('UserActivities', {
                screen: 'LikedPosts',
              });
            }}
            backgroundColor={'bgDark'}>
            <HStack space={8} alignItems={'center'} paddingX={'sm'}>
              <Icon as={AntDesign} name="like2" size={23} color="iconColor" />
              <Text color={'textDark'} fontSize={'md'}>
                Liked Posts
              </Text>
            </HStack>
          </Actionsheet.Item>

          <Actionsheet.Item
            onPress={() => {
              onClose();
              props.navigation.navigate('UserActivities', {
                screen: 'SavedPosts',
              });
            }}
            backgroundColor={'bgDark'}>
            <HStack space={8} alignItems={'center'} paddingX={'sm'}>
              <Icon
                as={FontAwesome}
                name="bookmark-o"
                size="23"
                color="iconColor"
              />
              <Text color={'textDark'} fontSize={'md'}>
                Saved Posts
              </Text>
            </HStack>
          </Actionsheet.Item>

          <Actionsheet.Item
            onPress={() => {
              onClose();
              logout();
            }}
            backgroundColor={'bgDark'}>
            <HStack space={8} alignItems={'center'} paddingX={'sm'}>
              <Icon
                as={MaterialCommunityIcons}
                name="exit-to-app"
                size="25"
                color="iconColor"
              />
              <Text color={'textDark'} fontSize={'md'}>
                Log Out
              </Text>
            </HStack>
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
};

export default AccountMenuButton;
