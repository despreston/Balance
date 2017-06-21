import React, { Component } from 'react';
import ProjectCategory from './project-category';
import NavBtn from '../../navigation/nav-btn';

class ProjectCategoryContainer extends Component {

  static navigationOptions = ({ navigation }) => {
    const { goBack } = navigation;
    const title = 'Select Category';
    const headerLeft = <NavBtn title='Cancel' onPress={ () => goBack() } />;
    return { title, headerLeft };
  };

  constructor (props) {
    super(props);
    this.onPress = this.onPress.bind(this);
  }

  onPress (category) {
    const { selectCategory } = this.props.navigation.state.params;
    selectCategory(category);
    this.props.navigation.goBack();
  }

  render () {
    return <ProjectCategory onPress={ this.onPress } />;
  }

}

export default ProjectCategoryContainer;