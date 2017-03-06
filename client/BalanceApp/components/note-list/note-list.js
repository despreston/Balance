// vendors
import React, { Component, PropTypes } from 'react';
import { ScrollView, View, Text } from 'react-native';

// components
import NoteListItem from '../note-list-item/note-list-item';
import { Styles } from './note-list-style';

function NoteList ({ notes, onEdit = null, showContext = false }) {

  notes.sort((a,b) => b.createdAt - a.createdAt);

  function renderNotes () {

    return notes.map(note => {
      return (
        <View key={note._id} style={Styles.noteListItem}>
          <NoteListItem
            note={note}
            onEdit={onEdit}
            showContext={showContext} />
        </View>
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
  onEdit: PropTypes.func,
  showContext: PropTypes.bool
};

export default NoteList;
