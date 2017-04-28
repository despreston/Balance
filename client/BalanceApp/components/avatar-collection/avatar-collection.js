import React, { Component, PropTypes } from 'react';
import { Image, View } from 'react-native';

// styles
import Style from './avatar-collection-styles';

export default class Nudges extends Component {

  static propTypes = {
    images: PropTypes.array.isRequired,
    imageSize: PropTypes.number
  };

  constructor (props) {
    super(props);

    this.state = {
      numOfImages: props.images.length
    };
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      numOfImages: nextProps.images.length
    });
  }

  renderImages () {
    let { images } = this.props;
    let { numOfImages } = this.state;
    let size = null;

    if (this.props.imageSize) {
      size = {
        height: this.props.imageSize,
        width: this.props.imageSize,
        borderRadius: this.props.imageSize / 2
      };
    }

    if (numOfImages > 5) {
      images = images.slice(0, 5);
    }

    return images.map((image, i) => {
      i = i + 1;
      return (
        <Image
          key={ i }
          source={{ uri: image }}
          style={ [Style.image, { left: -8 * i }, size] } />
      );
    });
  }

  render () {
    return (
      <View>
        { this.renderImages() }
      </View>
    );
  }

}