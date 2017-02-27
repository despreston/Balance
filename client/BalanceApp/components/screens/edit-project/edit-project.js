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
        <View style={Styles.inputRow}>
          <Text style={Styles.rowLabel, { padding: 10 }}>Are you sure?</Text>
          <TouchableOpacity
            style={Styles.removeButton}
            onPress={this.props.onRemove}>
            <Text style={Styles.removeButtonText}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={Styles.removeButton}
            onPress={() => this.setState({ confirmDelete: false })}>
            <Text style={Styles.rowLabel}>Cancel</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={Styles.inputRow}>
        <TouchableOpacity
          style={Styles.removeButton}
          onPress={() => this.setState({ confirmDelete: true })}>
          <Text style={Styles.removeButtonText}>Remove Project</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render () {
    const { project, onEdit } = this.props;

    return (
      <View style={Styles.editProject}>
        <View style={Styles.formContainer}>
          <View style={Styles.inputRow}>
            <Text style={Styles.rowLabel}>Title</Text>
            <TextInput
              value={project.title}
              style={Styles.rowInput}
              placeholder="Project Title (required)"
              onChangeText={value => onEdit('title', value)} />
          </View>
          <View style={Styles.inputRow}>
            <Text style={Styles.rowLabel}>Share with</Text>
            <PrivacyPicker
              textStyle={Styles.rowInput}
              initLevel={project.privacyLevel}
              onChange={val => onEdit('privacyLevel', val)} />
          </View>
          <View style={{ height: 30 }} />
          { this.renderRemoveButton() }
        </View>
      </View>
    );
  }

}