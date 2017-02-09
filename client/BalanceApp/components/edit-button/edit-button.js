import React, { PropTypes } from 'react';
import {
  TouchableHighlight,
  Image
} from 'react-native';

function EditButton ({ onEdit, style }) {
  return (
    <TouchableHighlight onPress={onEdit}>
      <Image style={style} source={require("../../assets/note-menu.png")}/>
    </TouchableHighlight>
  );
}

EditButton.propTypes = {
  onEdit: PropTypes.func.isRequired,
  style: PropTypes.number
};

export default EditButton;