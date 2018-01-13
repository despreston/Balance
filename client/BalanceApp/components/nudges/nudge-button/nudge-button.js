import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import actions from '../../../actions/';
import Style from './nudge-button-style';

class NudgeBtn extends Component {

  static propTypes = {
    project: PropTypes.object.isRequired
  };

  static mapStateToProps ({ loggedInUser: user }) {
    return { user };
  }

  constructor (props) {
    super(props);
    this.state = { isSelected: this.isSelected(props.project, props.user) };
  }

  isSelected (project, user) {
    return project.nudgeUsers
      ? project.nudgeUsers.some(u => u.userId === user)
      : false;
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      isSelected: this.isSelected(nextProps.project, nextProps.user)
    });
  }

  renderButton () {
    let image;

    if (this.state.isSelected) {
      image = require('../../../assets/icons/nudge-filled.png');
    } else {
      image = require('../../../assets/icons/nudge.png');
    }

    return <Image source={ image } style={ Style.image } />;
  }

  toggleNudge () {
    const { dispatch, project, user } = this.props;

    if (this.state.isSelected) {
      dispatch(actions.removeNudge(project._id, user));
    } else {
      dispatch(actions.nudge(project._id));
    }

    this.setState({ isSelected: !this.state.isSelected });
  }

  renderText () {
    if (this.props.showText) {
      return this.state.isSelected
        ? <Text style={ Style.text }>You nudged for an update</Text>
        : <Text style={ Style.text }>Send a nudge to encourage an update</Text>
    }

    return null;
  }

  render () {
    return (
      <View style={ Style.container }>
        { this.renderText() }
        <TouchableOpacity
          onPress={ () => this.toggleNudge() }
          style={ Style.touchable }>
            { this.renderButton() }
        </TouchableOpacity>
      </View>
    );
  }

}

export default connect(NudgeBtn.mapStateToProps)(NudgeBtn);
