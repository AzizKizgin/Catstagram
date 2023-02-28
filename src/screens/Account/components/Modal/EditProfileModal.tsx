import {Alert, Modal} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {Box, Center, Pressable, Text} from 'native-base';
import UserImage from '../../../../components/User/components/UserImage';
import TextInput from '../../../../components/Shared/TextInput';
import {updateUserInfo} from '../../../../data/Users/userData';
import {useAuth} from '../../../../context/AuthContext';
import Header from '../../../../components/Shared/Header';
import {useToast} from '../../../../context/ToastContext';
import {launchImageLibrary} from 'react-native-image-picker';

interface EditProfileModalProps {
  userInfo?: User | null;
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
}
const EditProfileModal: FC<EditProfileModalProps> = (props) => {
  const {userInfo, modalVisible, setModalVisible} = props;
  const [userName, setUserName] = useState(userInfo?.username || '');
  const [bio, setBio] = useState(userInfo?.bio || '');
  const [image, setImage] = useState<string>();
  const {user} = useAuth();
  const {showToast} = useToast();
  useEffect(() => {
    setUserName(userInfo?.username || '');
    setBio(userInfo?.bio || '');
  }, [modalVisible]);

  const getImage = async () => {
    const result = await launchImageLibrary({
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: true,
    });
    if (result && result.assets && result.assets[0].base64) {
      setImage(result.assets[0].base64.toString() || '');
    }
  };

  const saveChanges = () => {
    if (
      userName !== '' &&
      (userName !== userInfo?.username || bio !== userInfo?.bio || image)
    ) {
      updateUserInfo(userInfo?.id, userName, bio, image);
      if (userName !== '') {
        user?.updateProfile({
          displayName: userName,
        });
      }
      setModalVisible(false);
      showToast(
        'Profile updated successfully. Changes will be reflected when you re-enter the app',
        'success',
      );
    } else if (userName === '') {
      Alert.alert('Username cannot be empty');
    } else {
      setModalVisible(false);
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
          <UserImage
            size={'large'}
            image={image || userInfo?.image}
            setImage={getImage}
          />
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
