import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
import GlobalActivity from './global-activity/global-activity';

class Activity extends Component {

  static propTypes = {
    screen: PropTypes.string.isRequired
  }
  
  render () {
    return (
      <View>
        {
          this.props.screen === 'Global'
            ? <GlobalActivity />
            : <Text>TEsT</Text>
        }
      </View>
    );
  }

}

export default Activity;
