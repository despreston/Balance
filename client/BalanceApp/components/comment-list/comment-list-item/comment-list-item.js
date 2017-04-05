// vendors
import React, { Component, PropTypes } from 'react';
import { View, Text, Image } from 'react-native';

// styles
// import Styles from './comment-list-item-styles';

export default class CommentListItem extends Component {

  static propTypes = {
    comment: PropTypes.object.isRequired,
  };

  constructor (props) {
    super(props);
  }

  // renderUsername () {
  //   const { user } = this.props;
  //   if (!user.username) {
  //     return null;
  //   }

  //   return (
  //     <Text style={[ Styles.text, Styles.username ]} >
  //       @{user.username}
  //     </Text>
  //   );
  // }

  render () {
    const { comment } = this.props;
    return (
      <Text>{ comment.content }</Text>
    );
  }

}