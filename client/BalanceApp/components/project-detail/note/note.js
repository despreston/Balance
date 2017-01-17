// Vendors
import React, { Component, PropTypes } from 'react';
import { View, Text, Image } from 'react-native';

// Components
import { Styles } from './note-style';

function Note ({ note, header }) {
  return (
    <View style={Styles.note}>
      <View style={Styles.header}>
        <Text style={Styles.headerTitle}>{header}</Text>
        <Image style={Styles.noteButton} source={require("../../../assets/note-menu.png")}/>
      </View>
      <Text style={Styles.content}>{note}</Text>
    </View>
  );
}

Note.propTypes = {
  note: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  onTap: PropTypes.func
};

export default Note;