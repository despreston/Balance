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
  UserSettings
} from '../screens';

// Default header for all stack navs
const navigationOptions = {
  header: ({ navigate }) => {
    const tintColor = '#FFFFFF';
    const style = { backgroundColor: '#333' };

    return { tintColor, style };
  }
};

const ProjectsStack = StackNavigator({
  Home: { screen: MainScene },
  Project: { screen: ProjectDetail },
  EditProject: { screen: EditProjectContainer }
}, { navigationOptions, initialRouteName: 'Home' });

const ActivityStack = StackNavigator({
  Activity: { screen: Activity }
}, { navigationOptions });

const NotificationsStack = StackNavigator({
  Notifications: { screen: Notifications }
}, { navigationOptions });

const ProfileStack = StackNavigator({
  Profile: { screen: Profile },
  UserSettings: { screen: UserSettings }
}, { navigationOptions });

const routes = {
  Projects: { screen: ProjectsStack },
  Activity: { screen: ActivityStack },
  Notifications: { screen: NotificationsStack },
  Profile: { screen: ProfileStack }
};

const TabBarNav = TabNavigator(routes, { lazyLoad: true });

export default TabBarNav;