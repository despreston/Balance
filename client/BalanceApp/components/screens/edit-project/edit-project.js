// vendors
import React, { Component, PropTypes } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput
} from 'react-native';

// styles
import Styles from './edit-project-style';

// components
import PrivacyPicker from '../../privacy-picker/privacy-picker';

export default class EditProject extends Component {

  static propTypes = {
    project: PropTypes.object.isRequired,
    onEdit: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);

    this.state = {
      confirmDelete: false
    }
  }

  renderRemoveButton () {
    if (this.props.project._new) {
      return null;
    }
    
    if (this.state.confirmDelete) {
      return (
        <View style={ [Styles.inputRow, { borderBottomWidth: 0 }] }>
          <Text style={ Styles.rowLabel, { padding: 10 } }>Are you sure?</Text>
          <TouchableOpacity
            style={ Styles.removeButton }
            onPress={ this.props.onRemove }>
            <Text style={ [Styles.rowLabel, Styles.removeButtonText] }>
              Delete
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={ Styles.removeButton }
            onPress={ () => this.setState({ confirmDelete: false }) }>
            <Text style={ [Styles.text, Styles.rowLabel] }>Cancel</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={ [Styles.inputRow, { borderBottomWidth: 0 }] }>
        <TouchableOpacity
          style={ Styles.removeButton }
          onPress={ () => this.setState({ confirmDelete: true }) }>
          <Text style={ Styles.removeButtonText }>Remove Project</Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderProjectStatus () {
    if (this.props.project._new) {
      return null;
    }

    const { project, onEdit } = this.props;
    let text, statusOption;

    if (project.status === 'active') {
      text = 'Mark as Finished';
      statusOption = 'finished';
    } else {
      text = 'Mark as Active';
      statusOption = 'active';
    }

    return (
      <View style={ Styles.statusContainer }>
        <Text>
          Marking a project as finished makes the project read-only.
          You can always reopen the project any time.
        </Text>
        <View style={ [Styles.inputRow, { borderBottomWidth: 0 }] }>
          <TouchableOpacity onPress={ () => onEdit('status', statusOption) }>
            <Text style={ Styles.markStatus }>{ text }</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render () {
    const { project, onEdit } = this.props;

    return (
      <View style={ Styles.editProject }>
        <View style={ Styles.formContainer }>
          <View style={ Styles.inputRow }>
            <Text style={ [Styles.text, Styles.rowLabel] }>Title</Text>
            <TextInput
              value={ project.title }
              style={ [Styles.text, Styles.rowInput] }
              placeholder="Project Title (required)"
              onChangeText={ value => onEdit('title', value) } />
          </View>
          <View style={ Styles.inputRow }>
            <Text style={ [Styles.text, Styles.rowLabel] }>Share with</Text>
            <PrivacyPicker
              textStyle={ [Styles.text, Styles.rowInput] }
              initLevel={ project.privacyLevel }
              onChange={ val => onEdit('privacyLevel', val) } />
          </View>
          <View style={ { height: 30 } } />
          { this.renderProjectStatus() }
          { this.renderRemoveButton() }
        </View>
      </View>
    );
  }

}