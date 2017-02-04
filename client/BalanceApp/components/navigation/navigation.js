// Vendors
import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';

// Components
import MainScene from '../main/main';
import ProjectDetail from '../project-detail/project-detail';

const MainNavigation = StackNavigator({
  Home: { screen: MainScene },
  Project: { screen: ProjectDetail }
});

export default MainNavigation;