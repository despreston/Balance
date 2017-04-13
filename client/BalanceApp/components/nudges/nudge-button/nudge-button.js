import React, { Component, PropTypes } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image
} from 'react-native';
import { connect } from 'react-redux';

// actions
import actions from '../../../actions/';
// import { nudge, removeNudge } from '../../../actions';

// styles
import Style from './nudge-button-style';

function mapStateToProps ({ projects, loggedInUser }, ownProps) {
  let fullProj = projects[ownProps.project];

  let isSelected = fullProj.nudgeUsers
    ? fullProj.nudgeUsers.some(u => u.userId === loggedInUser)
    : false;

  return { user: loggedInUser, isSelected };
}

class NudgeBtn extends Component {

  static propTypes = {
    isSelected: PropTypes.bool.isRequired,
    project: PropTypes.string.isRequired,
    removeNudge: PropTypes.func.isRequired,
    useWhite: PropTypes.bool
  };

  constructor (props) {
    super(props);

    this.state = { isSelected: props.isSelected };
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ isSelected: nextProps.isSelected });
  }

  renderButton () {
    let image;

    if (this.state.isSelected) {
      image = require('../../../assets/icons/nudge-filled.png');
    } else {
      image = this.props.useWhite
        ? require('../../../assets/icons/nudge-white.png')
        : require('../../../assets/icons/nudge.png');
    }

    return <Image source={ image } style={ Style.image } />;
  }

  toggleNudge () {
    const { dispatch, project, user } = this.props;

    if (this.state.isSelected) {
      dispatch(actions.removeNudge(project, user));
    } else {
      dispatch(actions.nudge(project));
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

export default connect(mapStateToProps)(NudgeBtn);
