import React, { Component, PropTypes } from 'react';
import { Image, Text, View } from 'react-native';

// styles
import Style from './nudges-style';

export default class Nudges extends Component {

  static propTypes = {
    nudgeUsers: PropTypes.array.isRequired,
    linkToUpdate: PropTypes.bool,
    imageSize: PropTypes.number
  };

  constructor (props) {
    super(props);

    this.state = {
      nudgers: props.nudgeUsers,
      numOfNudgers: props.nudgeUsers.length,
      textPos: this.calcTextPos(props.nudgeUsers.length)
    };

    this.linkToUpdate = props.linkToUpdate;
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      nudgers: nextProps.nudgeUsers,
      numOfNudgers: nextProps.nudgeUsers.length,
      textPos: this.calcTextPos(nextProps.nudgeUsers.length)
    });
  }

  calcTextPos (numOfNudgers) {
    return numOfNudgers > 5 ? -30: (numOfNudgers * -8) + 10;
  }

  renderPictures () {
    let { nudgers, numOfNudgers } = this.state;
    let key = 0, size = null;

    if (this.props.imageSize) {
      size = {
        height: this.props.imageSize,
        width: this.props.imageSize,
        borderRadius: this.props.imageSize / 2
      };
    }

    if (numOfNudgers > 5) {
      nudgers = nudgers.slice(0, 5);
    }

    return nudgers.map(user => {
      key++;
      return (
        <Image
          key={ key }
          source={{ uri: user.picture }}
          style={ [Style.picture, { left: -8 * key }, size] } />
      );
    });
  }

  renderText () {
    const { numOfNudgers } = this.state;

    switch (true) {
      case (numOfNudgers === 1): return 'wants an ';
      case (numOfNudgers < 6): return 'want an ';
      case (numOfNudgers > 6):
        let remaining = numOfNudgers - 5;
        return `and ${remaining} others want an `;
      default: return null;
    }
  }

  render () {
    return (
      <View style={ Style.nudges }>
        { this.renderPictures() }
        <Text style={ [Style.text, { left: this.state.textPos }] }>
          { this.renderText() }
          <Text style={ this.linkToUpdate && Style.bold }>update</Text>
        </Text>
      </View>
    );
  }

}