import React, { Component, PropTypes } from 'react';
import { Image, Text, View } from 'react-native';

// styles
import Style from './nudges-style';

export default class Nudges extends Component {

  static propTypes = {
    nudgeUsers: PropTypes.array.isRequired
  };

  constructor (props) {
    super(props);

    this.state = { nudgers: props.nudgeUsers };

    this.numOfNudgers = this.state.nudgers.length;
    
    this.textPos = this.numOfNudgers > 5 ? -30: (this.numOfNudgers * -8) + 10;
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ nudgers: nextProps.nudgeUsers });
  }

  renderPictures () {
    let { nudgers } = this.state;
    let key = 0;

    if (this.numOfNudgers > 5) {
      nudgers = nudgers.slice(0, 5);
    }

    return nudgers.map(user => {
      key++;
      return <Image
        key={ key }
        source={{ uri: user.picture }}
        style={ [Style.picture, { left: -8 * key }] } />
    });
  }

  renderText () {
    switch (true) {
      case (this.numOfNudgers === 1): return 'wants an update';
      case (this.numOfNudgers < 6): return 'want an update';
      case (this.numOfNudgers > 6): 
        let remaining = this.numOfNudgers - 5;
        return `and ${remaining} others want an update`;
      default: return null;
    }
  }

  render () {
    return (
      <View style={ Style.nudges }>
        { this.renderPictures() } 
        <Text style={ [Style.text, { left: this.textPos }] }>
          { this.renderText() }
        </Text>
      </View>
    );

  }

}