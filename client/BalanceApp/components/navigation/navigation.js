// Vendors
import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { View, Image } from 'react-native';

// Screens
import {
  MainScene,
  ProjectDetailContainer,
  EditProjectContainer,
  Activity,
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

// Default header for all stack navs
const navigationOptions = {
  header: ({ navigate }) => {
    const tintColor = Colors.white;
    const style = { backgroundColor: Colors.purple };

    return { tintColor, style };
  }
};

// screens included in all nav stacks
const defaultScreens = {
  UserProfile: { screen: UserProfile },
  Note: { screen: NoteContainer },
  Project: { screen: ProjectDetailContainer }
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
  Home: { screen: MainScene },
  EditProject: { screen: EditProjectContainer }
}, {
  navigationOptions: Object.assign({}, navigationOptions, { tabBar:
    {
      icon: ({ focused }) => {
        return focused
          ? icon(require('../../assets/icons/projects-tabbar-selected.png'))
          : icon(require('../../assets/icons/projects-tabbar.png'));
      }
    }
  }),
  initialRouteName: 'Home'
});

const ActivityStack = StackNavigator({
  ...defaultScreens,
  Activity: { screen: Activity }
}, {
  navigationOptions: Object.assign({}, navigationOptions, { tabBar: 
    {
      icon: ({ focused }) => {
        return focused
          ? icon(require('../../assets/icons/activity-tabbar-selected.png'))
          : icon(require('../../assets/icons/activity-tabbar.png'));
      }
    }
  }),
  initialRouteName: 'Activity'
});

const NotificationsStack = StackNavigator({
  ...defaultScreens,
  Notifications: { screen: NotificationsContainer },
  FriendRequests: { screen: FriendRequestList }
}, {
  navigationOptions: Object.assign({}, navigationOptions, { tabBar: 
    {
      icon: ({ focused }) => {
        return <NotificationIcon focused={ focused } />
      }
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
  navigationOptions: Object.assign({}, navigationOptions, { tabBar: 
    {
      icon: ({ focused }) => {
        return focused
          ? icon(require('../../assets/icons/profile-tabbar-selected.png'))
          : icon(require('../../assets/icons/profile-tabbar.png'));
      }
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
  lazyLoad: true,
  backBehavior: 'none',
  tabBarOptions
});

const RootNav = StackNavigator({
  Login: { screen: Auth },
  App: { screen: App }
}, {
  headerMode: 'screen',
  navigationOptions: {
    header: { visible: false }
  }
});

export default RootNav;