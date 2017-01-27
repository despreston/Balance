// Vendors
import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight, Modal } from 'react-native';
import { connect } from 'react-redux';

// Components
import { Styles } from './project-detail-style';
import Note from './note/note';
import EditNote from '../edit-note/edit-note';
import { saveNote } from '../../actions';

class ProjectDetail extends Component {
  static propTypes = {
    projectId: PropTypes.string.isRequired,
    project: PropTypes.object.isRequired,
    updateNote: PropTypes.func.isRequired
  }

  constructor (props) {
    super();
    this.state = { editModalVisible: false, note: {} };
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

  render () {
    const project = this.props.project;
    const notes = this.getNotesFromProject(project);
    return (
      <View style={Styles.projectDetail}>
        <Text style={Styles.title}>{project.title}</Text>
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
  return {
    project: state.projects.find(project => project._id === props.projectId)
  };
}

function mapDispatchToProps (dispatch) {
  return {
    updateNote: note => dispatch(saveNote(note))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetail);