type AuthNavigationParamsList = {
  Login: undefined;
  Register: undefined;
  ResetPassword: undefined;
};

type MainTabParamsList = {
  Home: undefined;
  Profile: undefined;
  Explore: undefined;
};

type FeedNavigationParamsList = {
  Feed: undefined;
  Comments: {postId?: string};
  UserAccount: {userId?: string};
};

type AccountNavigationParamsList = {
  Account: undefined;
  PostDetail: {post: Post};
};

type MainNavigationParamsList = {
  MainTab: undefined;
  AddPost: undefined;
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
  username: string;
  text: string;
  createdAt: string;
  likes?: string[];
};

type Post = {
  id?: string;
  userId: string;
  image: PostImage;
  caption: string;
  likes?: string[];
  createdAt: string;
};

type PostImage = {
  imageUri: string;
  height: number;
};

type ToastType = 'success' | 'info' | 'warning';
