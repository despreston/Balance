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
import { Styles } from './note-list-style';

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
      return (
        <View key={id} style={Styles.noteListItem}>
          <NoteListItem note={this.props.notes[id]} onEdit={this.props.onEdit} />
        </View>
      );
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
