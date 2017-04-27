// Vendors
import React, { Component, PropTypes } from 'react';
import {
  ScrollView,
  View,
  Text
} from 'react-native';

// styles
import { Styles } from './project-detail-style';

// Components
import NoteListContainer from '../../note-list/note-list-container';
import AddUpdateContainer from '../../add-update/add-update-container';
import NudgeField from './nudge-field/nudge-field';
import Refresh from '../../refresh/refresh';
import UpdateButton from './update-button/update-button';

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
    userIsOwner: PropTypes.bool,
    refreshing: PropTypes.bool.isRequired,
    onRefresh: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);

    this.state = { addUpdateVisible: false, refreshing: false };

    this.toggleAddUpdateModal = this.toggleAddUpdateModal.bind(this);
  }

  toggleAddUpdateModal () {
    this.setState({ addUpdateVisible: !this.state.addUpdateVisible });
  }

  goToAuthor () {
    this.props.nav('UserProfile', {
      userId: this.props.project.owner[0].userId
    });
  }

  notesSelector (type) {
    return (notes, project) => {
      return Object.keys(notes)
        .map(id => notes[id])
        .filter(note => {
          return (
            project._id === note.project._id &&
            note.type === type
          );
        });
    }
  }

  renderPastNotes () {
    const {
      nav,
      status,
      userIsOwner
    } = this.props;

    // hide edit buttons if project is Finished OR user is not the owner
    return (
      <NoteListContainer
        showContext
        emptyState={ <EmptyCompletedNotes /> }
        query={[{ project: this.props.project._id }, { type: 'Past' }]}
        selector={ notes => this.notesSelector('Past')(notes, this.props.project) }
        showEdit={ status !== 'finished' && userIsOwner }
        onSelect={ id => nav('Note', { id }) }
      />
    );
  }

  renderFutureNotes () {
    const {
      nav,
      status,
      userIsOwner
    } = this.props;

    // hide edit buttons if project is Finished OR user is not the owner
    return (
      <View>
        <Text style={ [Styles.finishedTitleText, Styles.bold] }>
          Next
        </Text>
        <NoteListContainer
          emptyState={ <EmptyCompletedNotes /> }
          query={[{ project: this.props.project._id }, { type: 'Future' }]}
          selector={ notes => this.notesSelector('Future')(notes, this.props.project) }
          showEdit={ status !== 'finished' && userIsOwner }
          onSelect={ id => nav('Note', { id }) }
        />
      </View>
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
    const { project, refreshing, userIsOwner } = this.props;

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
                { project.description }
              </Text>
            </View>
            { 
              userIsOwner && project.status !== 'finished' && 
              <UpdateButton press={ () => this.toggleAddUpdateModal() } /> 
            }
          </View>
          { this.renderNudgeStuff() }
          <View style={ Styles.container }>
            {
              project.status === 'active' &&
              this.renderFutureNotes()
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
        This project has been finished!  🎉
      </Text>
    </View>
  );
};

const EmptyCompletedNotes = () => {
  return (
    <Text style={ Styles.emptyText }>No work has been done for this project.</Text>
  )
}

export default ProjectDetail;