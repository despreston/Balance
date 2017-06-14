// vendors
import React, { Component, PropTypes } from 'react';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';

// actions
import actions from '../../actions/';

// components
import CommentListItem from './comment-list-item/comment-list-item';

class CommentList extends Component {

  static mapStateToProps (state) {
    return { loggedInUser: state.loggedInUser };
  }

  static propTypes = {
    comments: PropTypes.array.isRequired,
    loggedInUser: PropTypes.string.isRequired,
    onUserSelect: PropTypes.func.isRequired,
    noteAuthor: PropTypes.string
  };

  constructor (props) {
    super(props);
  }

  renderComments () {
    return this.props.comments.map(comment => {
      return (
        <View key={ comment._id }>
          <CommentListItem
            isNoteAuthor={ this.props.noteAuthor === comment.commenter.userId }
            onUserSelect={ this.props.onUserSelect }
            onDelete={ comment => this.props.dispatch(actions.deleteComment(comment)) }
            comment={ comment }
            allowDelete={ (this.props.loggedInUser === comment.commenter.userId ) }
          />
        </View>
      );
    });    
  }

  render () {
    return (
      <ScrollView>
        { this.renderComments() }
      </ScrollView>
    );
  }

}

export default connect(CommentList.mapStateToProps)(CommentList);