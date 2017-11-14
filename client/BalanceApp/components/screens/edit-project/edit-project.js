import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Text,
  TextInput
} from 'react-native';
import Styles from './edit-project-style';
import PrivacyPicker from '../../privacy-picker/privacy-picker';
import FormListItem from '../../form-list-item/form-list-item';

export default class EditProject extends Component {

  static propTypes = {
    project: PropTypes.object.isRequired,
    onEdit: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    navToCategories: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.state = { confirmDelete: false };
  }

  renderRemoveButton () {
    if (this.props.project._new) {
      return null;
    }

    if (this.state.confirmDelete) {
      return (
        <FormListItem style={{ borderBottomWidth: 0 }}>
          <Text style={ (Styles.rowLabel, { padding: 10 }) }>Are you sure?</Text>
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
        </FormListItem>
      );
    }

    return (
      <FormListItem style={{ borderBottomWidth: 0 }}>
        <TouchableOpacity
          style={ Styles.removeButton }
          onPress={ () => this.setState({ confirmDelete: true }) }>
          <Text style={ Styles.removeButtonText }>Remove Project</Text>
        </TouchableOpacity>
      </FormListItem>
    );
  }

  render () {
    const { project, onEdit } = this.props;
    const inputStyles = [ Styles.text, Styles.rowInput ];

    return (
      <ScrollView contentContainerStyle={ Styles.editProject }>
        <KeyboardAvoidingView
          behavior='position'
          keyboardVerticalOffset={63}
          style={ Styles.formContainer }
        >
          <FormListItem label='Title'>
            <TextInput
              clearButtonMode='while-editing'
              autoCorrect={ false }
              value={ project.title }
              style={ inputStyles }
              placeholder="Project Title (required)"
              onChangeText={ value => onEdit('title', value) }
              maxLength={ 25 }
            />
          </FormListItem>
          <FormListItem label='Category' touchable>
            <TouchableOpacity
              onPress={ this.props.navToCategories }
              style={ Styles.rowInput }
            >
              <Text style={ Styles.text }>{ project.category }</Text>
            </TouchableOpacity>
          </FormListItem>
          <FormListItem label='Description'>
            <TextInput
              clearButtonMode='while-editing'
              value={ project.description }
              style={ inputStyles }
              placeholder="Description"
              onChangeText={ value => onEdit('description', value) }
              maxLength={ 100 }
            />
          </FormListItem>
          <FormListItem label='Share with'>
            <PrivacyPicker
              textStyle={ inputStyles }
              initLevel={ project.privacyLevel }
              onChange={ val => onEdit('privacyLevel', val) } />
          </FormListItem>
          <ProjectStatus project={ project } onEdit={ onEdit }/>
          { this.renderRemoveButton() }
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }

}

const ProjectStatus = ({ project, onEdit }) => {
  if (project._new) {
    return null;
  }

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
      <Text style={ [Styles.text, Styles.centerText ]}>
        Marking a project as finished makes the project read-only.
        You can always reopen the project any time.
      </Text>
      <FormListItem style={{ borderBottomWidth: 0 }}>
        <TouchableOpacity onPress={ () => onEdit('status', statusOption) }>
          <Text style={ Styles.markStatus }>{ text }</Text>
        </TouchableOpacity>
      </FormListItem>
    </View>
  );
};
