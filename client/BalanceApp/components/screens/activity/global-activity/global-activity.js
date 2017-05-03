import React, { Component } from 'react';
import { View } from 'react-native';
import NoteListContainer from '../../../note-list/note-list-container';

class GlobalActivity extends Component {
  
  render () {
    return (
      <View>
        <NoteListContainer
          notes={[]}
          onSelect={ () => null }
        />
      </View>
    );
  }

}

export default GlobalActivity;