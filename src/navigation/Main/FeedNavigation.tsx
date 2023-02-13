import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {AddPost, Feed} from '../../screens';
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
          }
          return <FeedHeader props={props} />;
        },
      }}>
      <Stack.Screen name="Feed" component={Feed} />
      <Stack.Screen name="AddPost" component={AddPost} />
    </Stack.Navigator>
  );
};

export default FeedNavigation;
