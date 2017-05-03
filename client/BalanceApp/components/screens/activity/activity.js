import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';

class Activity extends Component {

  static propTypes = {
    screen: PropTypes.string.isRequired
  }
  
  render () {
    return (
      <View>
        <Text>TEsT</Text>
      </View>
    );
  }

}

export default Activity;
