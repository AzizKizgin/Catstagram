import firestore from '@react-native-firebase/firestore';

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
      id: postId + userId + new Date().getTime().toString(),
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
  let comments: Comment[] = [];
  const commentDoc = await firestore()
    .collection('posts')
    .doc(postId)
    .collection('activities')
    .doc('comments')
    .get();
  if (commentDoc.exists) {
    comments.push(...commentDoc.data()?.comments);
  }
  if (comments) {
    comments.sort((a, b) => {
      if (a.likes?.length || b.likes?.length) {
        return (b.likes?.length || 0) - (a.likes?.length || 0);
      } else if (a.createdAt && b.createdAt) {
        return Number(a.createdAt) - Number(b.createdAt);
      }
      return 0;
    });
  }
  return comments;
};

export const likeComment = async (
  postId?: string,
  commentId?: string,
  userId?: string,
) => {
  if (postId && commentId && userId) {
    const postDoc = firestore()
      .collection('posts')
      .doc(postId)
      .collection('activities')
      .doc('comments');
    postDoc.get().then(async (doc) => {
      if (doc.exists) {
        const comments = doc.data()?.comments;
        const comment = comments?.find((c: Comment) => c.id === commentId);
        const index = comments?.indexOf(comment);
        if (comment?.likes?.includes(userId)) {
          comment.likes = comment.likes.filter((id: string) => id !== userId);
        } else {
          comment.likes.push(userId);
        }
        comments?.splice(index, 1, comment);
        await postDoc.update({
          comments: comments,
        });
      }
    });
  }
};

export const getCommentLikes = async (postId?: string, commentId?: string) => {
  let likes: string[] = [];
  if (postId && commentId) {
    const commentDoc = await firestore()
      .collection('posts')
      .doc(postId)
      .collection('activities')
      .doc('comments')
      .get();

    if (commentDoc.exists) {
      const comment = commentDoc
        .data()
        ?.comments.find((c: Comment) => c.id === commentId);
      likes = comment?.likes || [];
    }
    return likes;
  }
  return likes;
};
