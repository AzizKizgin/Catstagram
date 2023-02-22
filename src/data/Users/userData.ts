import firestore from '@react-native-firebase/firestore';
import {useState} from 'react';
import {sendNotification} from '../../utils/helpers';
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

export const getUserPostsCount = async (userId?: string) => {
  if (userId) {
    let allPostIds: string[] = [];
    await firestore()
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

    return allPostIds.length;
  }
  return 0;
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

export const getUserLikedPosts = async (userId?: string) => {
  const allLikedPosts: Post[] = [];
  if (userId) {
    let allLikedPostsIds: string[] = [];
    const allLikedPostsDocs = await firestore()
      .collection('users')
      .doc(userId)
      .collection('activities')
      .doc('likes')
      .get()
      .then((doc) => {
        if (doc.exists) {
          allLikedPostsIds = doc.data()?.likes;
        }
      });
    if (allLikedPostsIds) {
      for (let i = 0; i < allLikedPostsIds.length; i++) {
        const post = await getPostById(allLikedPostsIds[i]);
        if (post) {
          allLikedPosts.push(post);
        }
      }
    }
    allLikedPosts.sort((a, b) => {
      return Number(b.createdAt) - Number(a.createdAt);
    });
    return allLikedPosts;
  }
  return [];
};

export const fallowUser = async (
  userId?: string,
  userName?: string,
  followId?: string,
  fallowDeviceToken?: string,
) => {
  if (userId && followId) {
    const fallowDoc = firestore()
      .collection('users')
      .doc(userId)
      .collection('activities')
      .doc('follows');

    fallowDoc
      .get()
      .then(async (doc) => {
        if (doc.exists) {
          if (!doc.data()?.follows?.includes(followId)) {
            await fallowDoc.update({
              follows: firestore.FieldValue.arrayUnion(followId),
            });
          }
        } else {
          await fallowDoc.set({
            follows: firestore.FieldValue.arrayUnion(followId),
          });
        }
      })
      .then(async () => {
        const targetUserFallowersDoc = firestore()
          .collection('users')
          .doc(followId)
          .collection('activities')
          .doc('fallowers');

        targetUserFallowersDoc.get().then(async (doc) => {
          if (doc.exists) {
            if (!doc.data()?.fallowers?.includes(userId)) {
              await targetUserFallowersDoc.update({
                fallowers: firestore.FieldValue.arrayUnion(userId),
              });
            }
          } else {
            await targetUserFallowersDoc.set({
              fallowers: firestore.FieldValue.arrayUnion(userId),
            });
          }
        });

        const targetUserFallowRequestDoc = firestore()
          .collection('users')
          .doc(followId)
          .collection('activities')
          .doc('fallowRequests');
        targetUserFallowRequestDoc
          .get()
          .then(async (doc) => {
            if (doc.exists) {
              if (!doc.data()?.fallowRequests?.includes(userId)) {
                await targetUserFallowRequestDoc.update({
                  fallowRequests: firestore.FieldValue.arrayUnion(userId),
                });
              }
            } else {
              await targetUserFallowRequestDoc.set({
                fallowRequests: firestore.FieldValue.arrayUnion(userId),
              });
            }
          })
          .then(async () => {
            if (fallowDeviceToken) {
              sendNotification(
                fallowDeviceToken,
                'New Fallow',
                `${userName} just fallowed you`,
              );
            }
          });
      });
  }
};

export const unfallowUser = async (userId?: string, followId?: string) => {
  if (userId && followId) {
    const fallowDoc = firestore()
      .collection('users')
      .doc(userId)
      .collection('activities')
      .doc('follows');

    fallowDoc.get().then(async (doc) => {
      if (doc.exists) {
        if (doc.data()?.follows?.includes(followId)) {
          await fallowDoc.update({
            follows: firestore.FieldValue.arrayRemove(followId),
          });
        }
      }
    });
  }
};

export const getUserFallowers = async (userId?: string) => {
  const allFallowers: User[] = [];
  if (userId) {
    let allFallowersIds: string[] = [];
    const allFallowersDocs = await firestore()
      .collection('users')
      .doc(userId)
      .collection('activities')
      .doc('fallowers')
      .get()
      .then((doc) => {
        if (doc.exists) {
          allFallowersIds = doc.data()?.fallowers;
        }
      });
    if (allFallowersIds) {
      for (let i = 0; i < allFallowersIds.length; i++) {
        const user = await getUserById(allFallowersIds[i]);
        if (user) {
          allFallowers.push(user);
        }
      }
    }
    return allFallowers;
  }
  return [];
};

export const getUserFallowing = async (userId?: string) => {
  const allFallowing: User[] = [];
  if (userId) {
    let allFallowingIds: string[] = [];
    const allFallowingDocs = await firestore()
      .collection('users')
      .doc(userId)
      .collection('activities')
      .doc('follows')
      .get()
      .then((doc) => {
        if (doc.exists) {
          allFallowingIds = doc.data()?.follows;
        }
      });
    if (allFallowingIds) {
      for (let i = 0; i < allFallowingIds.length; i++) {
        const user = await getUserById(allFallowingIds[i]);
        if (user) {
          allFallowing.push(user);
        }
      }
    }
    return allFallowing;
  }
  return [];
};

export const isUserFallowingTarget = async (
  userId?: string,
  followId?: string,
) => {
  let isFallowing = false;
  if (userId && followId) {
    const fallowDoc = await firestore()
      .collection('users')
      .doc(userId)
      .collection('activities')
      .doc('follows')
      .get();
    if (fallowDoc.exists) {
      if (fallowDoc.data()?.follows?.includes(followId)) {
        isFallowing = true;
      } else {
        isFallowing = false;
      }
    }
  }
  return isFallowing;
};

export const isTargetFallowingUser = async (
  userId?: string,
  followId?: string,
) => {
  let isFallowing = false;
  if (userId && followId) {
    const fallowDoc = await firestore()
      .collection('users')
      .doc(followId)
      .collection('activities')
      .doc('follows')
      .get();
    if (fallowDoc.exists) {
      if (fallowDoc.data()?.follows?.includes(userId)) {
        isFallowing = true;
      } else {
        isFallowing = false;
      }
    }
  }
  return isFallowing;
};

export const getFallowRequests = async (userId?: string) => {
  const allFallowRequests: User[] = [];
  if (userId) {
    let allFallowRequestsIds: string[] = [];
    const allFallowRequestsDocs = await firestore()
      .collection('users')
      .doc(userId)
      .collection('activities')
      .doc('fallowRequests')
      .get()
      .then((doc) => {
        if (doc.exists) {
          allFallowRequestsIds = doc.data()?.fallowRequests;
        }
      });
    if (allFallowRequestsIds) {
      for (let i = 0; i < allFallowRequestsIds.length; i++) {
        const user = await getUserById(allFallowRequestsIds[i]);
        if (user) {
          allFallowRequests.push(user);
        }
      }
    }
    return allFallowRequests;
  }
  return [];
};

export const acceptFallowRequest = async (
  userId?: string,
  userName?: string,
  followId?: string,
  fallowDeviceToken?: string,
) => {
  fallowUser(userId, userName, followId, fallowDeviceToken).then(() => {
    const fallowRequestDoc = firestore()
      .collection('users')
      .doc(userId)
      .collection('activities')
      .doc('fallowRequests');
    fallowRequestDoc.get().then(async (doc) => {
      if (doc.exists) {
        if (doc.data()?.fallowRequests?.includes(followId)) {
          await fallowRequestDoc.update({
            fallowRequests: firestore.FieldValue.arrayRemove(followId),
          });
        }
      }
    });
  });
};

export const declineFallowRequest = async (
  userId?: string,
  followId?: string,
) => {
  const fallowRequestDoc = firestore()
    .collection('users')
    .doc(userId)
    .collection('activities')
    .doc('fallowRequests');
  fallowRequestDoc.get().then(async (doc) => {
    if (doc.exists) {
      if (doc.data()?.fallowRequests?.includes(followId)) {
        await fallowRequestDoc.update({
          fallowRequests: firestore.FieldValue.arrayRemove(followId),
        });
      }
    }
  });
};
