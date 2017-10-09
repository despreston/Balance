import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View } from 'react-native';

// components
import AddReaction from './add-reaction/add-reaction';
import Reaction from './reaction/reaction';
import Expand from './expand/expand';

import Styles from './reactions-styles';

export default class Reactions extends Component {

  static propTypes = {
    reactions: PropTypes.array,
    note: PropTypes.string.isRequired,
    maxList: PropTypes.number.isRequired,
    hideExpand: PropTypes.bool
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
    const reactions = Object.keys(this.state.reactions).slice(0, this.props.maxList);

    return reactions.map((reaction, i) => {
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
    let reactionsLength = this.props.reactions.length;

    return (
      <View style={ Styles.reactions }>
        <AddReaction note={ this.props.note }/>
        { this.renderReactions.call(this) }
        {
          (!this.props.hideExpand && reactionsLength > 0) &&
          <Expand note={ this.props.note }/>
        }
      </View>
    );
  }

}
