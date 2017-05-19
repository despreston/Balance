import React, { Component, PropTypes } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

import Styles from './note-type-switch-styles';

class NoteTypeSwitch extends Component {

  static propTypes = {
    onPress: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props);
    this.state = { selected: 'Past' };
  }

  select (type) {
    this.setState({ 'selected': type });
    this.props.onPress(type);
  }

  option (text, type) {
    const touchableStyles = [
      Styles.noteContextTextContainer,
      this.state.selected === type ? Styles.selectedNoteContext : null
    ];

    const textStyles = [
      Styles.noteContextText,
      this.state.selected === type ? Styles.selectedText : null
    ];

    return (
      <TouchableOpacity
        onPress={ () => this.select(type) }
        style={ touchableStyles }
      >
        <Text style={ textStyles }>
          { text }
        </Text>
      </TouchableOpacity>
    )
  }

  render () {
    return (
      <View style={ Styles.noteContext }>
        { this.option('TO DO', 'Future') }
        { this.option('COMPLETED', 'Past') }
      </View>
    );
  }

}

export default NoteTypeSwitch;