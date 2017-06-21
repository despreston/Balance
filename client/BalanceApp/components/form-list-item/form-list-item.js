import React, { Component, PropTypes } from 'react';
import { View, Text, Image } from 'react-native';
import styles from './form-list-item-styles';

class FormListItem extends Component {

  static propTypes = {
    style: PropTypes.object,
    label: PropTypes.string,
    touchable: PropTypes.bool
  }

  render () {
    const labelStyles = [ styles.text, styles.rowLabel ];

    return (
      <View style={[ styles.listItem, this.props.style ]}>
        {
          this.props.label &&
          <Text style={ labelStyles }>{ this.props.label }</Text>
        }
        { this.props.children }
        {
          this.props.touchable &&
          <Image
            source={ require('../../assets/icons/forward.png') }
            style={ styles.touchableRowIcon }
          />
        }
      </View>
    );
  }

}

export default FormListItem;