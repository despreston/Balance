import React, { Component, PropTypes } from 'react';
import { Modal } from 'react-native';
import CameraRollPicker from 'react-native-camera-roll-picker';

class PictureUpload extends Component {

  static propTypes = {
    visible: PropTypes.bool.isRequired
  }

  constructor (props) {
    super(props);
    this.state = { photos: [] };
  }
  
  render () {
    return (
      <Modal animationType='slide' visible={ this.props.visible }>
        <CameraRollPicker />
      </Modal>
    );
  }

}

export default PictureUpload;