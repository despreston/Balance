// Vendors
import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight, Modal } from 'react-native';

// Components
import { Styles } from './project-detail-style';
import Note from './note/note';
import EditNote from '../edit-note/edit-note';

export default class ProjectDetail extends Component {
  static propTypes = {
    project: PropTypes.object.isRequired
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

  render () {
    const project = this.props.project;
    return (
      <View style={Styles.projectDetail}>
        <Text style={Styles.title}>{project.title}</Text>
        <View style={Styles.updateButtonContainer}>
          <TouchableHighlight
            onPress={this.toggleEditNoteModal.bind(this, { text: null, type: 'future' })}
            style={Styles.updateButton}>
            <Text style={Styles.updateButtonText}>I did work</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={this.toggleEditNoteModal.bind(this, { text: null, type: 'previous' })}
            style={Styles.updateButton}>
            <Text style={Styles.updateButtonText}>To do next</Text>
          </TouchableHighlight>
        </View>
        <View style={Styles.notesContainer}>
          <Note
            note={project.previousNote}
            header="Here's where you left off:"
            onEdit={this.toggleEditNoteModal.bind(this, { text: project.previousNote, type: 'previous' })} />
          <Note
            note={project.futureNote}
            header="To do next:"
            onEdit={this.toggleEditNoteModal.bind(this, {text: project.futureNote, type: 'future'})}/>
        </View>
        <EditNote
          style={Styles.editNoteModal}
          visible={this.state.editModalVisible}
          onClose={this.toggleEditNoteModal.bind(this, {})}
          note={this.state.note} />
      </View>
    );
  }
}