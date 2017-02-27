// Vendors
import React from 'react';
import { StackNavigator, DrawerNavigator } from 'react-navigation';

// Screens
import {
  MainScene,
  ProjectDetail,
  EditProjectContainer,
  Feed,
  Help
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

const FeedStack = StackNavigator({
  Feed: { screen: Feed }
}, { navigationOptions });

const HelpStack = StackNavigator({
  Help: { screen: Help }
}, { navigationOptions });

const LeftDrawer = DrawerNavigator({
  Main: { screen: MainStack },
  Feed: { screen: FeedStack },
  Help: { screen: HelpStack }
});

export default LeftDrawer;