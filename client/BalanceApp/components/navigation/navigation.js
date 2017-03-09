// Vendors
import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';

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
  UserSearch
} from '../screens';

// Default header for all stack navs
const navigationOptions = {
  header: ({ navigate }) => {
    const tintColor = '#FFFFFF';
    const style = { backgroundColor: '#333' };

    return { tintColor, style };
  }
};

// screens included in all nav stacks
const defaultScreens = {
  UserProfile: { screen: UserProfile }
};

const ProjectsStack = StackNavigator({
  ...defaultScreens,
  Home: { screen: MainScene },
  Project: { screen: ProjectDetail },
  EditProject: { screen: EditProjectContainer }
}, { navigationOptions, initialRouteName: 'Home' });

const ActivityStack = StackNavigator({
  ...defaultScreens,
  Activity: { screen: Activity }
}, { navigationOptions, initialRouteName: 'Activity' });

const NotificationsStack = StackNavigator({
  ...defaultScreens,
  Notifications: { screen: Notifications }
}, { navigationOptions, initialRouteName: 'Notifications' });

const ProfileStack = StackNavigator({
  ...defaultScreens,
  Profile: { screen: Profile },
  UserSettings: { screen: UserSettings },
  UserSearch: { screen: UserSearch }
}, { navigationOptions, initialRouteName: 'Profile' });

const routes = {
  Projects: { screen: ProjectsStack },
  Activity: { screen: ActivityStack },
  Notifications: { screen: NotificationsStack },
  Profile: { screen: ProfileStack }
};

const TabBarNav = TabNavigator(routes, { lazyLoad: true });

export default TabBarNav;