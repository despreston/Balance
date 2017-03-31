import React, { Component, PropTypes } from 'react';
import {
  Modal,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  View
} from 'react-native';
import Dimensions from 'Dimensions';

import Styles from './add-update-styles';

// components
import NavButton from './nav-button/nav-button';
import Note from './note/note';

export default class AddUpdate extends Component {

  static propTypes = {
    hideFn: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
    project: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props);

    this.scrollView = null;
    this.pastNotePlaceholder = "e.g., Finished math homework";
    this.futureNotePlaceholder = "e.g., Study for test on Tuesday";
  }

  move (factor) {
    this.scrollView.scrollTo({ x: factor * Dimensions.get('window').width });
  }

  renderCancelButton () {
    return (
      <NavButton
        onPress={ () => this.props.hideFn() }
        label="Cancel"
        buttonStyle={ Styles.unimportantButton }
      />
    );
  }

  renderNextButton () {
    return (
      <NavButton
        onPress={ () => this.move(1) }
        label="Next"
        buttonStyle={ Styles.green }
      />
    );
  }

  renderSkipButton () {
    return (
      <NavButton
        onPress={ () => this.move(1) }
        label="Skip"
        buttonStyle={ Styles.unimportantButton }
      />
    );
  }

  renderBackButton () {
    return (
      <NavButton
        onPress={ () => this.move(0) }
        label="Back"
        buttonStyle={ Styles.unimportantButton }
      />
    );   
  }

  renderSaveButton () {
    return (
      <NavButton
        onPress={ () => this.props.hideFn() }
        label="Save"
        buttonStyle={ Styles.green }
      />
    );   
  }

  render () {
    const { visible } = this.props;

    return (
      <Modal animationType={ 'slide' } visible={ visible } >
        <ScrollView
          keyboardShouldPersistTaps='handled'
          horizontal
          scrollEnabled={ false }
          style={ Styles.content }
          ref={ scrollView => { this.scrollView = scrollView; } }
        >
          <KeyboardAvoidingView behavior='padding' style={ Styles.card }>
            <Text style={ Styles.text }>What did you do this time?</Text>
            <Text style={ Styles.subText }>
              Feel free to skip if you did not do anything.
            </Text>
            <Note placeHolder={ this.pastNotePlaceholder }/>
            <View style={ Styles.navButtonContainer }>
              { this.renderCancelButton() }
              { this.renderSkipButton() }
              { this.renderNextButton() }
            </View>
          </KeyboardAvoidingView>

          <KeyboardAvoidingView behavior='padding' style={ Styles.card }>
            <Text style={ Styles.text }>
              What do you want to work on next time?
            </Text>
            <Text style={ Styles.subText }>
              Leave this blank if you're unsure what to work on next.
            </Text>
            <Note placeHolder={ this.futureNotePlaceholder }/>
            <View style={ Styles.navButtonContainer }>
              { this.renderCancelButton() }
              { this.renderBackButton() }
              { this.renderSaveButton() }
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </Modal>
    );
  }

}