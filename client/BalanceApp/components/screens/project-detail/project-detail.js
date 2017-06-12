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
import UpdateButton from './update-button/update-button';
import NoteTypeSwitch from './note-type-switch/note-type-switch';
import UpdateDeckContainer from '../../update-deck/update-deck-container';

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

  privacyLevelText () {
    switch (this.props.project.privacyLevel) {
      case 'global': return '🌎';
      case 'friends': return '👥';
      case 'private': return '🔒';
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
      userIsOwner,
      goToAuthor,
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
          <View style={[ Styles.purpleBackground, Styles.info ]}>
            <View>
              { project.status === 'finished' && <FinishedProjectText /> }
              <Text style={ [Styles.title, Styles.whiteText] }>
                { project.title }
              </Text>
              <Text style={ [Styles.author, Styles.whiteText] }>
                Started by
                <Text
                  onPress={ goToAuthor }
                  style={[ Styles.bold, { flex: 1 } ]}
                >
                  { ` ${project.owner[0].username}` }
                </Text>
                { ` ${this.privacyLevelText()}` }
              </Text>
            </View>
            <View style={ Styles.infoTextContainer }>
              <Text style={ [Styles.whiteText, Styles.description] }>
                { project.description }
              </Text>
            </View>
            {
              userIsOwner && project.status !== 'finished' && 
              <UpdateButton press={ toggleAddUpdateModal } /> 
            }
          </View>
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
      </ScrollView>
    );
  }
}

const FinishedProjectText = () => {
  return (
    <View>
      <Text style={ [Styles.description, Styles.bold, Styles.whiteText] }>
        This project has been finished!  🎉
      </Text>
    </View>
  );
};

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