import React, { Component, PropTypes } from 'react';
import {
  Modal,
  TouchableOpacity,
  View,
  Dimensions
} from 'react-native';
import Styles from './update-deck-styles';
import Carousel from 'react-native-snap-carousel';
import CarouselItem from './carousel-item/carousel-item';

class UpdateDeck extends Component {

  static propTypes = {
    visible: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    notes: PropTypes.array.isRequired,
    onNoteTap: PropTypes.func.isRequired
  }

  notes (itemWidth) {
    return this.props.notes.map((note, idx) => {
      return (
        <CarouselItem
          key={ idx }
          itemWidth={ itemWidth }
          note={ note }
          onPress={ this.props.onNoteTap }
        />
      );
    });
  }
  
  render () {
    const sliderWidth = Dimensions.get('window').width;
    const itemWidth = (75 * sliderWidth) / 100;

    return (
      <Modal transparent animationType='fade' visible={ this.props.visible } >
        <View style={[ Styles.absolute, Styles.flex, Styles.center ]}>
          <TouchableOpacity
            activeOpacity={ 1 }
            style={[ Styles.absolute ]}
            onPress={ this.props.onHide }
          >
            <View style={[ Styles.flex, Styles.overlay ]} />
          </TouchableOpacity>
          <View style={ Styles.content }>
            <Carousel
              ref={(carousel) => { this._carousel = carousel; }}
              sliderWidth={ sliderWidth }
              itemWidth={ itemWidth }
            >
              { this.notes(itemWidth) }
            </Carousel>
          </View>
        </View>
      </Modal>
    );
  }
}

export default UpdateDeck;