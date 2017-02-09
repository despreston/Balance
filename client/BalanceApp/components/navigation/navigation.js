// Vendors
import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';

// Components
import MainScene from '../main/main';
import ProjectDetail from '../project-detail/project-detail';
import EditProjectContainer from '../edit-project/edit-project-container';

const MainNavigation = StackNavigator({
  Home: { screen: MainScene },
  Project: { screen: ProjectDetail },
  EditProject: { screen: EditProjectContainer }
}, {
  navigationOptions: {
    header: {
      tintColor: '#FFFFFF',
      style: {
        backgroundColor: '#333'
      }
    }
  }
});

export default MainNavigation;