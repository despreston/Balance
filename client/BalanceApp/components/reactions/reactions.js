import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';

// components
import AddReaction from './add-reaction/add-reaction';
import Reaction from './reaction/reaction';

import Styles from './reactions-styles';

export default class Reactions extends Component {

  static propTypes = {
    reactions: PropTypes.array
  }

  constructor (props) {
    super(props);

    this.state = { reactions: this.keyByReaction(props.reactions) };
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ reactions: this.keyByReaction(nextProps.reactions) });
  }

  keyByReaction (reactions) {
    let obj = {};

    if (reactions.length < 1) { return obj; }

    reactions.forEach(reaction => {
      if (obj[reaction.reaction]) {
        obj[reaction.reaction]++;
      } else {
        obj[reaction.reaction] = 1;
      }
    });

    return obj;
  }

  renderReactions () {
    return Object.keys(this.state.reactions).map((reaction, i) => {
      return <Reaction key={ i } reaction={ reaction } count={ this.state.reactions[reaction] }/>;
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
