import React, { Component, PropTypes } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './carousel-item-styles';

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
          <Text style={ styles.content }>{ note.content }</Text>
        </View>
      </TouchableOpacity>
    );
  }

}

export default CarouselItem;