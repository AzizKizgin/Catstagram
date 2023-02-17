import {Box, Center, Pressable, Text} from 'native-base';
import React, {FC, memo, useState} from 'react';
import EditProfileModal from './Modal/EditProfileModal';

interface EditProfileProps {
  userInfo?: User | null;
}
const EditProfile: FC<EditProfileProps> = (props) => {
  const {userInfo} = props;
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
      <EditProfileModal
        userInfo={userInfo}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </Box>
  );
};

export default memo(EditProfile);
