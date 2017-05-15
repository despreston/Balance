// Vendors
import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { View, Image } from 'react-native';

// Screens
import {
  MainScene,
  ProjectDetailContainer,
  EditProjectContainer,
  ActivityContainer,
  NotificationsContainer,
  Profile,
  UserSettings,
  UserProfile,
  UserSearch,
  NoteContainer,
  Auth,
  FriendRequestList
} from '../screens';

import UnreadNotifications from './unread-notifications/unread-notifications';

import Colors from '../colors';

const navigationOptions = {
  headerTintColor: Colors.white,
  headerStyle: { backgroundColor: Colors.purple }
};

// screens included in all nav stacks
const defaultScreens = {
  UserProfile: { screen: UserProfile },
  Note: { screen: NoteContainer },
  Project: { screen: ProjectDetailContainer },
  EditProject: { screen: EditProjectContainer }
};

function icon (path) {
  return <Image source={ path } style={{ width: 26, height: 26 }} />;
}

const NotificationIcon = ({ focused }) => {
  let rightIcon = focused
    ? icon(require('../../assets/icons/notifications-tabbar-selected.png'))
    : icon(require('../../assets/icons/notifications-tabbar.png'));

  return (
    <View>
      { rightIcon }
      <UnreadNotifications />
    </View>
  );
}

const ProjectsStack = StackNavigator({
  ...defaultScreens,
  Home: { screen: MainScene }
}, {
  navigationOptions: Object.assign({}, navigationOptions, {
    tabBarLabel: 'Projects',
    tabBarIcon: ({ focused }) => {
      return focused
        ? icon(require('../../assets/icons/projects-tabbar-selected.png'))
        : icon(require('../../assets/icons/projects-tabbar.png'));
    }
  }),
  initialRouteName: 'Home'
});

const ActivityStack = StackNavigator({
  ...defaultScreens,
  Activity: { screen: ActivityContainer }
}, {
  navigationOptions: Object.assign({}, navigationOptions, {
    tabBarLabel: 'Activity',
    tabBarIcon: ({ focused }) => {
      return focused
        ? icon(require('../../assets/icons/activity-tabbar-selected.png'))
        : icon(require('../../assets/icons/activity-tabbar.png'));
    }
  }),
  initialRouteName: 'Activity'
});

const NotificationsStack = StackNavigator({
  ...defaultScreens,
  Notifications: { screen: NotificationsContainer },
  FriendRequests: { screen: FriendRequestList }
}, {
  navigationOptions: Object.assign({}, navigationOptions, {
    tabBarLabel: 'Notifications',
    tabBarIcon: ({ focused }) => {
      return <NotificationIcon focused={ focused } />
    }
  }), 
  initialRouteName: 'Notifications'
});

const ProfileStack = StackNavigator({
  ...defaultScreens,
  Profile: { screen: Profile },
  UserSettings: { screen: UserSettings },
  UserSearch: { screen: UserSearch }
}, {
  navigationOptions: Object.assign({}, navigationOptions, {
    tabBarLabel: 'Profile',
    tabBarIcon: ({ focused }) => {
      return focused
        ? icon(require('../../assets/icons/profile-tabbar-selected.png'))
        : icon(require('../../assets/icons/profile-tabbar.png'));
    } 
  }), 
  initialRouteName: 'Profile'
});

const routes = {
  Projects: { screen: ProjectsStack },
  Activity: { screen: ActivityStack },
  Notifications: { screen: NotificationsStack },
  Profile: { screen: ProfileStack }
};

const tabBarOptions = {
  activeTintColor: Colors.purple,
  inactiveTintColor: Colors.gray.tundora
};

const App = TabNavigator(routes, {
  lazy: true,
  tabBarOptions
});

const RootNav = StackNavigator({
  Login: { screen: Auth },
  App: { screen: App }
}, {
  headerMode: 'screen',
  navigationOptions: {
    header: null
  }
});

export default RootNav;