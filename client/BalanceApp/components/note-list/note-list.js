// vendors
import React, { Component, PropTypes } from 'react';
import { ScrollView, TouchableOpacity, Text } from 'react-native';

// components
import NoteListItem from './note-list-item/note-list-item';
import { Styles } from './note-list-style';

function NoteList ({ notes, showContext = false, onSelect }) {

  notes.sort((a,b) => b.createdAt - a.createdAt);

  function renderNotes () {

    return notes.map(note => {
      return (
        <TouchableOpacity
          key={ note._id }
          style={ Styles.noteListItem }
          onPress={ () => onSelect(note._id) }>
          <NoteListItem
            note={ note }
            showContext={ showContext } />
        </TouchableOpacity>
      );
    });

  }
   
  return (
    <ScrollView>
      { renderNotes() }
    </ScrollView>
  );

}

NoteList.propTypes = {
  notes: PropTypes.array.isRequired,
  showContext: PropTypes.bool,
  onSelect: PropTypes.func.isRequired
};

export default NoteList;
