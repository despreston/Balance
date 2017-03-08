// vendors
import React, { Component } from 'react';
import { View, Text } from 'react-native';

// components
import Logout from '../../signon/logout';

export default class UserSettings extends Component {
  
  render () {
    return (
      <View>
        <Text>settings n shit for the logged in user</Text>
        <Logout />
      </View>
    );
  }

};