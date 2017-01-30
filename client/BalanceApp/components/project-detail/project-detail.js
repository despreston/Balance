// Vendors
import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  Modal,
  TextInput,
  TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import dismissKeyboard from 'dismissKeyboard';

// Components
import { Styles } from './project-detail-style';
import { styles as NavStyles } from '../navigation/navigation-styles';
import Note from './note/note';
import EditNote from '../edit-note/edit-note';
import { fetchProjects, saveNote, saveProject } from '../../actions';

function onBackPress (back, dispatch) {
  // Reload the projects from the server. They may have changed
  dispatch(fetchProjects());
  back();
}

class ProjectDetail extends Component {
  static propTypes = {
    project: PropTypes.object.isRequired,
    updateNote: PropTypes.func.isRequired,
    updateProject: PropTypes.func.isRequired
  }

  static navigationOptions = {
    title: <Text style={[NavStyles.text, NavStyles.title]}>Details</Text>,
    header: ({ goBack, dispatch }) => ({
      style: { backgroundColor: '#333'},
      left: (
        <TouchableHighlight onPress={onBackPress.bind(this, goBack, dispatch)}>
          <Text style={[NavStyles.button, NavStyles.text, { fontWeight: 'normal' } ]}>Back</Text>
        </TouchableHighlight>
      ),
      right: null
    })
  }

  constructor (props) {
    super();
    this.state = {
      editModalVisible: false,
      note: {},
      projectTitle: props.project.title
    };
  }

  toggleEditNoteModal = (note) => {
    this.setState({
      editModalVisible: !this.state.editModalVisible,
      note: note
    });
  }

  saveNote (note) {
    this.props.project[note.type] = note;
    this.props.updateNote(note);
  }

  emptyNote (type) {
    return {
      _new: true,
      user: this.props.project.user,
      project: this.props.project._id,
      content: '',
      type: type
    };
  }

  getNotesFromProject (project) {
    let notes = { Future: {}, Past: {} };
    notes.Future = project.Future ? project.Future : this.emptyNote('Future');
    notes.Past = project.Past ? project.Past : this.emptyNote('Past');
    return notes;
  }

  onProjectTitleBlur () {
    // dirty check
    if (this.state.projectTitle !== this.props.project.title) {
      this.props.project.title = this.state.projectTitle;
      this.props.updateProject(this.props.project);
    }
  }

  render () {
    const notes = this.getNotesFromProject(this.props.project);
    return (
      <View style={Styles.projectDetail}>
        <TextInput
          value={this.state.projectTitle}
          style={Styles.title}
          onBlur={this.onProjectTitleBlur.bind(this)}
          onChangeText={text => this.setState({ projectTitle: text }) } />
        <TouchableWithoutFeedback onPress={() => dismissKeyboard()}>
          <View style={Styles.container}>
            <View style={Styles.updateButtonContainer}>
              <TouchableHighlight
                onPress={this.toggleEditNoteModal.bind(this, this.emptyNote('Past'))}
                style={Styles.updateButton}>
                <Text style={Styles.updateButtonText}>I did work</Text>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={this.toggleEditNoteModal.bind(this, this.emptyNote('Future'))}
                style={Styles.updateButton}>
                <Text style={Styles.updateButtonText}>To do next</Text>
              </TouchableHighlight>
            </View>
            <View style={Styles.notesContainer}>
              <Note
                content={notes.Past.content}
                header="Here's where you left off:"
                onEdit={this.toggleEditNoteModal.bind(this, notes.Past)} />
              <Note
                content={notes.Future.content}
                header="To do next:"
                onEdit={this.toggleEditNoteModal.bind(this, notes.Future)} />
            </View>
          </View>
        </TouchableWithoutFeedback>
        <EditNote
          style={Styles.editNoteModal}
          visible={this.state.editModalVisible}
          onSave={this.saveNote.bind(this)}
          onClose={this.toggleEditNoteModal.bind(this, {})}
          note={this.state.note} />
      </View>
    );
  }
}

function mapStateToProps (state, props) {
  const projectId = props.navigation.state.params.projectId;
  return {
    project: state.projects.find(project => project._id === projectId)
  };
}

function mapDispatchToProps (dispatch) {
  return {
    updateNote: note => dispatch(saveNote(note)),
    updateProject: project => dispatch(saveProject(project))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetail);