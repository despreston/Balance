// Vendors
import React, { Component, PropTypes } from 'react';
import { Text, Button } from 'react-native';
import { connect } from 'react-redux';
import { get } from 'lodash';

// Components
import ProjectListContainer from '../project-list/project-list-container';
import { openProject } from '../../actions';
import { styles } from '../navigation/navigation-styles';

class MainScene extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  static navigationOptions = {
    header: ({ state, navigate, dispatch }) => ({
      title: <Text style={[styles.text, styles.title, styles.mainTitle]}>BALANCE</Text>,
      style: { backgroundColor: '#333' },
      left: (
        <Button
          color='#FFFFFF'
          style={[styles.button, styles.text]}
          title="!?"
          onPress={() => null}
        />
      ),
      right: (
        <Button
          color='#FFFFFF'
          style={[styles.button, styles.text]}
          onPress={() => state.params.openProject()}
          title="✚"
        />
      )
    })
  };

  constructor (props) {
    super(props);
  }

  componentDidMount () {
    this.props.navigation.setParams({
      openProject: this.openProject.bind(this)
    });
  }

  openProject (project) {
    const id = get(project, '_id');
    this.props.dispatch(openProject(id));
    this.props.navigation.navigate('Project', {new: !!id ? false : true});
  }

  render () {
    return <ProjectListContainer onProjectTap={this.openProject.bind(this)}/>;
  }
}

export default connect()(MainScene);