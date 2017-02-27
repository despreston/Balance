// vendors
import React, { PropTypes } from 'react';
import { View, Text } from 'react-native';

// styles
import { Styles } from './note-list-item-style';

// tools
import { formatDate } from '../../utils/helpers';

// components
import EditButton from '../edit-button/edit-button';

function NoteListItem ({ note, onEdit }) {
  return (
    <View style={Styles.container}>
      <View style={Styles.top}>
        <Text style={Styles.createdAt}>{formatDate(note.createdAt)}</Text>
        <EditButton onEdit={onEdit.bind(this, note)} style={Styles.editButton} />
      </View>
      <Text style={Styles.content}>{note.content}</Text>
    </View>
  );
}

NoteListItem.propTypes = {
  note: PropTypes.shape({
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.instanceOf(Date).isRequired
  }).isRequired
};

export default NoteListItem;