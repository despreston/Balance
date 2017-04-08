import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';

// components
import AddReaction from './add-reaction/add-reaction';
import Reaction from './reaction/reaction';

import Styles from './reactions-styles';

export default class Reactions extends Component {

  constructor (props) {
    super(props);

    this.reactions = {
      '👍': 3,
      '😄': 1,
      '🎉': 8
    };

  }

  renderReactions () {
    let key = 0;

    return Object.keys(this.reactions).map(reaction => {
      key++;
      return <Reaction key={ key } reaction={ reaction } count={ this.reactions[reaction] }/>;
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
