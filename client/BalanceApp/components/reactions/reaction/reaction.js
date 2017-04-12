import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity, Text } from 'react-native';
import Styles from '../reactions-styles';
import ReactionStyles from './reaction-styles';
import { addReaction, deleteReaction } from '../../../actions';

class Reaction extends Component {

  static mapStateToProps ({ loggedInUser }) {
    return { loggedInUser };
  }

  static propTypes = {
    reaction: PropTypes.string.isRequired,
    users: PropTypes.array.isRequired,
    note: PropTypes.string.isRequired,
    loggedInUser: PropTypes.string.isRequired,
    addReaction: PropTypes.func.isRequired,
    deleteReaction: PropTypes.func.isRequired
  }

  onTap () {
    let userReactionPair = this.isSelected();

    if (userReactionPair) {
      this.props.deleteReaction(userReactionPair[1], this.props.note);
    } else {
      this.props.addReaction(this.props.reaction, this.props.note);
    }
  }

  isSelected () {
    return this.props.users.find(userReactionPair => {
      return userReactionPair[0] === this.props.loggedInUser;
    });
  }

  containerStyles () {
    return this.isSelected()
      ? [ Styles.iconContainer, Styles.reaction, ReactionStyles.selectedContainer ]
      : [ Styles.iconContainer, Styles.reaction ];
  }

  countStyles () {
    return this.isSelected()
      ? [ ReactionStyles.selectedCount ]
      : [ ReactionStyles.count ];
  }

  render () {
    return (
      <TouchableOpacity
        style={ this.containerStyles() }
        onPress={ () => this.onTap() }
      >
        <Text>{ this.props.reaction }</Text>
        <Text style={ this.countStyles() }>{ this.props.users.length }</Text>
      </TouchableOpacity>
    );
  }

}

export default connect(
  Reaction.mapStateToProps,
  { addReaction, deleteReaction }
)(Reaction);