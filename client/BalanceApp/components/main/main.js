// Vendors
import React, { Component, PropTypes } from 'react';
import { TouchableHighlight, Text, Button } from 'react-native';
import { connect } from 'react-redux';

// Components
import ProjectListContainer from '../project-list/project-list-container';
import { styles } from '../navigation/navigation-styles';

class MainScene extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  static navigationOptions = {
    title: () => <Text style={[styles.text, styles.title, styles.mainTitle]}>BALANCE</Text>,
    header: ({ state, setParams }) => ({
      style: { backgroundColor: '#333' },
      left: (
        <TouchableHighlight>
          <Text style={[styles.button, styles.text]}>!?</Text>
        </TouchableHighlight>
      ),
      right: (
        <TouchableHighlight>
          <Text style={[styles.button, styles.text]}>✚</Text>
        </TouchableHighlight>
      )
    })
  }

  constructor (props) {
    super(props);
  }

  onProjectTap (project) {
    this.props.navigation.navigate('Project', { projectId: project._id });
  }

  render () {
    return <ProjectListContainer onProjectTap={this.onProjectTap.bind(this)}/>;
  }
}

export default connect()(MainScene);