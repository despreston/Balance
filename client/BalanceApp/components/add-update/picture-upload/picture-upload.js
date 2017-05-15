import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';

class PictureUpload extends Component {
  
  render () {
    return (
      <TouchableOpacity onPress={ () => null }>
        <Image
          style={{ height: 23, width: 23 }}
          source={ require('../../../assets/icons/camera.png')}
        />
      </TouchableOpacity>
    );
  }

}

export default PictureUpload;