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

// utils
import emptyNote from '../../utils/empty-note';

// styles
import Styles from './add-update-styles';

// components
import NavButton from './nav-button/nav-button';
import Note from './note/note';

export default class AddUpdate extends Component {

  static propTypes = {
    hideFn: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
    project: PropTypes.object.isRequired,
    save: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props);

    this.state = { past: '', future: '' };

    this.scrollView = null;
    this.pastNotePlaceholder = "e.g., Finished math homework";
    this.futureNotePlaceholder = "e.g., Study for test on Tuesday";
  }

  move (factor) {
    this.scrollView.scrollTo({ x: factor * Dimensions.get('window').width });
  }

  renderCancelButton () {
    function doCancel () {
      this.setState({ past: '', future: '' });
      this.props.hideFn();
    }

    return (
      <NavButton
        onPress={ doCancel.bind(this) }
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
    function doSkip () {
      this.setState({ past: '' });
      this.move(1);
    }

    return (
      <NavButton
        onPress={ doSkip.bind(this) }
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
    function saveAndClose () {
      let past = emptyNote(this.props.project, 'Past');
      let future = emptyNote(this.props.project, 'Future');

      past.content = this.state.past;
      future.content = this.state.future;

      this.props.save(past, future)
        .then(() => this.setState({ past: '', future: '' }))
        .then(this.props.hideFn);
    }

    return (
      <NavButton
        onPress={ saveAndClose.bind(this) }
        label="Save"
        buttonStyle={ Styles.green }
      />
    );   
  }

  privacy () {
    function getText() {
      switch (this.props.project.privacyLevel) {
        case 'global' : return 'Public';
        case 'friends': return 'Friends-only';
        case 'private': return 'Private';
      }
    }

    return (
      <Text style={[ Styles.subText, Styles.privacy ]}>
        Privacy Level: { getText.call(this) }
      </Text>
    );
  }

  render () {
    const { visible } = this.props;

    return (
      <Modal animationType={ 'slide' } visible={ visible } >
        <ScrollView
          keyboardShouldPersistTaps='handled'
          horizontal
          scrollEnabled={ true }
          style={ Styles.content }
          ref={ scrollView => { this.scrollView = scrollView; } }
        >
          <KeyboardAvoidingView behavior='padding' style={ Styles.card }>
            <Text style={ Styles.text }>What did you do this time?</Text>
            <Text style={ Styles.subText }>
              Feel free to skip if you did not do anything.
            </Text>
            <Note
              onTextChange={ text => this.setState({ past: text }) }
              note={ this.state.past }
              placeHolder={ this.pastNotePlaceholder }
            />
            <Text style={[ Styles.subText, Styles.privacy ]}>
              { this.privacy() }
            </Text>
            <View style={ Styles.navButtonContainer }>
              { this.renderCancelButton() }
              { this.renderSkipButton() }
              { this.renderNextButton() }
            </View>
          </KeyboardAvoidingView>

          <KeyboardAvoidingView behavior='padding' style={ Styles.card }>
            <Text style={ Styles.text }>
              Anything to remember for next time?
            </Text>
            <Text style={ Styles.subText }>
              Leave this blank if you're unsure.
            </Text>
            <Note
              onTextChange={ text => this.setState({ future: text }) }
              note={ this.state.future }
              placeHolder={ this.futureNotePlaceholder }
            />
            { this.privacy() }
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