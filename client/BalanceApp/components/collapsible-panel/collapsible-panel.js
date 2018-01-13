import React, { Component } from 'react';
import { View, Animated } from 'react-native';
import PropTypes from 'prop-types';

class CollapsiblePanel extends Component {

  static propTypes = {
    expanded: PropTypes.bool,
    height: PropTypes.number
  }

  constructor (props) {
    super(props);

    this.state = {
      expanded: false,
      animation: new Animated.Value() }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.expanded !== this.state.expanded) {
      this.toggle();
    }
  }

  toggle () {
    let initialValue = 0;
    let finalValue   = this.props.height

    if (this.state.expanded) {
      initialValue = this.props.height;
      finalValue   = 0;
    }

    this.state.animation.setValue(initialValue);

    Animated.spring(
      this.state.animation,
      { toValue: finalValue }
    ).start();

    this.setState({ expanded: !this.state.expanded });
}

  render () {
    return (
      <Animated.View style={{ height: this.state.animation }}>
        {
          this.state.expanded &&
          <View>
            { this.props.children }
          </View>
        }
      </Animated.View>
    );
  }
}

export default CollapsiblePanel;
