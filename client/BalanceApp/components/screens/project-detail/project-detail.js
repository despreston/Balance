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
import NavBtn from '../../navigation/nav-btn';

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
    updateNote: note => dispatch(saveNote(note)),
    requestNotes: params => dispatch(requestNotes(params)),
    invalidateProjects: () => dispatch(invalidate('projects'))
  };
}

class ProjectDetail extends Component {

  static propTypes = {
    updateNote: PropTypes.func.isRequired,
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
        <NavBtn
          title='Edit'
          onPress={ () => {
            navigate('EditProject', { project: state.params.project })
          } }
        />
      );

      return { right, ...defaultHeader };
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

  saveNote (note) {
    // If the project is new, dont save the note because then it won't be tied to
    // any project id. For now, the backend will handle saving new notes for new projects
    if (!this.props.project._new) {
      this.props.updateNote(note).then(() => this.props.invalidateProjects());
    }
  }

  emptyNote (type) {
    return {
      _new: true,
      user: this.props.project.user,
      project: this.props.project._id,
      content: '',
      type
    };
  }

  notesForType (type) {
    return this.props.notes.filter(note => note.type === type);
  }

  renderPastNotes (notes) {
    if (notes.length === 0) {
      return (
        <Text style={ Styles.emptyText }>
          Tap 'I did work' to add a new entry.
        </Text>
      );
    }

    // hide edit buttons if project is Finished
    if (this.props.project.status === 'finished') {
      return <NoteList notes={ notes } />;
    }

    return <NoteList notes={ notes } onEdit={ this.toggleEditNoteModal } />;
  }

  renderUpdateButtons () {
    const { project } = this.props;

    if (project.status === 'finished') {
      return (
        <View style={ Styles.updateButtonContainer }>
          <Text style={ [Styles.finishedProjectText, Styles.bold] }>
            This project has been marked as finished. {"\n"} Nice job! 🎉
          </Text>
        </View>
      );
    }

    return (
      <View style={ Styles.updateButtonContainer }>
        <TouchableOpacity
          onPress={ () => this.toggleEditNoteModal(this.emptyNote('Past')) }
          style={ Styles.updateButton }>
          <Text style={ [Styles.updateButtonText, Styles.bold] }>
            I did work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={ () => this.toggleEditNoteModal(this.emptyNote('Future')) }
          style={ Styles.updateButton }>
          <Text style={ [Styles.updateButtonText, Styles.bold] }>
            To do next
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderNudges () {
    const { navigate } = this.props.navigation;
    const { nudges, nudgeUsers } = this.props.project;

    if (nudges.length === 0) { return null; }

    const names = nudgeUsers.map((user, idx) => {
      const text = idx < nudgeUsers.length - 1 
        ? `${user.username},`
        : user.username;
      
      return (
        <Text
          key={ idx }
          onPress={ () => navigate('UserProfile', { userId: user.userId }) }
          style={ Styles.bold }>
          { text }
        </Text>
      );
    });

    return (
      <Text style={ Styles.nudgedText }>
        { names } nudged you for an update
      </Text>
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
      futureNote = this.emptyNote('Future');
    }

    return (
      <ScrollView style={ Styles.projectDetail }>
        <Text style={ Styles.title }>{ project.title }</Text>
        { project.status === 'active' && this.renderNudges() }
        <View style={ Styles.container }>
          { this.renderUpdateButtons() }
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
          onSave={ this.saveNote.bind(this) }
          onClose={ () => this.toggleEditNoteModal({}) }
          note={ this.state.note } />
      </ScrollView>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetail);