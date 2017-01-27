// Vendors
import React, { Component, PropTypes } from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';

// Components
import { Styles } from './note-style';

function Note ({ content, header, onEdit }) {
  return (
    <View style={Styles.note}>
      <View style={Styles.header}>
        <Text style={Styles.headerTitle}>{header}</Text>
        <TouchableHighlight onPress={onEdit}>
          <Image style={Styles.noteButton} source={require("../../../assets/note-menu.png")}/>
        </TouchableHighlight>
      </View>
      <Text style={Styles.content}>{content}</Text>
    </View>
  );
}

Note.propTypes = {
  content: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  onEdit: PropTypes.func
};

export default Note;