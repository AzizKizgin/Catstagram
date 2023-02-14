type AuthNavigationParamsList = {
  Login: undefined;
  Register: undefined;
  ResetPassword: undefined;
};

type MainNavigationParamsList = {
  Home: undefined;
  Profile: undefined;
  Explore: undefined;
};

type User = {
  id?: string;
  email: string;
  username: string;
  image: string;
  bio: string;
  createdAt: string;
};

type Comment = {
  id?: string;
  userId: string;
  text: string;
  createdAt: string;
  likes?: Likes;
};

type Post = {
  id?: string;
  userId: string;
  image: PostImage;
  caption: string;
  likes?: Likes;
  createdAt: string;
};

type Likes = {
  userIds: string[];
};

type PostImage = {
  imageUri: string;
  height: number;
};
