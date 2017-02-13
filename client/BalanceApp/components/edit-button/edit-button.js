// vendors
import React, { PropTypes } from 'react';
import {
  TouchableHighlight,
  Image
} from 'react-native';

// styles
import { Styles } from './edit-button-style';

function EditButton ({ onEdit, style }) {
  return (
    <TouchableHighlight onPress={onEdit} style={Styles.touch} >
      <Image style={style} source={require("../../assets/note-menu.png")}/>
    </TouchableHighlight>
  );
}

EditButton.propTypes = {
  onEdit: PropTypes.func.isRequired,
  style: PropTypes.number
};

export default EditButton;