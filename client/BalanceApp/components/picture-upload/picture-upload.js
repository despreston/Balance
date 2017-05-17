import React, { Component, PropTypes } from 'react';
import { TouchableOpacity, Text, View, Modal } from 'react-native';
import CameraRollPicker from 'react-native-camera-roll-picker';
import Styles from './picture-upload-styles';
import Colors from '../colors';

class PictureUpload extends Component {

  static propTypes = {
    visible: PropTypes.bool.isRequired,
    toggleVisible: PropTypes.func.isRequired,
    onPhotoSelect: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props);
    this.state = { photos: [] };
  }
  
  render () {
    return (
      <Modal animationType='slide' visible={ this.props.visible }>
        <View style={ Styles.modal }>
          <CameraRollPicker
            backgroundColor={ Colors.purple }
            callback={ this.props.onPhotoSelect }
            maximum={1}
            imageMargin={2}
          />
          <TouchableOpacity onPress={ () => this.props.toggleVisible() } style={ Styles.close }>
            <Text style={ Styles.closeText }>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }

}

export default PictureUpload;