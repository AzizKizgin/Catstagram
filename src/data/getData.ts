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

export const getUserById = async (userId: string) => {
  const userDoc = await firestore()
    .collection('users')
    .doc(userId)
    .collection('info')
    .doc('info')
    .get();
  const user = userDoc.data();
  if (user) {
    let userObj: User = {
      id: user.id,
      username: user.username,
      email: user.email,
      image: user.image,
      bio: user.bio,
      createdAt: user.createdAt,
    };
    return userObj;
  }
  return null;
};

export const getComments = async (postId?: string) => {
  const [comments, setComments] = useState<Comment[]>([]);
  useEffect(() => {
    const subscriber = firestore()
      .collection('posts')
      .doc(postId)
      .collection('activities')
      .doc('comments')
      .onSnapshot((documentSnapshot) => {
        setComments(documentSnapshot.data()?.comments);
      });
    return () => subscriber();
  }, []);
  comments.sort((a, b) => {
    if (a.likes?.userIds.length && b.likes?.userIds.length) {
      return b.likes?.userIds.length - a.likes?.userIds.length;
    }
    return 0;
  });
  return comments;
};
