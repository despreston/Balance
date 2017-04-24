// Vendors
import React, { Component, PropTypes } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

// Components
import StatusIcon from '../../status-icon/StatusIcon';
import Nudges from '../../nudges/nudges';
import NudgeBtn from '../../nudges/nudge-button/nudge-button';
import UpdateIcon from './update-icon/update-icon';
import AddUpdateContainer from '../../add-update/add-update-container';

// styles
import { Style } from './project-list-item-style';

// utils
import { formatDate } from '../../../utils/helpers';

class ProjectListItem extends Component {

  static propTypes = {
    project: PropTypes.object.isRequired,
    hideNudgeBtn: PropTypes.bool
  }

  constructor (props) {
    super(props);

    this.state = { addUpdateVisible: false };
    this.lastUpdated = this.getLastUpdated(props.project);
  }

  componentWillReceiveProps (nextProps) {
    this.lastUpdated = this.getLastUpdated(nextProps.project);
  }

  getLastUpdated (project) {
    const { Past, Future } = project;

    if (Past && Future) {
      return Past.lastUpdated.getTime() > Future.lastUpdated.getTime()
        ? Past.lastUpdated
        : Future.lastUpdated;
    } else if (Past) {
      return Past.lastUpdated;
    } else if (Future) {
      return Future.lastUpdated;
    }
  }

  renderNote () {
    const { Future, status } = this.props.project;

    if (status === 'finished') {
      return (
        <Text style={ Style.message }>
          This project is finished!
        </Text>
      );
    }

    if (Future) {
      return (
        <Text style={ Style.note } numberOfLines={ 2 }>
          { Future.content }
        </Text>
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
      return <Nudges nudgeUsers={ nudgeUsers } linkToUpdate={ true }/>
    }

    return null;
  }

  renderNudgeBtn () {
    if (this.props.hideNudgeBtn || this.props.project.status === 'finished') {
      return <View />;
    }

    return <NudgeBtn style={ Style.nudgeBtn } project={ this.props.project._id } />;
  }

  renderUpdatedAt () {
    if (!this.lastUpdated) {
      return null;
    }

    return (
      <Text style={ Style.text }>Updated { formatDate(this.lastUpdated) }</Text>
    );
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
    return (
      <View style={ Style.projectListItem }>
        <View style={ Style.content }>
          <View>
            <Text style={ Style.title }>{ this.props.project.title }</Text>
            { this.renderUpdatedAt() }
          </View>
          { this.renderNote() }
          <View style={ Style.footer }>
            <View style={ Style.footerIcons }>
              { this.renderNudgeBtn() }
              { this.renderUpdateButton() }
            </View>
            { this.renderNudgeUsers() }
          </View>
        </View>
        { this.renderStatusIcon() }

        <AddUpdateContainer
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
        Nothing planned for this project.
      </Text>
      {
        addNote &&
        <TouchableOpacity onPress={ addNote } style={ Style.addNoteMessage }>
          <Text style={[ Style.message, Style.bold ]}>
            Add a note
          </Text>
        </TouchableOpacity>
      }
    </View>
  );
};

export default ProjectListItem;