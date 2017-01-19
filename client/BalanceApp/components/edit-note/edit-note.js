// Vendors
import React, { Component, PropTypes } from 'react';
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';
import {
  Modal,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  Alert } from 'react-native';

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
    this.state = { isDirty: false, textValue: '' };
  }

  getSaveTextColor () {
    return this.state.isDirty ? {} : { color: '#CFD0D4' };
  }

  onTextChange (event) {
    // dirty check
    if (event.nativeEvent.text !== this.props.note.text) {
      this.setState({ isDirty: true, textValue: event.nativeEvent.text || '' });
    } else {
      this.setState({ isDirty: false, textValue: event.nativeEvent.text || '' });
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ isDirty: false, textValue: nextProps.note.text || '' });
  }

  onClear () {
    function clearNote() {
      this.setState({ isDirty: true, textValue: '' });
    }

    return Alert.alert('Clear Note?', null, [
      { text: 'Clear', onPress: clearNote.bind(this) },
      { text: 'Cancel' }
    ]);
  }

  onSave () {

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
                  <Text style={[Styles.headerText, Styles.clear]} onPress={() => this.onClear()}>Clear</Text>
                </TouchableHighlight>
                <View style={Styles.spacer} />
                <TouchableHighlight>
                  <Text style={[Styles.headerText, this.getSaveTextColor() ]}>Save</Text>
                </TouchableHighlight>
              </View>
            </View>
            <AutoGrowingTextInput
              autoFocus
              value={this.state.textValue}
              onChange={event => this.onTextChange(event)}
              style={Styles.input}
            />
          </View>
        </Modal>
      </View>
    );
  }
}