// Vendors
import React, { Component, PropTypes } from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';

// Components
import { Styles } from './note-style';

function Note ({ content, header, onEdit, emptyText }) {
  function getContent () {
    return content
      ? <Text style={Styles.content}>{content}</Text>
      : <Text style={[Styles.content, Styles.empty]}>{emptyText}</Text>
  }
  
  return (
    <View style={Styles.note}>
      <View style={Styles.header}>
        <Text style={Styles.headerTitle}>{header}</Text>
        {
          !!content && 
          (<TouchableHighlight onPress={onEdit}>
            <Image style={Styles.noteButton} source={require("../../../assets/note-menu.png")}/>
          </TouchableHighlight>)
        }
      </View>
      {getContent()}
    </View>
  );
}

Note.propTypes = {
  content: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  onEdit: PropTypes.func,
  emptyText: PropTypes.string.isRequired
};

export default Note;