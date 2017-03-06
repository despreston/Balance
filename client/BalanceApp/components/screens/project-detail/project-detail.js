// Vendors
import React, { Component, PropTypes } from 'react';
import {
  ScrollView,
  View,
  Text,
  Button,
  Modal,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import dismissKeyboard from 'dismissKeyboard';

// styles
import { Styles } from './project-detail-style';

// Components
import EditNote from '../../edit-note/edit-note';
import FutureNote from './future-note/future-note';
import NoteList from '../../note-list/note-list';
import NavBtn from '../../navigation/nav-btn';

// actions
import {
  saveNote,
  saveProject,
  requestNotes,
  invalidate
} from '../../../actions';

function mapStateToProps (state, { navigation }) {
  return {
    project: state.projects[navigation.state.params.project],
    notes: state.notes
  };
}

function mapDispatchToProps (dispatch) {

  return {
    updateNote: note => dispatch(saveNote(note)),
    updateProject: project => dispatch(saveProject(project)),
    requestNotes: params => dispatch(requestNotes(params)),
    invalidateProjects: () => dispatch(invalidate('projects'))
  };
}

class ProjectDetail extends Component {

  static propTypes = {
    updateNote: PropTypes.func.isRequired,
    updateProject: PropTypes.func.isRequired,
    project: PropTypes.shape({
      title: PropTypes.string.isRequired
    }),
    requestNotes: PropTypes.func.isRequired,
    invalidateProjects: PropTypes.func.isRequired
  };

  static navigationOptions = {
    header: ({ goBack, dispatch, state, navigate }, defaultHeader) => {

      const right = (
        <NavBtn
          title='Edit'
          onPress={() => {
            navigate('EditProject', { project: state.params.project })
          }}
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
      projectTitle: props.project.title,
      invalid: false
    };
  }

  componentDidMount () {
    // Set focus to project title when its a new project
    if (this.props.project._id) {
      this.props.requestNotes([
        { project: this.props.project._id },
        { type: 'Past' }
      ]);
    }

    // https://github.com/react-community/react-navigation/issues/160#issuecomment-277349900
    setTimeout(() => this.props.navigation.setParams({
      saveProject: () => this.saveProject()
    }), 500);
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
    const { notes } = this.props;
    let notesWithType = [];

    Object.keys(notes).forEach(id => {
      if (notes[id].type === type) {
        notesWithType.push(notes[id]);
      }
    });

    return notesWithType;
  }

  // Handle any form validation before saving
  saveProject () {
    this.props.project.title = this.state.projectTitle;
    
    // Empty project title
    if (!this.props.project.title || this.props.project.title === '') {
      this.setState({ invalid: true });
      this.projectTitle.focus();
      return;
    }

    this.props.updateProject(this.props.project).then(() => {
      this.props.invalidateProjects();
      this.props.navigation.goBack();
    });
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
      <ScrollView style={Styles.projectDetail}>
        <Text style={Styles.title} >{project.title}</Text>
        <TouchableWithoutFeedback onPress={() => dismissKeyboard()}>
          <View style={Styles.container}>
            <View style={Styles.updateButtonContainer}>
              <TouchableOpacity
                onPress={() => this.toggleEditNoteModal(this.emptyNote('Past'))}
                style={Styles.updateButton}>
                <Text style={Styles.updateButtonText}>I did work</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.toggleEditNoteModal(this.emptyNote('Future'))}
                style={Styles.updateButton}>
                <Text style={Styles.updateButtonText}>To do next</Text>
              </TouchableOpacity>
            </View>
            <FutureNote note={futureNote}/>
            <View style={Styles.pastNotesView}>
              <Text style={Styles.finishedTitleText}>Completed</Text>
              <NoteList notes={pastNotes} onEdit={this.toggleEditNoteModal}/>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <EditNote
          style={Styles.editNoteModal}
          visible={this.state.editModalVisible}
          onSave={this.saveNote.bind(this)}
          onClose={() => this.toggleEditNoteModal({})}
          note={this.state.note} />
      </ScrollView>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetail);