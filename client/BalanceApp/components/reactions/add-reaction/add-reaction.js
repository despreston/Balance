import React, { Component, PropTypes } from 'react';
import { TouchableOpacity, Image, Text } from 'react-native';
import Styles from '../reactions-styles';

export default class AddReaction extends Component {

  render () {
    return (
      <TouchableOpacity style={ Styles.iconContainer } onPress={ () => null }>
        <Text style={ Styles.plus }>✚</Text>
        <Image
          style={ Styles.icon }
          source={ require('../../../assets/icons/add-reaction.png') }
        />
      </TouchableOpacity>
    )
  }

}
