// Vendors
import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

// Components
import MainScene from '../main/main';
import ProjectDetail from '../project-detail/project-detail';

const MainNavigation = StackNavigator({
  Home: { screen: MainScene },
  Project: { screen: ProjectDetail }
});

export default MainNavigation;