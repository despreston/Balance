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

    this.Past = props.project.Past;
    this.Future = props.project.Future;
    this.status = props.project.status;
    this.nudgeUsers = props.project.nudgeUsers;
    this.lastUpdated = this.getLastUpdated();
  }

  getLastUpdated () {
    if (this.Past && this.Future) {
      return this.Past.lastUpdated.getTime() > this.Future.lastUpdated.getTime()
        ? this.Past.lastUpdated
        : Future.lastUpdated;
    } else if (this.Past) {
      return this.Past.lastUpdated;
    } else if (this.Future) {
      return this.Future.lastUpdated;
    }
  }

  renderNote () {
    if (this.status === 'finished') {
      return (
        <Text style={ Style.message }>
          This project is finished!
        </Text>
      );
    }

    if (this.Future) {
      return (
        <Text style={ Style.note } numberOfLines={ 2 }>
          { this.Future.content }
        </Text>
      )
    }

    if (this.props.hideNudgeBtn) {
      return <EmptyState addNote={ () => this.toggleAddUpdateModal() } />
    }

    return <EmptyState />;
  }

  renderNudgeUsers () {
    if (this.nudgeUsers && this.nudgeUsers.length > 0) {
      return <Nudges nudgeUsers={ this.nudgeUsers } linkToUpdate={ true }/>
    }

    return null;
  }

  renderNudgeBtn () {
    if (this.props.hideNudgeBtn || this.status === 'finished') {
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
    if (!this.lastUpdated || this.status !== 'active') {
      return <View style={{ width: 10 }} />;
    }

    return <StatusIcon lastUpdated={ this.lastUpdated } />;
  }

  renderUpdateButton () {
    if (this.status !== 'active' || !this.props.hideNudgeBtn) {
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