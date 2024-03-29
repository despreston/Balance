import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  KeyboardAvoidingView
} from 'react-native';
import { formatDate } from '../../../utils/helpers';
import Styles from './note-styles';
import Colors from '../../colors';
import CommentInput from './comment-input/comment-input';
import CommentList from '../../comment-list/comment-list';
import ReactionsContainer from '../../reactions/reactions-container';
import MarkAsComplete from './mark-as-complete/mark-as-complete';
import Refresh from '../../refresh/refresh';

export default class Note extends Component {

  static propTypes = {
    note: PropTypes.object.isRequired,
    comments: PropTypes.array.isRequired,
    goToProject: PropTypes.func.isRequired,
    goToUser: PropTypes.func.isRequired,
    sendComment: PropTypes.func.isRequired,
    showMarkAsComplete: PropTypes.bool,
    refreshing: PropTypes.bool.isRequired,
    refresh: PropTypes.func.isRequired,
    reply: PropTypes.func.isRequired,
    resetReply: PropTypes.func.isRequired,
    commentInputRef: PropTypes.func.isRequired,
    replyingTo: PropTypes.object
  }
  
  constructor (props) {
    super(props);
    this.author = props.note.author;
  }

  header () {
    switch (this.props.note.type) {
      case 'Past': return 'Completed';
      case 'Future': return 'Todo';
    }
  }

  render () {
    const {
      note,
      comments,
      goToUser,
      goToProject,
      sendComment,
      showMarkAsComplete,
      refreshing,
      reply,
      resetReply,
      commentInputRef,
      replyingTo
    } = this.props;

    const refreshProps = {
      refreshing,
      onRefresh: this.props.refresh,
      tintColor: Colors.purple
    };

    return (
      <KeyboardAvoidingView
        keyboardVerticalOffset={63}
        behavior='padding'
        style={ Styles.container }
      >
        <ScrollView
          style={ Styles.scrollContainer }
          refreshControl={ <Refresh { ...refreshProps }/> }
        >
          <View>
            <View style={ Styles.meta }>
              <Image
                style={ Styles.authorImage }
                source={{ uri: this.author.picture }}
              />
              <View style={ Styles.info }>
                <Text style={ Styles.header }>{ this.header() }</Text>
                <Text style={[ Styles.text, Styles.subheader ]}>
                  for { }
                  <Text onPress={ () => goToProject() } style={ Styles.purple }>
                    { note.project.title }
                  </Text>
                  { } by { }
                  <Text
                    onPress={ () => goToUser(this.author.userId) }
                    style={ Styles.purple }
                  >
                    { this.author.username }
                  </Text>
                </Text>
                { showMarkAsComplete && <MarkAsComplete note={ note }/> }
              </View>
            </View>
            {
              note.picture &&
              <Image
                source={{ uri: note.picture, cache: 'force-cache' }}
                style={ Styles.picture }
              />
            }
            <Text style={[ Styles.note, Styles.text ]}>{ note.content }</Text>
            <Text style={ Styles.date }>{ formatDate(note.lastUpdated) }</Text>
            <ReactionsContainer
              note={ note._id }
              reactions={ note.reactions }
              maxList={ 4 }
            />
            {
              comments &&
              <View style={ Styles.comments }>
                <CommentList
                  style={ Styles.comments }
                  comments={ comments }
                  onUserSelect={ user => goToUser(user) }
                  noteAuthor={ note.author.userId }
                  onReply={ reply }
                />
              </View>
            }
            </View>
        </ScrollView>
        <CommentInput
          onBlur={ resetReply }
          replyingTo={ replyingTo }
          onRef={ commentInputRef }
          onSend={ sendComment }
        />
      </KeyboardAvoidingView>
    );
  }

}