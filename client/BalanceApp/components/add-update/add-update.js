import React, { Component, PropTypes } from 'react';
import {
  Modal,
  Text,
  KeyboardAvoidingView,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

// utils
import emptyNote from '../../utils/empty-note';

// styles
import Styles from './add-update-styles';

// components
import NavButton from './nav-button/nav-button';
import Note from './note/note';
import MarkComplete from './mark-complete/mark-complete';

export default class AddUpdate extends Component {

  static propTypes = {
    hideFn: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
    project: PropTypes.object.isRequired,
    save: PropTypes.func.isRequired,
    note: PropTypes.object
  }

  constructor (props) {
    super(props);

    this.scrollView = null;
    this.pastNotePlaceholder = "What did you do?";
    this.futureNotePlaceholder = "What do you need to do?";
    this.toggleComplete = this.toggleComplete.bind(this);

    this.state = {
      note: (this.props.note && this.props.note.content) || '',
      placeholder: this.futureNotePlaceholder,
      complete: (this.props.note && this.props.note.type) === 'Past'
    };
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      note: (nextProps.note && nextProps.note.content) || '',
      placeholder: this.futureNotePlaceholder,
      complete: (nextProps.note && nextProps.note.type) === 'Past'
    });
  }

  doCancel () {
    this.setState({ note: '' });
    this.props.hideFn();
  }

  renderCancelButton () {
    return (
      <NavButton
        onPress={ this.doCancel.bind(this) }
        label="Cancel"
        buttonStyle={ Styles.unimportantButton }
      />
    );
  }

  renderSaveButton () {
    function saveAndClose () {
      let note;

      if (this.props.note) {
        note = this.props.note;
        note.type = this.state.complete ? 'Past' : 'Future';
      } else if (this.state.complete) {
        note = emptyNote(this.props.project, 'Past');
      } else {
        note = emptyNote(this.props.project, 'Future');
      }

      note.content = this.state.note;

      this.props.save(note)
        .then(this.props.hideFn);
    }

    const disabled = this.state.note === '';

    return (
      <NavButton
        disabled={ disabled }
        onPress={ saveAndClose.bind(this) }
        label="Save"
        textStyle={ disabled ? Styles.disabledGreenText : null }
        buttonStyle={ disabled ? Styles.disabledGreen : Styles.green }
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

  toggleComplete () {
    const complete = !this.state.complete;

    const placeholder = complete
      ? this.pastNotePlaceholder
      : this.futureNotePlaceholder;

    this.setState({
      complete,
      placeholder
    });
  }

  render () {
    const { visible, project } = this.props;

    return (
      <Modal transparent animationType='slide' visible={ visible } >
        <View style={[ Styles.absolute, Styles.flex ]}>
          <TouchableOpacity
            style={[ Styles.absolute ]}
            onPress={ this.doCancel.bind(this) }
          >
            <View style={[ Styles.flex, Styles.overlay ]} />
          </TouchableOpacity>
            <KeyboardAvoidingView behavior='height' style={[ Styles.flex, Styles.card ]}>
              <View style={[ Styles.flex, Styles.content ]}>
                <View style={[ Styles.flexRow, Styles.outsideContent ]}>
                  { this.renderCancelButton() }
                  <View>
                    <Text style={ Styles.text }>
                      { this.props.note ? 'Edit Update' : 'New Update' }
                    </Text>
                    <Text style={ Styles.subText }>{ project.title }</Text>
                  </View>
                  { this.renderSaveButton() }
                </View>
                <Note
                  autoFocus
                  onTextChange={ text => this.setState({ note: text }) }
                  note={ this.state.note }
                  placeHolder={ this.state.placeholder }
                />
                <View style={[ Styles.flexRow, Styles.outsideContent ]}>
                  <MarkComplete
                    onPress={ () => this.toggleComplete() }
                    complete={ this.state.complete }
                  />
                  <View>
                    <Image
                      style={{ height: 20, width: 20 }}
                      source={ require('../../assets/icons/trash.png')}
                    />
                  </View>
                </View>
              </View>
            </KeyboardAvoidingView>
        </View>
      </Modal>
    );
  }

}