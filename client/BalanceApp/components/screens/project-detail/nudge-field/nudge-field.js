import PropTypes from 'prop-types';
import React, { Component } from 'react';
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
          Tell { owner[0].username } you want an update
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
            (<View style={ Styles.center }>
              <NudgeBtn project={ this.props.project } />
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
