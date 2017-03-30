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
import Nudges from '../../nudges/nudges';
import NudgeBtn from '../../nudges/nudge-button/nudge-button';

// utils
import emptyNote from '../../../utils/empty-note';

class ProjectDetail extends Component {

  static propTypes = {
    project: PropTypes.shape({
      title: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired
    }),
    nav: PropTypes.func.isRequired,
    notes: PropTypes.array,
    userIsOwner: PropTypes.bool
  };

  constructor (props) {
    super(props);
  }

  notesForType (type) {
    return this.props.notes.filter(note => note.type === type);
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
        <View style={ Styles.updateButtonContainer }>
          <Text style={ [Styles.finishedProjectText, Styles.bold, Styles.whiteText] }>
            This project has been marked as finished. {"\n"} Nice job! 🎉
          </Text>
        </View>
      );
    }

    return (
      <View style={ Styles.updateButtonContainer }>
        <TouchableOpacity
          onPress={ () => null }
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

    if (project.status !== 'active') {
      return null;
    }

    return (
      <View style={ Styles.nudgeStuff }>
        { !userIsOwner && this.renderNudgeButton(project._id) }
        { this.renderNudges(project.nudgeUsers) }
      </View>
    );
  }

  renderNudges (nudgeUsers) {
    if (!nudgeUsers || nudgeUsers.length === 0) { return null; }

    return (
      <Nudges
        nudgeUsers={ nudgeUsers }
        imageSize={ 30 }
        textStyle={ Styles.whiteText }
      />
    );
  }

  renderNudgeButton (id) {
    return <NudgeBtn project={ id } useWhite={ true } showText={ true } />;
  }

  render () {
    const { project, saveNote, note } = this.props;

    let pastNotes = this.notesForType('Past');
    let futureNotes = this.notesForType('Future');
    let futureNote;

    if (futureNotes.length > 0) {
      futureNote = futureNotes[0];
    } else if (project.Future) {
      futureNote = project.Future;
    } else {
      futureNote = emptyNote(project, 'Future');
    }

    return (
      <ScrollView style={ Styles.projectDetail } >
        <View style={ Styles.info }>
          <Text style={ [Styles.title, Styles.whiteText] }>
            { project.title }
          </Text>
          <Text style={ [Styles.author, Styles.whiteText] }>
            Started by
            <Text style={ Styles.bold }> { project.owner[0].username }</Text>
          </Text>
          { this.renderNudgeStuff() }
          { this.renderUpdateButton() }
        </View>
        <View style={ Styles.container }>
          { project.status === 'active' && <FutureNote note={ futureNote }/> }
          <View style={ Styles.pastNotesView }>
            <Text style={ [Styles.finishedTitleText, Styles.bold] }>
              Completed
            </Text>
            { this.renderPastNotes(pastNotes) }
          </View>
        </View>
      </ScrollView>
    );
  }

}

export default ProjectDetail;