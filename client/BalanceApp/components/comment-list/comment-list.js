// vendors
import React, { Component, PropTypes } from 'react';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';

// actions
import actions from '../../actions/';

// components
import CommentListItem from './comment-list-item/comment-list-item';

class CommentList extends Component {

  static mapDispatchToProps (dispatch) {
    return {
      deleteComment: comment => dispatch(actions.deleteComment(comment))
    };
  }

  static mapStateToProps (state) {
    return { loggedInUser: state.loggedInUser };
  }

  static propTypes = {
    comments: PropTypes.array.isRequired,
    loggedInUser: PropTypes.string.isRequired,
    deleteComment: PropTypes.func.isRequired,
    onUserSelect: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
  }

  renderComments () {
    return this.props.comments.map(comment => {
      return (
        <View key={ comment._id }>
          <CommentListItem
            onUserSelect={ this.props.onUserSelect }
            onDelete={ comment => this.props.deleteComment(comment) }
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

export default connect(
  CommentList.mapStateToProps,
  CommentList.mapDispatchToProps)
(CommentList);