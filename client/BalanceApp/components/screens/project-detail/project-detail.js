import React, { Component, PropTypes } from 'react';
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
    notesToShow: PropTypes.string.isRequired,
    addUpdateVisible: PropTypes.bool.isRequired,
    goToAuthor: PropTypes.func.isRequired,
    onNoteContextChange: PropTypes.func.isRequired,
    goToNote: PropTypes.func.isRequired,
    toggleAddUpdateModal: PropTypes.func.isRequired,
    updateDeckVisible: PropTypes.bool.isRequired,
    toggleUpdateDeck: PropTypes.func.isRequired,
    onUpdateDeckPress: PropTypes.func.isRequired
  }

  componentWillReceiveProps (nextProps) {
    if (
      nextProps.project.status === 'finished'
      && this.props.project.status === 'active'
    ) {
      this._confettiView.startConfetti();
    }
  }

  notesSelector (type) {
    return (notes, project) => {
      return Object.keys(notes)
        .map(id => notes[id])
        .filter(note => {
          return (
            project._id === note.project._id &&
            note.type === type
          );
        });
    }
  }

  renderPastNotes () {
    const {
      status,
      userIsOwner,
      goToNote,
      project
    } = this.props;

    const query = [
      { user: project.owner[0].userId },
      { project: project._id },
      { type: 'Past' }
    ];

    // hide edit buttons if project is Finished OR user is not the owner
    return (
      <NoteListContainer
        showTypeText
        emptyState={ <EmptyCompletedNotes /> }
        query={ query }
        selector={ notes => this.notesSelector('Past')(notes, project) }
        showEdit={ status !== 'finished' && userIsOwner }
        onSelect={ goToNote }
      />
    );
  }

  renderFutureNotes () {
    const {
      status,
      userIsOwner,
      goToNote,
      project
    } = this.props;

    const query = [
      { user: project.owner[0].userId },
      { project: project._id },
      { type: 'Future' }
    ];

    // hide edit buttons if project is Finished OR user is not the owner
    return (
      <View style={ Styles.container }>
        <NoteListContainer
          showTypeText
          emptyState={ <EmptyFutureNotes /> }
          query={ query }
          selector={ notes => this.notesSelector('Future')(notes, this.props.project) }
          showEdit={ status !== 'finished' && userIsOwner }
          onSelect={ goToNote }
        />
      </View>
    );
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
      notesToShow,
      updateDeckVisible,
      toggleUpdateDeck
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
        refreshControl={ <Refresh { ...refreshProps }/> }
      >
        <View style={[ Styles.whiteBackground, Styles.main ]}>
          <Header { ...this.props } />
          { this.renderNudgeStuff() }
          <View style={ Styles.container }>
            <NoteTypeSwitch onPress={ onNoteContextChange }/>
            {
              notesToShow === 'Future'
                ? this.renderFutureNotes()
                : this.renderPastNotes()
            }
          </View>
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
          ref={ node  => this._confettiView = node }/>
      </ScrollView>
    );
  }
}

const EmptyCompletedNotes = () => {
  return (
    <Text style={ Styles.emptyText }>No work has been done for this project.</Text>
  )
};

const EmptyFutureNotes = () => {
  return (
    <Text style={ Styles.emptyText }>Nothing to do for this project.</Text>
  )
};

export default ProjectDetail;
