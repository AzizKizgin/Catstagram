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
