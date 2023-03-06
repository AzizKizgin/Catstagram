import React, {FC} from 'react';
import {Box, Image, ScrollView, Text, VStack} from 'native-base';
import Modal from 'react-native-modal';
import Header from '../../../components/Shared/Header';

interface PrivacyModalProps {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
}

const privacy1 = require('../../../assets/privacy1.png');
const privacy2 = require('../../../assets/privacy2.png');
const privacy3 = require('../../../assets/privacy3.png');

const privacy = [privacy1, privacy2, privacy3];

const PrivacyModal: FC<PrivacyModalProps> = (props) => {
  const {modalVisible, setModalVisible} = props;
  return (
    <Modal
      isVisible={modalVisible}
      onBackButtonPress={() => setModalVisible(false)}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      style={{margin: 0}}>
      <Box flex={1} backgroundColor={'bgDark'}>
        <Header onPress={() => setModalVisible(false)} />
        <Text color={'white'} fontSize={'xl'} textAlign={'center'}>
          Privacy Policy
        </Text>
        <ScrollView>
          {privacy.map((item, index) => {
            return (
              <Box>
                <Image
                  source={item}
                  alt={'privacy'}
                  resizeMode={'contain'}
                  width={'100%'}
                  height={500}
                />
              </Box>
            );
          })}
        </ScrollView>
      </Box>
    </Modal>
  );
};

export default PrivacyModal;
