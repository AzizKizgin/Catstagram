import firestore from '@react-native-firebase/firestore';

export const addPost = async (
  post: Post,
  setErrorMessage: (message: string) => void,
) => {
  const postDoc = firestore().collection('posts').doc(post.id);
  await postDoc
    .set(post)
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
