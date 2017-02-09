// vendors
import React, { Component, PropTypes } from 'react';
import { View, Button } from 'react-native';

function EditProject ({ project, onSave, onCancel }) {
    return <View />
}

EditProject.propTypes = {
  project: PropTypes.object.isRequired,
  onEdit: PropTypes.func,
  onSave: PropTypes.func,
  onCancel: PropTypes.func
};

export default EditProject;