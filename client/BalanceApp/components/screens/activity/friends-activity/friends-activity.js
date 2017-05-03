import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';
// import NoteListContainer from '../../../note-list/note-list-container';

class FriendsActivity extends Component {
  
  render () {
    return (
      <Text>Friends activity shit</Text>
    );
  }

}

export default connect()(FriendsActivity);