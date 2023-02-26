import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Account, Feed} from '../../screens';
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
          if (props.route.name === 'Feed') {
            return <FeedHeader props={props} />;
          } else {
            return null;
          }
        },
      }}>
      <Stack.Screen name="Feed" component={Feed} />
      <Stack.Screen name="UserAccount" component={Account} />
    </Stack.Navigator>
  );
};

export default FeedNavigation;
