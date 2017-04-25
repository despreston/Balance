import React, { Component, PropTypes } from 'react';
import {
  Modal,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  Switch,
  View
} from 'react-native';

// utils
import emptyNote from '../../utils/empty-note';

// styles
import Styles from './add-update-styles';
import Colors from '../colors';

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

    this.options = [ 'Todo', 'Completed' ];
    this.scrollView = null;
    this.pastNotePlaceholder = "Finished math homework";
    this.futureNotePlaceholder = "Study for test on Tuesday";
    this.typeChange = this.typeChange.bind(this);

    this.state = {
      note: '',
      placeholder: this.futureNotePlaceholder,
      complete: false
    };
  }

  componentWillReceiveProps () {
    this.setState({
      note: '',
      placeholder: this.futureNotePlaceholder,
      complete: false
    });
  }

  renderCancelButton () {
    function doCancel () {
      this.setState({ note: '' });
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

  renderSaveButton () {
    function saveAndClose () {
      let note = this.state.complete
        ? emptyNote(this.props.project, 'Past')
        : emptyNote(this.props.project, 'Future');

      note.content = this.state.note;

      this.props.save(note)
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

  typeChange (complete) {
    const placeholder = complete
      ? this.pastNotePlaceholder
      : this.futureNotePlaceholder;

    this.setState({
      complete,
      placeholder
    });
  }

  render () {
    const { visible } = this.props;

    return (
      <Modal animationType={ 'slide' } visible={ visible } >
        <View style={ Styles.content }>
          <KeyboardAvoidingView behavior='padding' style={ Styles.card }>
            <View style={ Styles.flexRow }>
              <Text style={ Styles.text }>Completed</Text>
              <Switch
                value={ this.state.complete }
                onValueChange={ val => this.typeChange(val) }
                onTintColor={ Colors.green }
              />
            </View>
            <Note
              autoFocus
              onTextChange={ text => this.setState({ note: text }) }
              note={ this.state.note }
              placeHolder={ this.state.placeholder }
            />
            <View style={[ Styles.flexRow, Styles.navButtonContainer ]}>
              { this.renderCancelButton() }
              { this.renderSaveButton() }
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    );
  }

}