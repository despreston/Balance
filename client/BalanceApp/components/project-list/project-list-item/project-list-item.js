import React, { Component, PropTypes } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { connect } from 'react-redux';
import StatusIcon from '../../status-icon/StatusIcon';
import Nudges from '../../nudges/nudges';
import NudgeBtn from '../../nudges/nudge-button/nudge-button';
import UpdateIcon from './update-icon/update-icon';
import AddUpdateContainer from '../../add-update/add-update-container';
import { Style } from './project-list-item-style';

class ProjectListItem extends Component {

  static mapStateToProps (state, props) {
    let mostRecentPastNote = null;

    let notesForProject = Object.keys(state.notes)
      .map(id => state.notes[id])
      .filter(note => {
        return note.project._id === props.project._id && note.type === 'Past';
      });

    if (notesForProject.length > 0) {
      notesForProject.sort((a, b) => {
        return a.lastUpdated.getTime() - b.lastUpdated.getTime();
      });
      mostRecentPastNote = notesForProject.pop();
    }

    return { mostRecentPastNote };
  }

  static propTypes = {
    project: PropTypes.object.isRequired,
    hideNudgeBtn: PropTypes.bool,
    mostRecentPastNote: PropTypes.object
  }

  constructor (props) {
    super(props);
    this.state = { addUpdateVisible: false };
    this.lastUpdated = this.getLastUpdated(props.mostRecentPastNote);
  }

  componentWillReceiveProps (nextProps) {
    this.lastUpdated = this.getLastUpdated(nextProps.mostRecentPastNote);
  }

  getLastUpdated (note) {
    return note ? note.lastUpdated : null;
  }

  renderNote () {
    if (this.props.project.status === 'finished') {
      return (
        <Text style={ Style.message }>
          This project is finished!
        </Text>
      );
    }

    if (this.props.mostRecentPastNote) {
      return (
        <View>
          <Text style={ Style.text }>LATEST COMPLETED</Text>
          <Text style={ Style.note } numberOfLines={ 2 }>
            { this.props.mostRecentPastNote.content }
          </Text>
        </View>
      )
    }

    if (this.props.hideNudgeBtn) {
      return <EmptyState addNote={ () => this.toggleAddUpdateModal() } />
    }

    return <EmptyState />;
  }

  renderNudgeUsers () {
    const { nudgeUsers } = this.props.project;

    if (nudgeUsers && nudgeUsers.length > 0) {
      return <Nudges nudgeUsers={ nudgeUsers } />
    }

    return null;
  }

  renderNudgeBtn () {
    if (this.props.hideNudgeBtn || this.props.project.status === 'finished') {
      return null;
    }

    return <NudgeBtn project={ this.props.project } />;
  }

  renderStatusIcon () {
    if (!this.lastUpdated || this.props.project.status !== 'active') {
      return <View style={{ width: 10 }} />;
    }

    return <StatusIcon lastUpdated={ this.lastUpdated } />;
  }

  renderUpdateButton () {
    if (this.props.project.status !== 'active' || !this.props.hideNudgeBtn) {
      return null;
    }

    return <UpdateIcon project={ this.props.project } />;
  }

  toggleAddUpdateModal () {
    this.setState({ addUpdateVisible: !this.state.addUpdateVisible });
  }

  render () {
    const footerStyle = [
      Style.footer,
      (this.props.project.status !== 'finished' ? Style.borderTop : null)
    ];

    return (
      <View style={ Style.projectListItem }>
        <View style={ Style.content }>
          <Text style={ Style.title }>{ this.props.project.title }</Text>
          { this.renderNote() }
          <View style={ footerStyle }>
            <View style={ Style.footerIcons }>
              { this.renderNudgeBtn() }
              { this.renderUpdateButton() }
            </View>
            { this.renderNudgeUsers() }
          </View>
        </View>
        { this.renderStatusIcon() }
        <AddUpdateContainer
          isNew
          reloadProject={ true }
          project={ this.props.project }
          visible={ this.state.addUpdateVisible }
          hideFn={ () => this.toggleAddUpdateModal() }
        />
      </View>
    );
  }
}

const EmptyState = ({ addNote }) => {
  return (
    <View>
      <Text style={ Style.message }>
        Nothing done for this project
      </Text>
      {
        addNote &&
        <TouchableOpacity onPress={ addNote } style={ Style.addNoteMessage }>
          <Text style={[ Style.message, Style.bold ]}>
            Add an update
          </Text>
        </TouchableOpacity>
      }
    </View>
  );
};

export default connect(ProjectListItem.mapStateToProps)(ProjectListItem);
