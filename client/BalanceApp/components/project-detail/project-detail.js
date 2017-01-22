// Vendors
import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight, Modal } from 'react-native';
import { connect } from 'react-redux';

// Components
import { Styles } from './project-detail-style';
import Note from './note/note';
import EditNote from '../edit-note/edit-note';
import { saveProject } from '../../actions';

class ProjectDetail extends Component {
  static propTypes = {
    projectId: PropTypes.string.isRequired,
    project: PropTypes.object.isRequired,
    updateProject: PropTypes.func.isRequired
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
    this.props.project[note.type] = note.text;
    this.props.updateProject(this.props.project);
  }

  render () {
    const project = this.props.project;
    return (
      <View style={Styles.projectDetail}>
        <Text style={Styles.title}>{project.title}</Text>
        <View style={Styles.updateButtonContainer}>
          <TouchableHighlight
            onPress={this.toggleEditNoteModal.bind(this, { text: null, type: 'previousNote' })}
            style={Styles.updateButton}>
            <Text style={Styles.updateButtonText}>I did work</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={this.toggleEditNoteModal.bind(this, { text: null, type: 'futureNote' })}
            style={Styles.updateButton}>
            <Text style={Styles.updateButtonText}>To do next</Text>
          </TouchableHighlight>
        </View>
        <View style={Styles.notesContainer}>
          <Note
            note={project.previousNote}
            header="Here's where you left off:"
            onEdit={this.toggleEditNoteModal.bind(this, { text: project.previousNote, type: 'previousNote' })} />
          <Note
            note={project.futureNote}
            header="To do next:"
            onEdit={this.toggleEditNoteModal.bind(this, {text: project.futureNote, type: 'futureNote'})}/>
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
    updateProject: project => dispatch(saveProject(project))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetail);