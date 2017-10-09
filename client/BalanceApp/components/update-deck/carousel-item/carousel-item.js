import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './carousel-item-styles';
import { formatDate } from '../../../utils/helpers';

class CarouselItem extends Component {

  static propTypes = {
    itemWidth: PropTypes.number.isRequired,
    note: PropTypes.object.isRequired,
    onPress: PropTypes.func.isRequired
  }
  
  render () {
    const { note } = this.props;

    return (
      <TouchableOpacity
        activeOpacity={ 1 }
        onPress={ () => this.props.onPress(this.props.note._id) }
        style={[ styles.container, { width: this.props.itemWidth } ]}
      >
        {
          note.picture &&
          <Image
            source={{ uri: note.picture, cache: 'force-cache' }}
            style={ styles.picture }
          />
        }
        {
          !note.picture &&
          <View style={[ styles.picture, styles.placeholder ]}>
            <Image
              source={ require('../../../assets/icons/camera.png') }
              style={ styles.placeholderImage }
            />
            <Text style={ styles.placeholderText }>No image</Text>
          </View>
        }
        <View style={ styles.contentContainer }>
          <View style={ styles.overlay } />
          <Text style={ styles.date }>{ formatDate(note.lastUpdated) }</Text>
          <Text style={ styles.content } numberOfLines={ 3 }>
            { note.content }
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

}

export default CarouselItem;