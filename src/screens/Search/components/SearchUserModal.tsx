import React, {FC, useEffect, useState} from 'react';
import {Box, HStack, Icon, Image, Pressable, Text} from 'native-base';
import Modal from 'react-native-modal';
import Header from '../../../components/Shared/Header';
import TextInput from '../../../components/Shared/TextInput';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {FlatList} from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import {defaultProfileImage} from '../../../utils/consts';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useAuth} from '../../../context/AuthContext';

interface SearchUserModalProps {
  modalVisible: boolean;
  setModalVisible: (isVisible: boolean) => void;
}
const SearchUserModal: FC<SearchUserModalProps> = (props) => {
  const {modalVisible, setModalVisible} = props;
  const [searchText, setSearchText] = useState<string>('');
  const [users, setUsers] = useState<User[]>([]);
  const {user} = useAuth();
  const navigation =
    useNavigation<NativeStackNavigationProp<SearchNavigationParamsList>>();

  const getUsers = async () => {
    firestore()
      .collection('users')
      .where('username', '>=', searchText.toLowerCase())
      .where('username', '<=', searchText.toLowerCase() + '\uf8ff')
      .where('username', '!=', user?.displayName)
      .get()
      .then((querySnapshot) => {
        let users: User[] = [];
        querySnapshot.forEach((documentSnapshot) => {
          users.push(documentSnapshot.data() as User);
        });
        setUsers(users);
      });
  };

  useEffect(() => {
    if (searchText.length > 0) {
      getUsers();
    } else {
      setUsers([]);
    }
  }, [searchText]);
  return (
    <Modal
      isVisible={modalVisible}
      onBackButtonPress={() => setModalVisible(false)}
      animationIn={'slideInDown'}
      animationOut={'slideOutUp'}
      style={{margin: 0}}>
      <Box flex={1} backgroundColor={'bgDark'}>
        <Header onPress={() => setModalVisible(false)} />
        <Box
          flexDirection={'row'}
          alignItems={'center'}
          paddingX={'sm'}
          justifyContent={'center'}>
          <TextInput
            placeholder={'Search'}
            onChangeText={setSearchText}
            value={searchText}
            inputProps={{
              onPressIn: () => {
                setModalVisible(true);
              },
              fontSize: '16',
              InputRightElement: (
                <Icon
                  as={<Ionicons name={'search'} />}
                  size={'21'}
                  color={'textDark'}
                  marginRight={'sm'}
                />
              ),
            }}
          />
        </Box>
        <Box flex={1} justifyContent={'center'} marginTop={'l'} paddingX={'sm'}>
          <FlatList
            data={users}
            renderItem={({item}) => {
              return (
                <Pressable
                  onPress={() => {
                    navigation.navigate('UserAccount', {
                      userId: item.id,
                    });
                  }}>
                  <HStack space={2} alignItems={'center'}>
                    <Image
                      source={{
                        uri: `data:image/jpeg;base64,${
                          item.image || defaultProfileImage
                        }`,
                      }}
                      width={50}
                      height={50}
                      rounded={'full'}
                      resizeMode={'cover'}
                      alt={'Profile Image'}
                    />
                    <Box>
                      <Text color={'textDark'} fontSize={'lg'}>
                        {item.username}
                      </Text>
                    </Box>
                  </HStack>
                </Pressable>
              );
            }}
            keyExtractor={(item) => item.id as string}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default SearchUserModal;
