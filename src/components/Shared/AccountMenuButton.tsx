import React from 'react';
import {Actionsheet, Box, HStack, Icon, Text, useDisclose} from 'native-base';
import AnimatedPressable from '../AnimatedComponents/AnimatedPressable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useAuth} from '../../context/AuthContext';

const AccountMenuButton = () => {
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
