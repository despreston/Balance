import React, { Component, PropTypes } from 'react';
import {
  Modal,
  Text,
  KeyboardAvoidingView,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import Styles from './add-update-styles';
import NavButton from './nav-button/nav-button';
import Note from './note/note';
import MarkComplete from './mark-complete/mark-complete';
import Trash from './trash/trash';
import Picture from './picture/picture';

export default class AddUpdate extends Component {

  static propTypes = {
    content: PropTypes.string.isRequired,
    picture: PropTypes.string,
    complete: PropTypes.bool.isRequired,
    isNew: PropTypes.bool,
    hideFn: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
    save: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    togglePhotoUploader: PropTypes.func.isRequired,
    toggleComplete: PropTypes.func.isRequired,
    removePhoto: PropTypes.func.isRequired,
    onContentChange: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props);
    this.pastNotePlaceholder = "What did you do?";
    this.futureNotePlaceholder = "What do you need to do?";
    this.state = { placeholder: this.futureNotePlaceholder };
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      placeholder: nextProps.complete ? this.pastNotePlaceholder : this.futureNotePlaceholder
    });
  }

  renderCancelButton () {
    return (
      <NavButton
        onPress={ this.props.hideFn }
        label="Cancel"
        buttonStyle={ Styles.unimportantButton }
      />
    );
  }

  renderSaveButton () {
    const disabled = this.props.content === '' && !this.props.picture;

    return (
      <NavButton
        disabled={ disabled }
        onPress={ this.props.save }
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

  render () {
    const {
      visible,
      hideFn,
      project,
      togglePhotoUploader,
      toggleComplete,
      onContentChange
    } = this.props;

    return (
      <Modal transparent animationType='slide' visible={ visible } >
        <View style={[ Styles.absolute, Styles.flex ]}>
          <TouchableOpacity
            style={[ Styles.absolute ]}
            onPress={ hideFn }
          >
            <View style={[ Styles.flex, Styles.overlay ]} />
          </TouchableOpacity>
          <KeyboardAvoidingView behavior='height' style={[ Styles.flex, Styles.card ]}>
            <View style={[ Styles.flex, Styles.content ]}>
              <View style={[ Styles.flexRow, Styles.outsideContent ]}>
                { this.renderCancelButton() }
                <View>
                  <Text style={ Styles.text }>
                    { this.props.isNew ? 'New Note' : 'Edit Note' }
                  </Text>
                  <Text style={ Styles.subText }>{ project.title }</Text>
                </View>
                { this.renderSaveButton() }
              </View>
              <Note
                autoFocus
                onTextChange={ onContentChange }
                note={ this.props.content }
                placeHolder={ this.state.placeholder }
              />
              {
                this.props.picture &&
                <Picture
                  uri={ this.props.picture }
                  remove={ this.props.removePhoto }
                />
              }
              <View style={[ Styles.flexRow, Styles.outsideContent ]}>
                <MarkComplete
                  onPress={ toggleComplete }
                  complete={ this.props.complete }
                />
                <View style={ Styles.flexRow }>
                  <TouchableOpacity onPress={ togglePhotoUploader }>
                    <Image
                      style={{ height: 23, width: 23 }}
                      source={ require('../../assets/icons/camera.png')}
                    />
                  </TouchableOpacity>
                  {
                    !this.props.isNew && (
                      <View style={ Styles.spacing }>
                        <Trash remove={ () => this.props.remove() }/>
                      </View>
                    )
                  }
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    );
  }

}