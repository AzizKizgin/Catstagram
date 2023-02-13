import firestore from '@react-native-firebase/firestore';
import {useState} from 'react';

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
      comments: post.comments,
    };
    posts.push(postObj);
  });
  posts.sort((a, b) => {
    return Number(b.createdAt) - Number(a.createdAt);
  });
  return posts;
};
