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
  id: string;
  name: string;
  email: string;
  username: string;
  image: string;
};

type Comment = {
  id?: string;
  userId: string;
  text: string;
  createdAt: string;
  likes: Likes;
};

type Post = {
  id?: string;
  userId: string;
  image: string;
  caption: string;
  likes: Likes;
  comments?: string[];
  createdAt: string;
};

type Likes = {
  likes?: number;
  userIds: string[];
};
