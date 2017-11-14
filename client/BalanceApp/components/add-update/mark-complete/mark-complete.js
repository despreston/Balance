import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { TouchableOpacity, Text, Image, View } from 'react-native';
import Styles from './mark-complete-styles';

export default class MarkComplete extends Component {

  static propTypes = {
    onPress: PropTypes.func.isRequired,
    complete: PropTypes.bool.isRequired
  }

  constructor (props) {
    super(props);
  }
  
  render () {
    const text = this.props.complete ? 'Complete!' : 'Complete';

    return (
      <TouchableOpacity onPress={ () => this.props.onPress() }>
        <View style={ Styles.flexRow }>
          {
            !this.props.complete &&
            <View style={ Styles.box } />
          }
          {
            this.props.complete &&
            <Image
              source={ require('../../../assets/icons/checkmark.png') }
              style={ Styles.checkmark }
            />
          }
          <Text style={ Styles.text }>{ text }</Text>
        </View>
      </TouchableOpacity>
    )
  }

}