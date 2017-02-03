// Vendors
import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  Button,
  Modal,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import dismissKeyboard from 'dismissKeyboard';
import { get } from 'lodash';

// Components
import { Styles } from './project-detail-style';
import { styles as NavStyles } from '../navigation/navigation-styles';
import Note from './note/note';
import EditNote from '../edit-note/edit-note';
import { fetchProjects, saveNote, saveProject } from '../../actions';

function mapStateToProps (state, props) {
  return { project: state.open_project };
}

function mapDispatchToProps (dispatch) {
  return {
    dispatch,
    updateNote: note => dispatch(saveNote(note)),
    updateProject: project => dispatch(saveProject(project))
  };
}

class ProjectDetail extends Component {
  static propTypes = {
    updateNote: PropTypes.func.isRequired,
    updateProject: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    project: PropTypes.shape({
      title: PropTypes.string.isRequired
    }).isRequired
  };

  static navigationOptions = {
    header: ({ goBack, dispatch, state }) => {
      const projectId = get(state, 'params.projectId');
      const title = <Text style={[NavStyles.text, NavStyles.title]}>Details</Text>;
      const style = { backgroundColor: '#333' };
      const left = (
        <Button
          color='#FFFFFF'
          style={[NavStyles.button, NavStyles.text, { fontWeight: 'normal' }]}
          title={projectId ? 'Back' : 'Cancel'}
          onPress={() => state.params.onBack()}
        />
      );
      const right = projectId
        ? (<View />)
        : (<Button
            color='#FFFFFF'
            style={[NavStyles.button, NavStyles.text, { fontWeight: 'normal' }]}
            title='Save'
            onPress={() => state.params.updateProject()}
          />);

      return { title, style, left, right };
    }
  };

  constructor (props) {
    super(props);
    this.state = {
      editModalVisible: false,
      note: {},
      projectTitle: props.project.title
    };
  }

  componentDidMount () {
    // Set focus to project title when its a new project
    if (!this.props.project.title) {
      this.projectTitle.focus();
    }

    // https://github.com/react-community/react-navigation/issues/160#issuecomment-277349900
    setTimeout(() => this.props.navigation.setParams({
      onBack: this.onBack.bind(this),
      updateProject: () => this.props.updateProject(this.props.project)
    }), 500);
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
      type
    };
  }

  onBack () {
    // Reload the projects from the server. They may have changed
    this.props.dispatch(fetchProjects());
    this.props.navigation.goBack();
  }

  getNotesFromProject (project) {
    let notes = { Future: {}, Past: {} };
    notes.Future = project.Future || this.emptyNote('Future');
    notes.Past = project.Past || this.emptyNote('Past');
    return notes;
  }

  onProjectTitleBlur () {
    // dirty check and project is not new
    if ((this.state.projectTitle !== this.props.project.title) || this.props.project._new) {
      this.props.project.title = this.state.projectTitle;
      if (!this.props.project._new) {
        this.props.updateProject(this.props.project);
      }
    }
  }

  render () {
    const notes = this.getNotesFromProject(this.props.project);
    return (
      <View style={Styles.projectDetail}>
        <TextInput
          ref={input => this.projectTitle = input}
          value={this.state.projectTitle}
          style={Styles.title}
          onBlur={this.onProjectTitleBlur.bind(this)}
          onChangeText={text => this.setState({ projectTitle: text })} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetail);