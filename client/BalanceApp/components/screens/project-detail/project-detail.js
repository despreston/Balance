// Vendors
import React, { Component, PropTypes } from 'react';
import {
  ScrollView,
  View,
  Text,
  Modal,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';

// styles
import { Styles } from './project-detail-style';

// Components
import EditNote from '../../edit-note/edit-note';
import FutureNote from './future-note/future-note';
import NoteList from '../../note-list/note-list';
import Nudges from '../../nudges/nudges';
import Icon from '../../navigation/icon';

// utils
import emptyNote from '../../../utils/empty-note';

// actions
import { saveNote, requestNotes, invalidate } from '../../../actions';

function mapStateToProps (state, { navigation }) {
  // notes for selected project
  const notes = Object.keys(state.notes)
    .map(id => state.notes[id])
    .filter(note => {
      return note.project._id === navigation.state.params.project;
    });

  return {
    project: state.projects[navigation.state.params.project],
    notes
  };

}

function mapDispatchToProps (dispatch) {
  return {
    saveNote: note => dispatch(saveNote(note)),
    requestNotes: params => dispatch(requestNotes(params)),
    invalidateProjects: () => dispatch(invalidate('projects'))
  };
}

class ProjectDetail extends Component {

  static propTypes = {
    saveNote: PropTypes.func.isRequired,
    project: PropTypes.shape({
      title: PropTypes.string.isRequired
    }),
    notes: PropTypes.array,
    requestNotes: PropTypes.func.isRequired,
    invalidateProjects: PropTypes.func.isRequired
  };

  static navigationOptions = {
    header: ({ goBack, dispatch, state, navigate }, defaultHeader) => {

      const right = (
        <Icon
          imagePath={ require('../../../assets/icons/edit-white.png') }
          onPress={ () => {
            navigate('EditProject', { project: state.params.project })
          }} />
      );

      return { ...defaultHeader, right };
    }
  };

  constructor (props) {
    super(props);

    this.state = {
      editModalVisible: false,
      note: {},
      invalid: false
    };
  }

  componentDidMount () {
    if (this.props.project._id) {
      this.props.requestNotes([
        { project: this.props.project._id },
        { type: 'Past' }
      ]);
    }
  }

  toggleEditNoteModal = (note) => {
    this.setState({
      editModalVisible: !this.state.editModalVisible,
      note: note
    });
  }

  saveNoteAndInvalidate (note) {
    this.props.saveNote(note).then(() => this.props.invalidateProjects());
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

    const nav = this.props.navigation.navigate;

    // hide edit buttons if project is Finished
    if (this.props.project.status === 'finished') {
      return <NoteList notes={ notes } onSelect={ id => nav('Note', { id }) } />;
    }

    return (
      <NoteList
        onSelect={ id => nav('Note', { id }) }
        notes={ notes }
        onEdit={ this.toggleEditNoteModal } />
    );
  }

  renderUpdateButtons () {
    const { project } = this.props;

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
          onPress={ () => {
            return this.toggleEditNoteModal(emptyNote(project, 'Future')) }
          }
          style={ Styles.updateButton }>
          <Text
            style={ [Styles.updateButtonText, Styles.bold, Styles.whiteText] }>
            Add an update
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderNudges () {
    const { nudgeUsers } = this.props.project;

    if (!nudgeUsers || nudgeUsers.length === 0) { return null; }

    return (
      <Nudges
        nudgeUsers={ nudgeUsers }
        imageSize={ 30 }
        textStyle={ Styles.whiteText } />
    );
  }

  render () {
    const { project } = this.props;

    /**
     * project could be null if project is deleted, b/c of the way the
     * navigator works.
     */
    if (!project) { return null; }

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
            <Text style={ Styles.bold }> Des</Text>
          </Text>
          { project.status === 'active' && this.renderNudges() }
          { this.renderUpdateButtons() }
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
        <EditNote
          style={ Styles.editNoteModal }
          visible={ this.state.editModalVisible }
          onSave={ this.saveNoteAndInvalidate.bind(this) }
          onClose={ () => this.toggleEditNoteModal({}) }
          note={ this.state.note } />
      </ScrollView>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetail);