import React, {useEffect, useState} from 'react';
import {Box, Icon, Pressable, Text} from 'native-base';
import TextInput from '../../components/Shared/TextInput';
import Header from '../../components/Shared/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {FlatList, RefreshControl} from 'react-native-gesture-handler';
import {ActivityIndicator, Image} from 'react-native';
import {screenWidth} from '../../utils/consts';
import theme from '../../../theme';
import SearchUserModal from './components/SearchUserModal';

const Search = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [lastDoc, setLastDoc] =
    useState<
      FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>
    >();

  const getPopularPosts = async () => {
    setLoading(true);
    firestore()
      .collection('posts')
      .orderBy('likes', 'desc')
      .limit(20)
      .get()
      .then((querySnapshot) => {
        let posts: Post[] = [];
        querySnapshot.forEach((documentSnapshot) => {
          posts.push(documentSnapshot.data() as Post);
        });
        setPosts(posts);
        setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
        setLoading(false);
      });
  };

  const getMorePosts = async () => {
    if (lastDoc) {
      setRefreshing(true);
      firestore()
        .collection('posts')
        .orderBy('likes', 'desc')
        .startAfter(lastDoc)
        .limit(10)
        .get()
        .then((querySnapshot) => {
          let posts: Post[] = [];
          querySnapshot.forEach((documentSnapshot) => {
            posts.push(documentSnapshot.data() as Post);
          });
          setPosts((prev) => [...prev, ...posts]);
          setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
          setRefreshing(false);
        });
    }
  };

  const renderItems = (post: Post) => {
    return (
      <Box>
        <Pressable onPress={() => {}}>
          <Box borderWidth={1} borderColor={'black'}>
            <Image
              source={{
                uri: `data:image/jpeg;base64,${post.image.imageUri}`,
              }}
              style={{
                width: screenWidth / 3,
                height: screenWidth / 3,
              }}
              resizeMode={'cover'}
            />
          </Box>
        </Pressable>
      </Box>
    );
  };

  useEffect(() => {
    getPopularPosts();
  }, []);
  return (
    <Box flex={1} backgroundColor={'bgDark'}>
      <Header />
      <Pressable
        onPress={() => setModalVisible(true)}
        flexDirection={'row'}
        alignItems={'center'}
        paddingX={'sm'}
        justifyContent={'center'}>
        <TextInput
          placeholder={'Search'}
          onChangeText={setSearchText}
          value={searchText}
          inputProps={{
            editable: false,
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
      </Pressable>
      {loading ? (
        <Box flex={1} justifyContent={'center'} alignItems={'center'}>
          <ActivityIndicator size={'large'} color={theme.colors.cyan} />
        </Box>
      ) : (
        <Box flex={1} justifyContent={'center'} marginTop={'l'}>
          <FlatList
            data={posts}
            numColumns={3}
            renderItem={({item}) => renderItems(item)}
            keyExtractor={(item) => item.id as string}
            onEndReached={getMorePosts}
            onEndReachedThreshold={0.5}
            refreshControl={
              <RefreshControl
                colors={[theme.colors.cyan]}
                refreshing={refreshing}
                onRefresh={async () => {
                  setRefreshing(true);
                  getPopularPosts().then(() => {
                    setRefreshing(false);
                  });
                }}
              />
            }
            ListFooterComponent={
              refreshing ? (
                <Box
                  height={50}
                  justifyContent={'center'}
                  alignItems={'center'}>
                  <ActivityIndicator size={'large'} color={theme.colors.cyan} />
                </Box>
              ) : null
            }
          />
        </Box>
      )}
      <SearchUserModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </Box>
  );
};

export default Search;
