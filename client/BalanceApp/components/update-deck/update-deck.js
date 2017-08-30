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
import EmptyMessage from './empty-message/empty-message';

class UpdateDeck extends Component {

  static propTypes = {
    visible: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    notes: PropTypes.array.isRequired,
    onNoteTap: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props);

    this.sliderWidth = Dimensions.get('window').width;
    this.itemWidth = (75 * this.sliderWidth) / 100;
    this.renderNote = this.renderNote.bind(this);
  }

  renderNote ({ item, index }) {
    return (
      <CarouselItem
        key={ index }
        itemWidth={ this.itemWidth }
        note={ item }
        onPress={ this.props.onNoteTap }
      />
    );
  }

  render () {
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
          {
            this.props.notes.length > 0 &&
            <View style={ Styles.content }>
              <Carousel
                data={ this.props.notes }
                renderItem={ this.renderNote }
                ref={ carousel => { this._carousel = carousel; }}
                sliderWidth={ this.sliderWidth }
                itemWidth={ this.itemWidth }
              />
            </View>
          }
          {
            this.props.notes.length < 1 &&
            <EmptyMessage />
          }
        </View>
      </Modal>
    );
  }
}

export default UpdateDeck;
