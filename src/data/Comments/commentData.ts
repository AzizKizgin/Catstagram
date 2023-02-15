import firestore from '@react-native-firebase/firestore';
import {useEffect, useState} from 'react';

export const addComment = async (
  postId?: string,
  comment?: string,
  userId?: string,
) => {
  if (postId && comment && userId) {
    const commentObj: Comment = {
      text: comment,
      createdAt: new Date().getTime().toString(),
      userId: userId,
    };
    const postDoc = firestore()
      .collection('posts')
      .doc(postId)
      .collection('activities')
      .doc('comments');
    postDoc.get().then(async (doc) => {
      if (doc.exists) {
        await postDoc.update({
          comments: firestore.FieldValue.arrayUnion(commentObj),
        });
      } else {
        await postDoc.set({
          comments: firestore.FieldValue.arrayUnion(commentObj),
        });
      }
    });
  }
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
  if (comments) {
    comments.sort((a, b) => {
      if (a.likes?.length && b.likes?.length) {
        return b.likes?.length - a.likes?.length;
      }
      return 0;
    });
  }
  return comments;
};
