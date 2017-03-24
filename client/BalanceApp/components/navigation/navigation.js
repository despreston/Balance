// Vendors
import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Image } from 'react-native';

// Screens
import {
  MainScene,
  ProjectDetail,
  EditProjectContainer,
  Activity,
  Notifications,
  Profile,
  UserSettings,
  UserProfile,
  UserSearch,
  Note
} from '../screens';

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
  Note: { screen: Note }
};

function icon (path) {
  return <Image source={ path } style={{ width: 26, height: 26 }} />;
}

const ProjectsStack = StackNavigator({
  ...defaultScreens,
  Home: { screen: MainScene },
  Project: { screen: ProjectDetail },
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
  Notifications: { screen: Notifications }
}, { 
  navigationOptions: Object.assign({}, navigationOptions, { tabBar: 
    {
      icon: ({ focused }) => {
        return focused 
          ? icon(require('../../assets/icons/notifications-tabbar-selected.png'))
          : icon(require('../../assets/icons/notifications-tabbar.png'));
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

const TabBarNav = TabNavigator(routes, { lazyLoad: true, tabBarOptions });

export default TabBarNav;