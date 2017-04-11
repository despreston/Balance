import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';

// components
import AddReaction from './add-reaction/add-reaction';
import Reaction from './reaction/reaction';

import Styles from './reactions-styles';

export default class Reactions extends Component {

  static propTypes = {
    reactions: PropTypes.array,
    note: PropTypes.string.isRequired
  }

  constructor (props) {
    super(props);

    this.state = { reactions: this.keyByReaction(props.reactions) };
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ reactions: this.keyByReaction(nextProps.reactions) });
  }

  // creates a [ userId, reaction _id ] pair
  userReactionTuple (user, reactionId) {
    return [ user, reactionId ];
  }

  keyByReaction (reactions) {
    let obj = {};

    if (reactions.length < 1) { return obj; }

    reactions.forEach(reaction => {
      let userReactionTuple = this.userReactionTuple(reaction.userId, reaction._id);

      if (obj[reaction.reaction]) {
        obj[reaction.reaction].push(userReactionTuple);
      } else {
        obj[reaction.reaction] = [ userReactionTuple ];
      }
    });

    return obj;
  }

  renderReactions () {
    return Object.keys(this.state.reactions).map((reaction, i) => {
      return (
        <Reaction
          key={ i }
          note={ this.props.note }
          reaction={ reaction }
          users={ this.state.reactions[reaction] }
        />
      );
    });
  }

  render () {
    return (
      <View style={ Styles.reactions }>
        <AddReaction />
        { this.renderReactions.call(this) }
      </View>
    );
  }

}
