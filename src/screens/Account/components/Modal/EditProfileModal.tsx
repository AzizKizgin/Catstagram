import {Alert, Modal} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {Box, Center, Pressable, Text} from 'native-base';
import UserImage from '../../../../components/User/components/UserImage';
import TextInput from '../../../../components/Shared/TextInput';
import {updateUserInfo} from '../../../../data/Users/userData';
import {useAuth} from '../../../../context/AuthContext';
import Header from '../../../../components/Shared/Header';

interface EditProfileModalProps {
  userInfo?: User | null;
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
}
const EditProfileModal: FC<EditProfileModalProps> = (props) => {
  const {userInfo, modalVisible, setModalVisible} = props;
  const [userName, setUserName] = useState(userInfo?.username || '');
  const [bio, setBio] = useState(userInfo?.bio || '');
  const {user} = useAuth();
  useEffect(() => {
    setUserName(userInfo?.username || '');
    setBio(userInfo?.bio || '');
  }, [modalVisible]);

  const saveChanges = () => {
    if (userName !== '') {
      updateUserInfo(userInfo?.id, userName, bio);
      user?.updateProfile({
        displayName: userName,
      });
      setModalVisible(false);
    } else {
      Alert.alert('Username cannot be empty');
    }
  };

  return (
    <Modal
      animationType="slide"
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}>
      <Box flex={1} backgroundColor={'bgDark'} padding={'sm'}>
        <Header onPress={() => setModalVisible(false)} />
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
            onPress={saveChanges}
            marginTop={'xl'}
            padding={'s'}
            marginX={'m'}
            backgroundColor={'cyan'}
            borderRadius={'xl'}>
            <Center>
              <Text color={'textDark'} fontSize={'md'} fontWeight={'semibold'}>
                Save
              </Text>
            </Center>
          </Pressable>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditProfileModal;
