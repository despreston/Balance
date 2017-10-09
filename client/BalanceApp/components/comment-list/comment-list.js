import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import actions from '../../actions/';
import CommentListItem from './comment-list-item/comment-list-item';

class CommentList extends Component {

  static mapStateToProps ({ loggedInUser }) {
    return { loggedInUser };
  }

  static propTypes = {
    comments: PropTypes.array.isRequired,
    loggedInUser: PropTypes.string.isRequired,
    onUserSelect: PropTypes.func.isRequired,
    noteAuthor: PropTypes.string,
    onReply: PropTypes.func.isRequired
  };

  renderComments () {
    return this.props.comments.map(comment => {
      return (
        <View key={ comment._id }>
          <CommentListItem
            noteAuthor={ this.props.noteAuthor }
            loggedInUser={ this.props.loggedInUser}
            onUserSelect={ this.props.onUserSelect }
            onDelete={ comment => this.props.dispatch(actions.deleteComment(comment)) }
            comment={ comment }
            onReply={ this.props.onReply }
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
