// vendors
import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  ListView,
  TouchableHighlight
} from 'react-native';

// components
import NoteListItem from '../note-list-item/note-list-item';

export default class NoteList extends Component {

  static propTypes = {
    notes: PropTypes.object.isRequired,
    onEdit: PropTypes.func.isRequired
  }

  constructor (props) {
    super();
  }

  renderNotes () {
    return Object.keys(this.props.notes).map(id => {
      return ( <NoteListItem key={id} note={this.props.notes[id]} onEdit={this.props.onEdit} /> );
    });
  }

  render () {
    return (
      <View>
        {this.renderNotes()}
      </View>
    );
  }
}
