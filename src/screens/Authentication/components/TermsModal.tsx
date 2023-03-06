import React, {FC} from 'react';
import {Box, Image, ScrollView, Text, VStack} from 'native-base';
import Modal from 'react-native-modal';
import Header from '../../../components/Shared/Header';

interface TermsModalProps {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
}

const terms = require('../../../assets/terms.png');

const TermsModal: FC<TermsModalProps> = (props) => {
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
          Terms and Conditions
        </Text>
        <Box>
          <Image
            source={terms}
            alt={'privacy'}
            resizeMode={'contain'}
            width={'100%'}
            height={500}
          />
        </Box>
        <Text color={'cyan'} textAlign={'center'} fontSize={'md'}>
          you can contact us at: infocatstagram@gmail.com
        </Text>
      </Box>
    </Modal>
  );
};

export default TermsModal;
