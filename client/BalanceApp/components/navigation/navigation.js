import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { View, Image } from 'react-native';
import UnreadNotifications from './unread-notifications/unread-notifications';
import Colors from '../colors';
import {
  MainScene,
  ProjectDetailContainer,
  EditProjectContainer,
  ActivityContainer,
  NotificationsContainer,
  Profile,
  UserSettingsContainer,
  UserProfile,
  UserSearch,
  NoteContainer,
  Auth,
  FriendRequestList,
  UserBookmarksContainer,
  ProjectCategoryContainer,
  ProjectBookmarks,
  ExploreContainer,
  UserStatsContainer
} from '../screens';

const navigationOptions = {
  headerTintColor: Colors.purple,
  headerStyle: { backgroundColor: Colors.white, borderBottomWidth: 0 }
};

// screens included in all nav stacks
const defaultScreens = {
  UserProfile: { screen: UserProfile },
  Note: { screen: NoteContainer },
  Project: { screen: ProjectDetailContainer },
  EditProject: { screen: EditProjectContainer },
  ProjectBookmarks: { screen: ProjectBookmarks },
  ProjectCategory: { screen: ProjectCategoryContainer },
  UserBookmarks: { screen: UserBookmarksContainer },
  UserStats: { screen: UserStatsContainer }
};

function icon (path) {
  return <Image source={ path } style={{ width: 26, height: 26 }} />;
}

const NotificationIcon = ({ focused }) => {
  const rightIcon = focused
    ? icon(require('../../assets/icons/notifications-tabbar-selected.png'))
    : icon(require('../../assets/icons/notifications-tabbar.png'));

  return (
    <View style={{ height: 26 }}>
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

const ExploreStack = StackNavigator({
  ...defaultScreens,
  Explore: { screen: ExploreContainer }
}, {
  navigationOptions: Object.assign({}, navigationOptions, {
    tabBarLabel: 'Explore',
    tabBarIcon: ({ focused }) => {
      return focused
        ? icon(require('../../assets/icons/explore-tabbar-selected.png'))
        : icon(require('../../assets/icons/explore-tabbar.png'));
    }
  }),
  initialRouteName: 'Explore'
});

const NotificationsStack = StackNavigator({
  ...defaultScreens,
  Notifications: { screen: NotificationsContainer },
  FriendRequests: { screen: FriendRequestList }
}, {
  navigationOptions: Object.assign({}, navigationOptions, {
    tabBarLabel: 'Notifications',
    headerTintColor: Colors.purple,
    tabBarIcon: ({ focused }) => {
      return <NotificationIcon focused={ focused } />
    }
  }),
  initialRouteName: 'Notifications'
});

const ProfileStack = StackNavigator({
  ...defaultScreens,
  Profile: { screen: Profile },
  UserSettingsContainer: { screen: UserSettingsContainer },
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
  Explore: { screen: ExploreStack },
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
