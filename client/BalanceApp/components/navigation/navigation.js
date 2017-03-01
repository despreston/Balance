// Vendors
import React from 'react';
import { StackNavigator, DrawerNavigator, TabNavigator } from 'react-navigation';

// Screens
import {
  MainScene,
  ProjectDetail,
  EditProjectContainer,
  Activity,
  Notifications,
  Profile
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
}, { navigationOptions });

const ActivityStack = StackNavigator({
  Activity: { screen: Activity }
}, { navigationOptions });

const NotificationsStack = StackNavigator({
  Notifications: { screen: Notifications }
}, { navigationOptions });

const ProfileStack = StackNavigator({
  Profile: { screen: Profile }
}, { navigationOptions });

const routes = {
  Projects: { screen: ProjectsStack },
  Activity: { screen: ActivityStack },
  Notifications: { screen: NotificationsStack },
  Profile: { screen: ProfileStack }
};

const TabBarNav = TabNavigator(routes);

export default TabBarNav;