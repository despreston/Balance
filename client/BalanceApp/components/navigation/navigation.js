// Vendors
import React from 'react';
import { StackNavigator, DrawerNavigator } from 'react-navigation';

// Screens
import {
  MainScene,
  ProjectDetail,
  EditProjectContainer,
  Feed
} from '../screens';

// components
import NavBtn from './nav-btn';

// Default header for all stack navs
const navigationOptions = {
  header: ({ navigate }) => {
    const tintColor = '#FFFFFF';
    
    const style = { backgroundColor: '#333' };

    const left = (
      <NavBtn
        title="More"
        onPress={() => navigate('DrawerOpen')}
      />
    );

    return { tintColor, style, left };
  }
};

const MainStack = StackNavigator({
  Home: { screen: MainScene },
  Project: { screen: ProjectDetail },
  EditProject: { screen: EditProjectContainer }
}, { navigationOptions });

const FeedStack = StackNavigator({
  Feed: { screen: Feed },
}, { navigationOptions });

const LeftDrawer = DrawerNavigator({
  Main: { screen: MainStack },
  Feed: { screen: FeedStack }
});

export default LeftDrawer;