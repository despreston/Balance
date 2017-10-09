import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import Styles from './note-type-switch-styles';

class NoteTypeSwitch extends Component {

  static propTypes = {
    onPress: PropTypes.func.isRequired,
    futureNotesCount: PropTypes.number,
    pastNotesCount: PropTypes.number
  }

  constructor (props) {
    super(props);
    this.state = { selected: 'Future' };
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
        { this.option(`TO DO (${this.props.futureNotesCount})`, 'Future') }
        { this.option(`COMPLETED (${this.props.pastNotesCount})`, 'Past') }
      </View>
    );
  }

}

export default NoteTypeSwitch;
