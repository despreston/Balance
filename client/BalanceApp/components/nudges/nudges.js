import React, { Component, PropTypes } from 'react';
import { Text, View } from 'react-native';

import AvatarCollection from '../avatar-collection/avatar-collection';

// styles
import Style from './nudges-style';

export default class Nudges extends Component {

  static propTypes = {
    nudgeUsers: PropTypes.array.isRequired,
    imageSize: PropTypes.number,
    textStyle: PropTypes.number
  };

  constructor (props) {
    super(props);

    this.state = {
      numOfNudgers: props.nudgeUsers.length,
      textPos: this.calcTextPos(props.nudgeUsers.length)
    };
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      numOfNudgers: nextProps.nudgeUsers.length,
      textPos: this.calcTextPos(nextProps.nudgeUsers.length)
    });
  }

  calcTextPos (numOfNudgers) {
    return numOfNudgers > 5 ? -30: (numOfNudgers * -8) + 10;
  }

  renderText () {
    const { numOfNudgers } = this.state;

    switch (true) {
      case (numOfNudgers === 1) : return 'wants an';
      case (numOfNudgers < 6)   : return 'want an';
      case (numOfNudgers > 6)   : return `+${numOfNudgers -5} want an`;
      default                   : return null;
    }
  }

  render () {
    const { textStyle, imageSize } = this.props;

    return (
      <View style={ Style.nudges }>
        <AvatarCollection
          images={ this.props.nudgeUsers.map(n => n.picture) }
          imageSize={ imageSize }
        />
        <Text style={ [Style.text, { left: this.state.textPos }, textStyle] }>
          { `${this.renderText()} update` }
        </Text>
      </View>
    );
  }

}
