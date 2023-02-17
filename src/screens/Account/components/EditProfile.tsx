import {Box, Center, Pressable, Text} from 'native-base';
import React, {FC, memo, useState} from 'react';
import {Modal} from 'react-native';
import BackButton from '../../../components/Shared/BackButton';
import HeaderLogo from '../../../components/Shared/HeaderLogo';
import TextInput from '../../../components/Shared/TextInput';
import UserImage from '../../../components/User/components/UserImage';

interface EditProfileProps {
  userInfo?: User | null;
}
const EditProfile: FC<EditProfileProps> = (props) => {
  const {userInfo} = props;
  const [userName, setUserName] = useState(userInfo?.username || '');
  const [bio, setBio] = useState(userInfo?.bio || '');
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <Box>
      <Pressable
        onPress={() => setModalVisible(true)}
        marginTop={'xxl'}
        padding={'s'}
        backgroundColor={'cyan'}
        borderRadius={'xl'}>
        <Center>
          <Text color={'textDark'} fontSize={'md'} fontWeight={'semibold'}>
            Edit Profile
          </Text>
        </Center>
      </Pressable>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <Box flex={1} backgroundColor={'bgDark'} padding={'sm'}>
          <Box
            paddingX={'sm'}
            backgroundColor={'bgDark'}
            flexDirection={'row'}
            alignItems={'center'}>
            <BackButton onPress={() => setModalVisible(false)} />
            <HeaderLogo />
          </Box>
          <Box marginTop={'xxl'}>
            <Pressable onPress={() => {}}>
              <UserImage size={'large'} image={userInfo?.image} />
            </Pressable>
            <Box
              flexDirection={'row'}
              padding={'sm'}
              alignItems={'center'}
              marginTop={'m'}
              justifyContent={'space-between'}>
              <TextInput
                onChangeText={(text) => setUserName(text)}
                value={userName}
                placeholder={'Username'}
              />
            </Box>
            <Box
              flexDirection={'row'}
              padding={'sm'}
              alignItems={'center'}
              justifyContent={'space-between'}>
              <TextInput
                onChangeText={(text) => setBio(text)}
                value={bio}
                placeholder={'bio'}
              />
            </Box>
            <Pressable
              onPress={() => setModalVisible(false)}
              marginTop={'xl'}
              padding={'s'}
              marginX={'m'}
              backgroundColor={'cyan'}
              borderRadius={'xl'}>
              <Center>
                <Text
                  color={'textDark'}
                  fontSize={'md'}
                  fontWeight={'semibold'}>
                  Save
                </Text>
              </Center>
            </Pressable>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default memo(EditProfile);
