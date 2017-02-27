// Vendors
import React from 'react';
import { StackNavigator, DrawerNavigator } from 'react-navigation';

// Screens
import {
  MainScene,
  ProjectDetail,
  EditProjectContainer,
  Activity,
  Help,
  Search
} from '../screens';

// components
import NavBtn from './nav-btn';

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

const HelpStack = StackNavigator({
  Help: { screen: Help }
}, { navigationOptions });

const SearchStack = StackNavigator({
  Search: { screen: Search }
}, { navigationOptions });

const LeftDrawer = DrawerNavigator({
  Main: { screen: MainStack },
  Activity: { screen: ActivityStack },
  Search: { screen: SearchStack },
  Help: { screen: HelpStack }
});

export default LeftDrawer;