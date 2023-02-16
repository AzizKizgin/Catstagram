import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Icon} from 'native-base';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import theme from '../../theme';
import {AddPost} from '../screens';
import AddPostHeader from './components/AddPostHeader';
import {AccountNavigation, FeedNavigation, SearchNavigation} from './Main';

const MainTab = () => {
  const Tab = createBottomTabNavigator<MainTabParamsList>();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: theme.colors.itemBgDark,
          borderTopColor: theme.colors.itemBgDark,
          height: 50,
        },
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarIcon: ({focused}) => {
          let iconName: string = '';
          switch (route.name) {
            case 'Home':
              iconName = 'ios-home-sharp';
              break;
            case 'Explore':
              iconName = 'search';
              break;
            case 'Profile':
              iconName = 'person';
              break;
          }
          return (
            <Icon
              as={<Ionicons name={iconName} />}
              size="lg"
              color={focused ? 'pink' : 'cyan'}
            />
          );
        },
      })}>
      <Tab.Screen name="Home" component={FeedNavigation} />
      <Tab.Screen name="Explore" component={SearchNavigation} />
      <Tab.Screen name="Profile" component={AccountNavigation} />
    </Tab.Navigator>
  );
};

const MainNavigation = () => {
  const Stack = createNativeStackNavigator<MainNavigationParamsList>();
  return (
    <Stack.Navigator
      screenOptions={({route}) => ({
        headerShown: route.name === 'AddPost',
        header(props) {
          if (props.route.name === 'AddPost') {
            return <AddPostHeader props={props} />;
          }
        },
      })}>
      <Stack.Screen name="MainTab" component={MainTab} />
      <Stack.Screen name="AddPost" component={AddPost} />
    </Stack.Navigator>
  );
};

export default MainNavigation;
