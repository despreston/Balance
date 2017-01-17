// Vendors
import React, { Component, PropTypes } from 'react';
import { Modal, Text, TouchableHighlight, View } from 'react-native';

// Components
import { Styles } from './edit-note-style';

export default class EditNote extends Component {
  static propTypes = {
    note: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired
  }

  constructor (props) {
    super();
  }

  render () {
    return (
      <View style={ Styles.editNote }>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.props.visible}
          >
          <View style={ Styles.editNote }>
            <TouchableHighlight onPress={this.props.onClose}>
              <Text>{this.props.note.text}</Text>
            </TouchableHighlight>
          </View>
        </Modal>
      </View>
    );
  }
}