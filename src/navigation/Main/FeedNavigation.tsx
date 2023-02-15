import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {AddPost, Feed} from '../../screens';
import Comments from '../../screens/Comments';
import AddPostHeader from '../components/AddPostHeader';
import FeedHeader from '../components/FeedHeader';

const FeedNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'fade_from_bottom',
        headerShown: true,
        header(props) {
          if (props.route.name === 'AddPost') {
            return <AddPostHeader props={props} />;
          } else if (props.route.name === 'Feed') {
            return <FeedHeader props={props} />;
          } else {
            return null;
          }
        },
      }}>
      <Stack.Screen name="Feed" component={Feed} />
      <Stack.Screen name="AddPost" component={AddPost} />
      <Stack.Screen name="Comments" component={Comments} />
    </Stack.Navigator>
  );
};

export default FeedNavigation;
