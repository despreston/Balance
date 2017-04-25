// vendors
import React, { PropTypes, Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

// styles
import { Styles } from './note-list-item-style';

// tools
import prettyDate from '../../../utils/fancy-date';

// components
import CommentButton from './comment-button/comment-button';
import ReactionsContainer from '../../reactions/reactions-container';

class NoteListItem extends Component {

  static propTypes = {
    note: PropTypes.shape({
      type: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      lastUpdated: PropTypes.instanceOf(Date).isRequired,
      author: PropTypes.shape({
        userId: PropTypes.string.isRequired
      }).isRequired,
      reactions: PropTypes.array
    }).isRequired,
    showProjectName: PropTypes.bool,
    isLoggedInUser: PropTypes.bool.isRequired
  }

  static mapStateToProps (state, ownProps) {
    return {
      isLoggedInUser: state.loggedInUser === ownProps.note.author.userId
    };
  }

  constructor (props) {
    super(props);
  }

  renderHeader () {
    const { note, showProjectName } = this.props;
    let typeText = `${note.type === 'Future' ? 'Todo' : 'Did work'}`;

    return (
      <View style={[ Styles.flexRow, Styles.top ]}>
        <Text style={ Styles.smallLightText }>
          <Text style={ Styles.darker }>{ typeText }</Text>
          {
            showProjectName &&
            <Text>
              <Text style={ Styles.dark }> for </Text>
              <Text style={ Styles.darker }>{ note.project.title } </Text>
            </Text>
          }
        </Text>
        <Text style={ Styles.smallLightText }>{ prettyDate(note.lastUpdated) }</Text>
      </View>
    );
  }

  render () {
    const { note, isLoggedInUser } = this.props;

    return (
      <View style={ Styles.container }>
        { this.renderHeader() }
        <Text numberOfLines={ 2 } style={ Styles.content }>{ note.content }</Text>
        <View style={ Styles.flexRow }>
          <View style={ Styles.comment }>
            <CommentButton count={ note.commentCount || 0 } />
          </View>
          <ReactionsContainer
            hideExpand
            maxList={ 4 }
            note={ note._id }
            reactions={ note.reactions }
          />
        </View>
      </View>
    );
  }

}

export default connect(NoteListItem.mapStateToProps)(NoteListItem);