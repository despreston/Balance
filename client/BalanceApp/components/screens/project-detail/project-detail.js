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
import AddUpdateContainer from '../../add-update/add-update-container';
import NudgeField from './nudge-field/nudge-field';
import Refresh from '../../refresh/refresh';

// utils
import emptyNote from '../../../utils/empty-note';

class ProjectDetail extends Component {

  static propTypes = {
    project: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      nudgeUsers: PropTypes.array,
      owner: PropTypes.array.isRequired
    }),
    nav: PropTypes.func.isRequired,
    notes: PropTypes.array,
    userIsOwner: PropTypes.bool,
    refreshing: PropTypes.bool.isRequired,
    onRefresh: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);

    this.state = { addUpdateVisible: false, refreshing: false };

    this.futureNotes = this.notesForType('Future');
    this.futureNote = this.getFutureNote();
    this.toggleAddUpdateModal = this.toggleAddUpdateModal.bind(this);
  }

  notesForType (type) {
    return this.props.notes.filter(note => note.type === type);
  }

  toggleAddUpdateModal () {
    this.setState({ addUpdateVisible: !this.state.addUpdateVisible });
  }

  goToAuthor () {
    this.props.nav('UserProfile', {
      userId: this.props.project.owner[0].userId
    });
  }

  getFutureNote () {
    const { project } = this.props;

    if (this.futureNotes.length > 0) {
      return this.futureNotes.reduce((latest, note) => {
        return note.lastUpdated.getTime() > latest.lastUpdated.getTime()
          ? note
          : latest;
      }, this.futureNotes[0]);
    }

    else if (project.Future) {
      return project.Future;
    }
    
    return emptyNote(project, 'Future');
  }

  renderPastNotes () {
    function selector (notes, project) {
      return Object.keys(notes)
        .map(id => notes[id])
        .filter(note => {
          return (
            project._id === note.project._id &&
            note.type === 'Past'
          );
        });
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
        showContext
        query={[{ project: this.props.project._id }, { type: 'Past' }]}
        selector={ notes => selector(notes, this.props.project) }
        showEdit={ status !== 'finished' && userIsOwner }
        onSelect={ id => nav('Note', { id }) }
      />
    );
  }

  renderNudgeStuff () {
    const { project, userIsOwner } = this.props;

    if (project.status !== 'active' || (userIsOwner && !project.nudgeUsers)) {
      return null;
    }

    return <NudgeField hideButton={ userIsOwner } project={ project } />;
  }

  render () {
    const { project, refreshing, saveNote, nav, userIsOwner } = this.props;

    const refreshProps = {
      refreshing,
      onRefresh: () => this.props.onRefresh(),
      tintColor: 'white',
      styles: Styles.purpleBackground
    };

    return (
      <ScrollView
        style={ Styles.projectDetail }
        keyboardShouldPersistTaps='handled'
        refreshControl={ <Refresh { ...refreshProps }/> }
      >
        <View style={[ Styles.whiteBackground, Styles.main ]}>
          <View style={[ Styles.purpleBackground, Styles.info ]}>
            <View>
              { project.status === 'finished' && <FinishedProjectText />}
              <Text style={ [Styles.title, Styles.whiteText] }>
                { project.title }
              </Text>
              <Text style={ [Styles.author, Styles.whiteText] }>
                Started by
                <Text
                  onPress={ () => this.goToAuthor() }
                  style={[ Styles.bold, { flex: 1 } ]}
                >
                  { ` ${project.owner[0].username}` }
                </Text>
              </Text>
            </View>
            <View style={ Styles.infoTextContainer }>
              <Text style={ [Styles.whiteText, Styles.description] }>
                {
                  project.description
                }
              </Text>
            </View>
            { userIsOwner && <UpdateButton press={ () => this.toggleAddUpdateModal() } /> }
          </View>
          { this.renderNudgeStuff() }
          <View style={ Styles.container }>
            {
              project.status === 'active' &&
              <FutureNote note={ this.futureNote }/>
            }
            <View style={ Styles.pastNotesView }>
              <Text style={ [Styles.finishedTitleText, Styles.bold] }>
                Completed
              </Text>
              { this.renderPastNotes() }
            </View>
          </View>
        </View>
        <AddUpdateContainer
          project={ project }
          visible={ this.state.addUpdateVisible }
          hideFn={ () => this.toggleAddUpdateModal() }
        />
      </ScrollView>
    );
  }

}

const FinishedProjectText = () => {
  return (
    <View>
      <Text style={ [Styles.finishedProjectText, Styles.bold, Styles.whiteText] }>
        This project has been marked as finished. {"\n"} Nice job! 🎉
      </Text>
    </View>
  );
};

const UpdateButton = ({ press }) => {
  return (
    <View style={ Styles.updateButtonContainer }>
      <TouchableOpacity
        onPress={ press }
        style={ Styles.updateButton }>
        <Text
          style={ [Styles.updateButtonText, Styles.bold, Styles.whiteText] }>
          Add an update
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProjectDetail;