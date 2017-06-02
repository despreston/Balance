import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
import Styles from './nudge-field-styles';
import NudgeBtn from '../../../nudges/nudge-button/nudge-button';
import Nudges from '../../../nudges/nudges';

export default class NudgeField extends Component {

  static propTypes = {
    project: PropTypes.object.isRequired,
    hideButton: PropTypes.bool.isRequired
  }

  constructor (props) {
    super(props);
  }

  renderNudges () {
    let { nudgeUsers, owner } = this.props.project;

    if (!nudgeUsers || nudgeUsers.length === 0) {
      return (
        <Text style={ Styles.emptyText }>
          Send a nudge to let { owner[0].username } know you want an update.
        </Text>
      );
    }

    return (
      <Nudges
        nudgeUsers={ nudgeUsers }
        imageSize={ 30 }
        textStyle={ Styles.whiteText }
      />
    );
  }

  render () {
    return (
      <View style={ Styles.container }>
        <View style={ Styles.content }>
          {
            !this.props.hideButton &&
            (<View style={ Styles.button }>
              <NudgeBtn project={ this.props.project._id } />
            </View>)
          }
          <View style={(this.props.hideButton && Styles.center)}>
            { this.renderNudges() }
          </View>
        </View>
      </View>
    );
  }
}