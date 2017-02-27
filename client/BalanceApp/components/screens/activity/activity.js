// vendors
import React, { Component } from 'react';
import { View, Text } from 'react-native';

// components 
import NavBtn from '../../navigation/nav-btn';

export default class Activity extends Component {

  static navigationOptions = {
    header: ({ navigate }, defaultHeader) => {
      const left = (
        <NavBtn
          title="More"
          onPress={() => navigate('DrawerOpen')}
        />
      );

      return { left, ...defaultHeader };
    }
  }
  
  render () {
    return (
      <View>
        <Text>activity from global, friends, and yourself</Text>
      </View>
    );
  }

};