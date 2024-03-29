import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Image, View, Text } from 'react-native';
import { Styles } from './note-list-item-style';
import prettyDate from '../../../utils/fancy-date';
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
      reactions: PropTypes.array,
      picture: PropTypes.string
    }).isRequired,
    showTypeText: PropTypes.bool,
    showProjectName: PropTypes.bool,
    showUser: PropTypes.bool
  }

  renderHeader () {
    const { note, showProjectName, showTypeText, showUser } = this.props;
    const typeText = `${note.type === 'Future' ? 'To do' : 'Did work'}`;
    let typeTextColor;

    if (showProjectName) {
      typeTextColor = note.type === 'Past' ? Styles.green : Styles.orange;
    }

    return (
      <View style={[ Styles.flexRow, Styles.top ]}>
        <View style={[ Styles.flexRow, Styles.topLeft ]}>
          <Image style={ Styles.avatar } source={{ uri: note.author.picture }} />
          <Text style={ Styles.smallLightText }>
            {
              showUser &&
              <Text style={ Styles.blue }>{`${note.author.username}` }{`\n`}</Text>
            }
            {
              showTypeText &&
              (
                <Text style={[ Styles.darker, typeTextColor ]}>
                  { typeText }
                </Text>
              )
            }
            {
              showProjectName &&
              <Text>
                <Text style={ Styles.dark }> for </Text>
                <Text style={ Styles.darker }>{ note.project.title } </Text>
              </Text>
            }
          </Text>
        </View>
        <Text style={ Styles.smallLightText }>{ prettyDate(note.lastUpdated) }</Text>
      </View>
    );
  }

  render () {
    const { note } = this.props;

    const containerStyles = [
      Styles.container,
      note._temp ? Styles.transparent : null
    ];

    return (
      <View style={ containerStyles }>
        { this.renderHeader() }
        <View style={ Styles.body }>
          {
            note.picture &&
            <Image source={{ uri: note.picture, cache: 'force-cache' }} style={ Styles.picture }/>
          }
          {
            !!note.content &&
            <Text numberOfLines={ 2 } style={ Styles.content }>{ note.content }</Text>
          }
        </View>
        <View style={[ Styles.flexRow, Styles.bottom ]}>
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

export default NoteListItem;
