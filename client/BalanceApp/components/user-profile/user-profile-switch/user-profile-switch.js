// vendors
import PropTypes from 'prop-types';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';

// styles
import Styles from '../profile-info/profile-info-styles';

class UserProfileSwitch extends Component {

  static propTypes = {
    userId: PropTypes.string.isRequired,
    switchContext: PropTypes.func.isRequired,
    selectedContext: PropTypes.string.isRequired,
    friendCount: PropTypes.number.isRequired,
    noteCount: PropTypes.number.isRequired,
    projectCount: PropTypes.number.isRequired
  }

  static mapStateToProps (state, ownProps) {
    const user = state.users[ownProps.userId];
    const projectCount = user.project_count || 0;

    const friendCount = user.friends.reduce((count, friend) => {
      return friend.status === 'accepted' ? count + 1 : count;
    }, 0);

    const noteCount = Object.keys(state.notes)
      .map(id => state.notes[id])
      .reduce((count, note) => {
        return note.author.userId === user.userId ? count + 1 : count;
      }, 0);

    return { friendCount, projectCount, noteCount };
  }

  constructor (props) {
    super(props);
  }

  handlePlural (singular, count) {
    return `${singular}${(count > 1 || count === 0)  ? 'S' : ''}`;
  }

  isSelected (context) {
    return context === this.props.selectedContext;
  }

  renderOption (value, label, count) {
    const textStyles = [
      Styles.contextOptionText,
      this.isSelected(value) && Styles.selectedContext
    ];

    return (
      <TouchableOpacity
          style={ Styles.contextOption }
          onPress={ () => this.props.switchContext(value) }>
        <View style={ this.isSelected(value) && Styles.border }>
          <Text style={[ textStyles, Styles.contextOptionCount ]}>{ count }</Text>
          <Text style={ textStyles }>{ label }</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render () {
    const { projectCount, friendCount, noteCount } = this.props;

    return (
      <View style={Styles.row}>
        { this.renderOption('latest', this.handlePlural('UPDATE', noteCount ), noteCount) }
        { this.renderOption('projects', this.handlePlural('PROJECT', projectCount), projectCount) }
        { this.renderOption('friends', this.handlePlural('FRIEND', friendCount), friendCount) }
      </View>
    );
  }

}

export default connect(UserProfileSwitch.mapStateToProps)(UserProfileSwitch);