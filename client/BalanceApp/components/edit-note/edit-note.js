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
    this.state = { isDirty: false }
  }

  getSaveTextColor () {
    return this.state.isDirty ? {} : { color: '#CFD0D4' };
  }

  render () {
    return (
      <View style={Styles.editNote}>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.props.visible}
          >
          <View style={Styles.editNote}>
            <View style={Styles.header}>
              <TouchableHighlight onPress={this.props.onClose}>
                <Text style={Styles.headerText}>Close</Text>
              </TouchableHighlight>
              <View style={Styles.actions}>
                <TouchableHighlight>
                  <Text style={[Styles.headerText, Styles.clear]}>Clear</Text>
                </TouchableHighlight>
                <View style={Styles.spacer} />
                <TouchableHighlight>
                  <Text style={[Styles.headerText, this.getSaveTextColor() ]}>Save</Text>
                </TouchableHighlight>
              </View>
            </View>
            <Text>{this.props.note.text}</Text>
          </View>
        </Modal>
      </View>
    );
  }
}