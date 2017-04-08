// vendors
import React, { PropTypes } from 'react';
import { View, Text } from 'react-native';

// styles
import { Styles } from './note-list-item-style';

// tools
import { formatDate } from '../../../utils/helpers';

// components
import CommentButton from './comment-button/comment-button';
import ReactionsContainer from '../../reactions/reactions-container';

function NoteListItem ({ note, showProjectName }) {

  function renderHeader () {
    let typeText = `${note.type === 'Future' ? 'Reminder' : 'Did work'}`;

    return (
      <View style={ Styles.top }>
        <Text style={ Styles.createdAt }>
          <Text style={ Styles.darker }>{ typeText }</Text>
          {
            showProjectName &&
            <Text>
              <Text style={ Styles.dark }> for </Text>
              <Text style={ Styles.darker }>{ note.project.title } </Text>
            </Text>
          }
        </Text>
        <Text style={ Styles.createdAt }>{ formatDate(note.createdAt) }</Text>
      </View>
    );
  }

  return (
    <View style={ Styles.container }>
      { renderHeader() }
      <Text numberOfLines={ 2 } style={ Styles.content }>{ note.content }</Text>
      <View style={ Styles.bottom }>
        <View style={ Styles.comment }>
          <CommentButton onPress={ () => null } count={ note.commentCount || 0 } />
        </View>
        <ReactionsContainer />
      </View>
    </View>
  );
}

NoteListItem.propTypes = {
  note: PropTypes.shape({
    type: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.instanceOf(Date).isRequired
  }).isRequired,
  showContext: PropTypes.bool,
  showProjectName: PropTypes.bool
};

export default NoteListItem;