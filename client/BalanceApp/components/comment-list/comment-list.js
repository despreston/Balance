// vendors
import React, { Component, PropTypes } from 'react';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';

// actions
import { deleteComment } from '../../actions';

// components
import CommentListItem from './comment-list-item/comment-list-item';

function mapStateToProps (state) {
  return { loggedInUser: state.loggedInUser };
}

class CommentList extends Component {

  static propTypes = {
    comments: PropTypes.array.isRequired,
    onCommentSelect: PropTypes.func.isRequired,
    loggedInUser: PropTypes.string.isRequired,
    deleteComment: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
  }

  onDelete (comment) {
    this.props.deleteComment(comment);
  }

  renderComments () {
    return this.props.comments.map(comment => {
      return (
        <View key={ comment._id }>
          <CommentListItem
            onDelete={ comment => this.onDelete(comment) }
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

export default connect(mapStateToProps, { deleteComment })(CommentList);