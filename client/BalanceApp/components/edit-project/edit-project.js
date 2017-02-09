// vendors
import React, { Component, PropTypes } from 'react';
import {
  View,
  Button,
  Text,
  TextInput
} from 'react-native';

 // styles
 import Styles from './edit-project-style';

function EditProject ({ project, onEdit }) {

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
      </View>
    </View>
  );

}

EditProject.propTypes = {
  project: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired
};

export default EditProject;