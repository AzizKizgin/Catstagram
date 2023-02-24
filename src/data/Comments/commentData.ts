import firestore from '@react-native-firebase/firestore';
import {useEffect, useState} from 'react';

export const addComment = async (
  postId?: string,
  comment?: string,
  userId?: string,
  username?: string | null,
) => {
  if (postId && comment && userId && username) {
    const commentObj: Comment = {
      username: username,
      text: comment,
      createdAt: new Date().getTime().toString(),
      userId: userId,
      likes: [],
    };

    const commentDoc = await firestore()
      .collection('posts')
      .doc(postId)
      .collection('activities')
      .doc('postComments')
      .collection('comments')
      .add(commentObj);

    const commentId = commentDoc.id;
    await commentDoc.update({
      id: commentId,
    });
  }
};

export const likeComment = async (
  postId?: string,
  commentId?: string,
  userId?: string,
) => {
  if (postId && commentId && userId) {
    const commentDoc = firestore()
      .collection('posts')
      .doc(postId)
      .collection('activities')
      .doc('postComments')
      .collection('comments')
      .doc(commentId);

    commentDoc.get().then(async (doc) => {
      if (doc.exists) {
        const isLiked = doc.data()?.likes?.includes(userId);
        if (!isLiked) {
          await commentDoc.update({
            likes: firestore.FieldValue.arrayUnion(userId),
          });
        } else {
          await commentDoc.update({
            likes: firestore.FieldValue.arrayRemove(userId),
          });
        }
      }
    });
  }
};

export const getCommentLikes = async (postId?: string, commentId?: string) => {
  const [likes, setLikes] = useState<string[]>([]);
  useEffect(() => {
    const unsubscribe = firestore()
      .collection('posts')
      .doc(postId)
      .collection('activities')
      .doc('postComments')
      .collection('comments')
      .doc(commentId)
      .onSnapshot((doc) => {
        if (doc.exists) {
          setLikes(doc.data()?.likes);
        }
      });
    return () => unsubscribe();
  }, []);
  return likes;
};
