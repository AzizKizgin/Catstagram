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

type FeedNavigationParamsList = {
  Feed: undefined;
  AddPost: undefined;
  Comments: {postId?: string};
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
  likes?: string[];
};

type Post = {
  id?: string;
  userId: string;
  image: PostImage;
  caption: string;
  likes: string[];
  createdAt: string;
};

type PostImage = {
  imageUri: string;
  height: number;
};
