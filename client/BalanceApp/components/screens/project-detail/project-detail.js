import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Text
} from 'react-native';
import Styles from './project-detail-style';
import NoteListContainer from '../../note-list/note-list-container';
import AddUpdateContainer from '../../add-update/add-update-container';
import NudgeField from './nudge-field/nudge-field';
import Refresh from '../../refresh/refresh';
import NoteTypeSwitch from './note-type-switch/note-type-switch';
import UpdateDeckContainer from '../../update-deck/update-deck-container';
import Header from './header/header';
import Confetti from 'react-native-confetti';

class ProjectDetail extends Component {

  static propTypes = {
    project: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      nudgeUsers: PropTypes.array,
      privacyLevel: PropTypes.string.isRequired,
      owner: PropTypes.array.isRequired
    }),
    userIsOwner: PropTypes.bool,
    refreshing: PropTypes.bool.isRequired,
    onRefresh: PropTypes.func.isRequired,
    addUpdateVisible: PropTypes.bool.isRequired,
    goToAuthor: PropTypes.func.isRequired,
    onNoteContextChange: PropTypes.func.isRequired,
    goToNote: PropTypes.func.isRequired,
    toggleAddUpdateModal: PropTypes.func.isRequired,
    updateDeckVisible: PropTypes.bool.isRequired,
    toggleUpdateDeck: PropTypes.func.isRequired,
    onUpdateDeckPress: PropTypes.func.isRequired,
    notes: PropTypes.array.isRequired,
    noteType: PropTypes.string.isRequired,
    bookmarkCount: PropTypes.number.isRequired,
    onBookmarksTap: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props);

    this.futureNotesCount = this.noteCountForType('Future', props.notes);
    this.pastNotesCount = this.noteCountForType('Past', props.notes);
  }

  noteCountForType (type, notes) {
    return notes.filter(note => note.type === type).length;
  }

  componentWillReceiveProps (nextProps) {
    if (
      nextProps.project.status === 'finished'
      && this.props.project.status === 'active'
    ) {
      this._confettiView.startConfetti();
    }

    this.futureNotesCount = this.noteCountForType('Future', nextProps.notes);
    this.pastNotesCount = this.noteCountForType('Past', nextProps.notes);
  }

  renderNudgeStuff () {
    const { project, userIsOwner } = this.props;

    if (project.status !== 'active' || (userIsOwner && !project.nudgeUsers)) {
      return null;
    }

    return <NudgeField hideButton={ userIsOwner } project={ project } />;
  }

  render () {
    const {
      project,
      refreshing,
      onUpdateDeckPress,
      addUpdateVisible,
      toggleAddUpdateModal,
      onNoteContextChange,
      updateDeckVisible,
      toggleUpdateDeck,
      status,
      userIsOwner,
      notes,
      goToNote,
      noteType
    } = this.props;

    const refreshProps = {
      refreshing,
      onRefresh: () => this.props.onRefresh(),
      tintColor: 'white',
      styles: Styles.purpleBackground
    };

    return (
      <ScrollView
        style={ Styles.projectDetail }
        keyboardShouldPersistTaps='handled'
        refreshControl={ <Refresh { ...refreshProps } /> }
      >
        <View style={[ Styles.whiteBackground, Styles.main ]}>
          <Header { ...this.props } />
          { this.renderNudgeStuff() }
          <NoteTypeSwitch
            onPress={ onNoteContextChange }
            futureNotesCount={ this.futureNotesCount }
            pastNotesCount={ this.pastNotesCount }
          />
          <NoteListContainer
            showTypeText
            emptyState={ EmptyNotes(noteType) }
            notes={ notes.filter(note => note.type === noteType) }
            showEdit={ status !== 'finished' && userIsOwner }
            onSelect={ goToNote }
          />
        </View>
        <AddUpdateContainer
          isNew
          reloadProject
          project={ project }
          visible={ addUpdateVisible }
          hideFn={ () => toggleAddUpdateModal() }
        />
        <UpdateDeckContainer
          onNoteTap={ onUpdateDeckPress }
          project={ project }
          visible={ updateDeckVisible }
          onHide={ toggleUpdateDeck }
        />
        <Confetti
          duration={ 3000 }
          ref={ node  => this._confettiView = node }
        />
      </ScrollView>
    );
  }
}

const EmptyNotes = type => {
  const text = type === 'Future'
    ? 'Nothing to do for this project.'
    : 'No work has been done for this project.'

  return <Text style={ Styles.emptyText }>{ text }</Text>;
};

export default ProjectDetail;
