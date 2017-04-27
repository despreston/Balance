import React, { Component, PropTypes } from 'react';
import { Modal } from 'react-native';
import { EmojiOverlay } from 'react-native-emoji-picker';
import Styles from './reaction-selector-styles';

export default class ReactionSelector extends Component {

  static propTypes = {
    visible: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props);
  }
  
  render () {
    return (
      <Modal visible={ this.props.visible } transparent animationType='fade'>
        <EmojiOverlay
          style={ Styles.emojiPicker }
          visible={ this.props.visible }
          onTapOutside={ () => this.props.close() }
          horizontal
          hideClearButton
          onEmojiSelected={ emoji => this.props.close(emoji) }
        />
      </Modal>
    );
  }
  
}