import firestore from '@react-native-firebase/firestore';
import {useEffect, useState} from 'react';

export const getPosts = async () => {
  const allPostsDocs = await firestore().collection('posts').get();
  const allPosts = allPostsDocs.docs.map((doc) => doc.data());
  let posts: Post[] = [];
  allPosts.map((post, index) => {
    let postObj: Post = {
      id: allPostsDocs.docs[index].id,
      userId: post.userId,
      caption: post.caption,
      image: post.image,
      createdAt: post.createdAt,
      likes: post.likes,
    };
    posts.push(postObj);
  });
  posts.sort((a, b) => {
    return Number(b.createdAt) - Number(a.createdAt);
  });
  return posts;
};

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
      userPostDoc.get().then(async (doc) => {
        if (doc.exists) {
          await userPostDoc.update({
            posts: firestore.FieldValue.arrayUnion(postDoc.id),
          });
        } else {
          await userPostDoc.set({
            posts: firestore.FieldValue.arrayUnion(postDoc.id),
          });
        }
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
