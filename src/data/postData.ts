import firestore from '@react-native-firebase/firestore';

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
