import React, { Component, PropTypes } from 'react';
import { TouchableOpacity, View, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import Styles from '../reactions-styles';

export default class Expand extends Component {

  render () {
    return (
      <View>
        <TouchableOpacity
          style={[ Styles.iconContainer, Styles.reaction ]}
          onPress={ () => null }
        >
          <Image
            style={[ Styles.icon, { paddingHorizontal: 14 } ]}
            source={ require('../../../assets/icons/more.png') }
          />
        </TouchableOpacity>
      </View>
    )
  }

}