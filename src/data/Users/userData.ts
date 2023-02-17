import firestore from '@react-native-firebase/firestore';
import {useEffect, useState} from 'react';
import {getPostById} from '../Posts/postData';

export const addUserInfo = async (user: User) => {
  if (user.id) {
    const userDoc = firestore()
      .collection('users')
      .doc(user.id)
      .collection('info')
      .doc('info');
    await userDoc.set(user);
  } else {
    console.log('User ID is undefined');
  }
};

export const getUserById = async (userId?: string) => {
  if (userId) {
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
  }
  return null;
};

export const checkUserLikedPost = async (postId?: string, userId?: string) => {
  const [liked, setLiked] = useState<boolean>(false);
  if (postId && userId) {
    const postDoc = await firestore().collection('posts').doc(postId).get();
    const post = postDoc.data();
    if (post) {
      if (post.likes?.includes(userId)) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    }
  }
  return liked;
};

export const getUserPosts = async (userId?: string) => {
  const allPosts: Post[] = [];
  if (userId) {
    let allPostIds: string[] = [];
    const allPostsDocs = await firestore()
      .collection('users')
      .doc(userId)
      .collection('activities')
      .doc('posts')
      .get()
      .then((doc) => {
        if (doc.exists) {
          allPostIds = doc.data()?.posts;
        }
      });
    if (allPostIds) {
      for (let i = 0; i < allPostIds.length; i++) {
        const post = await getPostById(allPostIds[i]);
        if (post) {
          allPosts.push(post);
        }
      }
    }
    allPosts.sort((a, b) => {
      return Number(b.createdAt) - Number(a.createdAt);
    });
    return allPosts;
  }
  return [];
};

export const updateUserInfo = async (
  userId?: string,
  userName?: string,
  userBio?: string,
) => {
  if (userId) {
    const userDoc = firestore()
      .collection('users')
      .doc(userId)
      .collection('info')
      .doc('info');
    await userDoc.update({
      username: userName,
      bio: userBio,
    });
  }
};
