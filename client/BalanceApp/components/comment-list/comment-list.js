// vendors
import React, { Component, PropTypes } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';

// components
import CommentListItem from './comment-list-item/comment-list-item';

export default class CommentList extends Component {

  static propTypes = {
    comments: PropTypes.array.isRequired,
    onCommentSelect: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
  }

  renderComments () {
    console.log(this.props.comments)
    return this.props.comments.map(comment => {
      return (
        <TouchableOpacity
          key={ comment._id }
          onPress={ () => this.props.onCommentSelect(comment._id) }
        >
          <CommentListItem comment={ comment } />
        </TouchableOpacity>
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