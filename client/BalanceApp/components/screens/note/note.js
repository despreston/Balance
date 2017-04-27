// vendors
import React, { Component, PropTypes } from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  KeyboardAvoidingView
} from 'react-native';

// utils
import { formatDate } from '../../../utils/helpers';

// styles
import Styles from './note-styles';

// components
import CommentInput from './comment-input/comment-input';
import CommentList from '../../comment-list/comment-list';
import ReactionsContainer from '../../reactions/reactions-container';
import MarkAsComplete from './mark-as-complete/mark-as-complete';

export default class Note extends Component {

  static propTypes = {
    note: PropTypes.object.isRequired,
    comments: PropTypes.array.isRequired,
    goToProject: PropTypes.func.isRequired,
    goToUser: PropTypes.func.isRequired,
    sendComment: PropTypes.func.isRequired,
    showMarkAsComplete: PropTypes.bool
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
      showMarkAsComplete
    } = this.props;

    return (
      <KeyboardAvoidingView
        keyboardVerticalOffset={63}
        behavior='padding'
        style={ Styles.container }
      >
        <ScrollView stickyHeaderIndices={[0]} style={ Styles.scrollContainer }>
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
          <Text style={[ Styles.note, Styles.text ]}>{ note.content }</Text>
          <Text style={ Styles.date }>{ formatDate(note.lastUpdated) }</Text>
          <ReactionsContainer
              note={ note._id }
              reactions={ note.reactions }
              maxList={ 4 }
            />
          {
            note.comments &&
            <View style={ Styles.comments }>
              <CommentList
                style={ Styles.comments }
                comments={ comments }
                onUserSelect={ user => goToUser(user) }
              />
            </View>
          }
        </ScrollView>
        <CommentInput onSend={ sendComment }/>
      </KeyboardAvoidingView>
    );
  }

}