import {useNavigation} from '@react-navigation/native';
import {Box, Button, Center, HStack, Icon, Input, Text} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Alert, Image} from 'react-native';
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useAuth} from '../../context/AuthContext';
import {addPost} from '../../data/Posts/postData';
import {getImageRatio, goBack} from '../../utils/helpers';

const AddPost = () => {
  const [images, setImages] = useState<Asset | null>(null);
  const [height, setHeight] = useState<number>(300);
  const [caption, setCaption] = useState<string>('');
  const {user} = useAuth();
  const [error, setError] = useState<string>('');
  const navigation = useNavigation();
  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {display: 'none'},
    });
  }, []);
  useEffect(() => {
    const getImages = async () => {
      const result = await launchImageLibrary({
        selectionLimit: 1,
        mediaType: 'photo',
        includeBase64: true,
      });
      if (result.didCancel) {
        navigation.goBack();
      }
      if (result.assets) {
        const ratio = getImageRatio(result.assets[0].width);
        if (result.assets[0].height) {
          setHeight(result.assets[0].height / ratio);
        }
        setImages(result.assets[0]);
      }
    };
    getImages();
  }, []);

  useEffect(() => {
    Alert.alert('Error', error, [{text: 'OK'}]);
  }, [error]);

  return (
    <Box
      justifyContent="space-between"
      flex={1}
      backgroundColor="bgDark"
      paddingY={'sm'}>
      <Box flex={1} justifyContent="center">
        <Center>
          <Image
            source={{
              uri: `data:image/jpeg;base64,${images?.base64}`,
            }}
            style={{width: '100%', height: height}}
            resizeMode="cover"
          />
        </Center>
      </Box>
      <HStack paddingX={'sm'} space={'sm'}>
        <Input
          placeholder="Add a caption"
          flex={1}
          color={'textDark'}
          fontSize={'md'}
          cursorColor={'#1f8686'}
          value={caption}
          onChangeText={(text) => setCaption(text)}
          backgroundColor="itemBgDark"
        />
        <Button
          backgroundColor="cyan"
          onPress={() => {
            if (images && user && images.base64) {
              addPost(
                {
                  caption: caption,
                  image: {
                    imageUri: images.base64,
                    height: height,
                  },
                  userId: user.uid,
                  createdAt: new Date().getTime().toString(),
                },
                setError,
              ).then(() => {
                goBack(navigation);
              });
            } else {
              console.log('Something went wrong');
            }
          }}>
          <Icon as={<Ionicons name="send" />} size={5} color="white" />
        </Button>
      </HStack>
    </Box>
  );
};

export default AddPost;
