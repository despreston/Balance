// Vendors
import React, { Component, PropTypes } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

// styles
import { Styles } from './project-detail-style';

// Components
import FutureNote from './future-note/future-note';
import NoteListContainer from '../../note-list/note-list-container';
import AddUpdateContainer from '../../add-update/add-update-container';
import NudgeField from './nudge-field/nudge-field';

// utils
import emptyNote from '../../../utils/empty-note';

class ProjectDetail extends Component {

  static propTypes = {
    project: PropTypes.shape({
      title: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      nudgeUsers: PropTypes.array,
      owner: PropTypes.array.isRequired
    }),
    nav: PropTypes.func.isRequired,
    notes: PropTypes.array,
    userIsOwner: PropTypes.bool
  };

  constructor (props) {
    super(props);

    this.state = { addUpdateVisible: false };

    this.pastNotes = this.notesForType('Past');
    this.futureNotes = this.notesForType('Future');
    this.futureNote = this.getFutureNote();
  }

  notesForType (type) {
    return this.props.notes.filter(note => note.type === type);
  }

  toggleAddUpdateModal () {
    this.setState({ addUpdateVisible: !this.state.addUpdateVisible });
  }

  goToAuthor () {
    this.props.nav('UserProfile', {
      userId: this.props.project.owner[0].userId
    });
  }

  getFutureNote () {
    const { project } = this.props;

    if (this.futureNotes.length > 0) {
      return this.futureNotes.reduce((latest, note) => {
        return note.lastUpdated.getTime() > latest.lastUpdated.getTime()
          ? note
          : latest;
      }, this.futureNotes[0]);
    }

    else if (project.Future) {
      return project.Future;
    }

    else {
      return emptyNote(project, 'Future');
    }
  }

  renderPastNotes (notes) {
    if (notes.length === 0) {
      return (
        <Text style={ Styles.emptyText }>
          Nothing has been done for this project.
        </Text>
      );
    }

    const {
      nav,
      status,
      userIsOwner,
      onEdit
    } = this.props;

    // hide edit buttons if project is Finished OR user is not the owner
    return (
      <NoteListContainer
        showContext
        showEdit={ status !== 'finished' && userIsOwner }
        onSelect={ id => nav('Note', { id }) }
        notes={ notes }
      />
    );
  }

  renderUpdateButton () {
    const { project, userIsOwner } = this.props;

    if (!userIsOwner) { return null; }

    if (project.status === 'finished') {
      return (
        <View style={ Styles.infoTextContainer }>
          <Text style={ [Styles.finishedProjectText, Styles.bold, Styles.whiteText] }>
            This project has been marked as finished. {"\n"} Nice job! 🎉
          </Text>
        </View>
      );
    }

    return (
      <View style={ Styles.updateButtonContainer }>
        <TouchableOpacity
          onPress={ () => this.toggleAddUpdateModal() }
          style={ Styles.updateButton }>
          <Text
            style={ [Styles.updateButtonText, Styles.bold, Styles.whiteText] }>
            Add an update
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderNudgeStuff () {
    const { project, userIsOwner } = this.props;

    return project.status === 'active'
      ? <NudgeField hideButton={ userIsOwner } project={ project } />
      : null;
  }

  render () {
    const { project, saveNote, nav } = this.props;

    return (
      <ScrollView
        style={ Styles.projectDetail }
        keyboardShouldPersistTaps='handled'
      >
        <View style={ Styles.info }>
          <View>
            <Text style={ [Styles.title, Styles.whiteText] }>
              { project.title }
            </Text>
            <Text style={ [Styles.author, Styles.whiteText] }>
              Started by
              <Text
                onPress={ () => this.goToAuthor() }
                style={[ Styles.bold, { flex: 1 } ]}
              >
                { ` ${project.owner[0].username}` }
              </Text>
            </Text>
          </View>
          <View style={ Styles.infoTextContainer }>
            <Text style={[ Styles.whiteText, Styles.description ]}>
              { 
                project.description ||
                <Text style={{ opacity: 0.9 }}>No description</Text>
              }
            </Text>
          </View>
          { this.renderUpdateButton() }
        </View>
        { this.renderNudgeStuff() }
        <View style={ Styles.container }>
          {
            project.status === 'active' &&
            <FutureNote note={ this.futureNote }/>
          }
          <View style={ Styles.pastNotesView }>
            <Text style={ [Styles.finishedTitleText, Styles.bold] }>
              Completed
            </Text>
            { this.renderPastNotes(this.pastNotes) }
          </View>
        </View>
        <AddUpdateContainer
          project={ project }
          visible={ this.state.addUpdateVisible }
          hideFn={ () => this.toggleAddUpdateModal() }
        />
      </ScrollView>
    );
  }

}

export default ProjectDetail;