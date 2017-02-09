// vendors
import React, { Component, PropTypes } from 'react';
import { View, Button } from 'react-native';
import { connect } from 'react-redux';

// styles
import { styles as NavStyles } from '../navigation/navigation-styles';

// actions
import { saveProject } from '../../actions';

// components
import EditProject from './edit-project';

function mapStateToProps (state, props) {
  return {
    project: state.open_project
  };
}

function mapDispatchToProps (dispatch) {
  return {
    updateProject: project => dispatch(saveProject(project))
  };
}

class EditProjectContainer extends Component {

  static propTypes = {
    project: PropTypes.object.isRequired,
    updateProject: PropTypes.func.isRequired
  };

  static navigationOptions = {
    header: ({ goBack, dispatch, state, navigate }) => {
      const style = { backgroundColor: '#333' };

      const title = 'Edit Project';

      const tintColor = '#FFFFFF';

      const left = (
        <Button
          color='#FFFFFF'
          style={[NavStyles.button, NavStyles.text, { fontWeight: 'normal' }]}
          title='Cancel'
          onPress={() => goBack()}
        />
      );

      return { style, left, title, tintColor };
    }
  };
  
  
  constructor (props) {
    super();
  }

  render () {
    console.log('WTF', this.props)
    let { project } = this.props;
    return <EditProject project={project} />;
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(EditProjectContainer);