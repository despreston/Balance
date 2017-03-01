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
  Friends
} from '../screens';

// Default header for all stack navs
const navigationOptions = {
  header: ({ navigate }) => {
    const tintColor = '#FFFFFF';
    const style = { backgroundColor: '#333' };

    return { tintColor, style };
  }
};

const MainStack = StackNavigator({
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

const FriendsStack = StackNavigator({
  Friends: { screen: Friends }
}, { navigationOptions });

const routes = {
  Main: { screen: MainStack },
  Activity: { screen: ActivityStack },
  Notifications: { screen: NotificationsStack },
  Friends: { screen: FriendsStack }
};

const TabBarNav = TabNavigator(routes);

export default TabBarNav;