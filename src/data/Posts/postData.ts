import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {useEffect, useState} from 'react';
interface IGetUserPosts {
  userId?: string;
  limit: number;
  lastDoc?: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>;
  setLastDoc: (
    doc: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>,
  ) => void;
  setPosts: (posts: Post[] | any) => void;
  setLoading?: (loading: boolean) => void;
}

export const addPost = async (
  post: Post,
  setErrorMessage: (message: string) => void,
) => {
  const postDoc = firestore().collection('posts').doc(post.id);
  const postObj: Post = {
    ...post,
    id: postDoc.id,
    likes: [],
  };
  await postDoc
    .set(postObj)
    .catch((error) => {
      setErrorMessage(error.message);
    })
    .then(() => {
      const userPostDoc = firestore()
        .collection('users')
        .doc(post.userId)
        .collection('activities')
        .doc('posts');
      userPostDoc
        .get()
        .then(async (doc) => {
          if (doc.exists) {
            await userPostDoc.update({
              posts: firestore.FieldValue.arrayUnion(postDoc.id),
            });
          } else {
            await userPostDoc.set({
              posts: firestore.FieldValue.arrayUnion(postDoc.id),
            });
          }
        })
        .then(() => {
          AsyncStorage.setItem('refreshFeed', 'true');
        });
    });
};

export const likePost = async (postId?: string, userId?: string) => {
  if (postId && userId) {
    const postDoc = firestore().collection('posts').doc(postId);
    postDoc.get().then(async (doc) => {
      if (doc.exists) {
        const isLiked = doc.data()?.likes?.includes(userId);
        if (!isLiked) {
          await postDoc
            .update({
              likes: firestore.FieldValue.arrayUnion(userId),
            })
            .then(() => {
              const userDoc = firestore()
                .collection('users')
                .doc(userId)
                .collection('activities')
                .doc('likes');
              userDoc.get().then(async (doc) => {
                if (doc.exists) {
                  await userDoc.update({
                    likes: firestore.FieldValue.arrayUnion(postId),
                  });
                } else {
                  await userDoc.set({
                    likes: firestore.FieldValue.arrayUnion(postId),
                  });
                }
              });
            });
        } else {
          await postDoc
            .update({
              likes: firestore.FieldValue.arrayRemove(userId),
            })
            .then(() => {
              const userDoc = firestore()
                .collection('users')
                .doc(userId)
                .collection('activities')
                .doc('likes');
              userDoc.get().then(async (doc) => {
                if (doc.exists) {
                  await userDoc.update({
                    likes: firestore.FieldValue.arrayRemove(postId),
                  });
                } else {
                  await userDoc.set({
                    likes: firestore.FieldValue.arrayRemove(postId),
                  });
                }
              });
            });
        }
      }
    });
  }
};

export const getPostLikes = async (postId?: string) => {
  const [likes, setLikes] = useState<string[]>([]);
  useEffect(() => {
    const subscriber = firestore()
      .collection('posts')
      .doc(postId)
      .onSnapshot((documentSnapshot) => {
        setLikes(documentSnapshot.data()?.likes);
      });
    return () => subscriber();
  }, []);
  return likes;
};

export const getPostById = async (postId?: string) => {
  const postDoc = await firestore().collection('posts').doc(postId).get();
  const post = postDoc.data();
  let postObj: Post = {
    id: postDoc.id,
    userId: post?.userId,
    caption: post?.caption,
    image: post?.image,
    createdAt: post?.createdAt,
    likes: post?.likes,
  };
  return postObj;
};

export const deletePost = async (postId?: string, userId?: string) => {
  if (postId && userId) {
    await firestore()
      .collection('posts')
      .doc(postId)
      .delete()
      .then(() => {
        const userPostDoc = firestore()
          .collection('users')
          .doc(userId)
          .collection('activities')
          .doc('posts');
        userPostDoc.get().then(async (doc) => {
          if (doc.exists) {
            await userPostDoc.update({
              posts: firestore.FieldValue.arrayRemove(postId),
            });
          }
        });
      });
  }
};

export const getUserPosts = async ({
  userId,
  limit,
  setLastDoc,
  setPosts,
}: IGetUserPosts) => {
  firestore()
    .collection('posts')
    .orderBy('createdAt', 'desc')
    .where('userId', '==', userId)
    .limit(limit)
    .onSnapshot((querySnapshot) => {
      let posts: Post[] = [];
      querySnapshot.forEach((documentSnapshot) => {
        posts.push(documentSnapshot.data() as Post);
      });
      setPosts(posts);
      setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
    });
};

export const getMoreUserPosts = async ({
  userId,
  limit,
  lastDoc,
  setLastDoc,
  setPosts,
  setLoading,
}: IGetUserPosts) => {
  if (lastDoc) {
    setLoading && setLoading(true);
    firestore()
      .collection('posts')
      .orderBy('createdAt', 'desc')
      .where('userId', '==', userId)
      .startAfter(lastDoc)
      .limit(limit)
      .get()
      .then((querySnapshot) => {
        let newPosts: Post[] = [];
        querySnapshot.forEach((documentSnapshot) => {
          newPosts.push(documentSnapshot.data() as Post);
        });
        setPosts((prevPosts: Post[]) => [...prevPosts, ...newPosts]);
        setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
        setLoading && setLoading(false);
      });
  } else {
    setLoading && setLoading(false);
  }
};

export const favoritePost = async (postId?: string, userId?: string) => {
  if (postId && userId) {
    firestore()
      .collection('users')
      .doc(userId)
      .collection('activities')
      .doc('favorites')
      .get()
      .then(async (doc) => {
        if (doc.exists) {
          await firestore()
            .collection('users')
            .doc(userId)
            .collection('activities')
            .doc('favorites')
            .get()
            .then(async (doc) => {
              const isFavorited = doc.data()?.favorites?.includes(postId);
              if (!isFavorited) {
                await firestore()
                  .collection('users')
                  .doc(userId)
                  .collection('activities')
                  .doc('favorites')
                  .update({
                    favorites: firestore.FieldValue.arrayUnion(postId),
                  });
              } else if (isFavorited) {
                await firestore()
                  .collection('users')
                  .doc(userId)
                  .collection('activities')
                  .doc('favorites')
                  .update({
                    favorites: firestore.FieldValue.arrayRemove(postId),
                  });
              }
            });
        } else {
          await firestore()
            .collection('users')
            .doc(userId)
            .collection('activities')
            .doc('favorites')
            .set({
              favorites: firestore.FieldValue.arrayUnion(postId),
            });
        }
      });
  }
};

export const isPostFavorited = async (postId?: string, userId?: string) => {
  const [isFavorited, setIsFavorited] = useState(false);
  useEffect(() => {
    const subscriber = firestore()
      .collection('users')
      .doc(userId)
      .collection('activities')
      .doc('favorites')
      .onSnapshot((documentSnapshot) => {
        setIsFavorited(documentSnapshot.data()?.favorites?.includes(postId));
      });
    return () => subscriber();
  }, []);
  return isFavorited;
};
