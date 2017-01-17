// Vendors
import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

// Components
import { Styles } from './project-detail-style';
import Note from './note/note';

export default class ProjectDetail extends Component {
  static propTypes = {
    project: PropTypes.object.isRequired
  }

  constructor (props) {
    super()
  }

  render () {
    const project = this.props.project;
    return (
      <View style={Styles.projectDetail}>
        <Text style={Styles.title}>{project.title}</Text>
        <View style={Styles.updateButtonContainer}>
          <TouchableHighlight style={Styles.updateButton}>
            <Text style={Styles.updateButtonText}>I did work</Text>
          </TouchableHighlight>
          <TouchableHighlight style={Styles.updateButton}>
            <Text style={Styles.updateButtonText}>To do next</Text>
          </TouchableHighlight>
        </View>
        <View style={Styles.notesContainer}>
          <Note note={project.previousNote} header="Here's where you left off:" />
          <Note note={project.futureNote} header="To do next:" />
        </View>
      </View>
    );
  }
}