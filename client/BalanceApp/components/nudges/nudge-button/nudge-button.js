import React, { Component, PropTypes } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';

// styles
import Style from './nudge-button-style';

function mapStateToProps (state, ownProps) {
  let fullProj = state.projects[ownProps.project];

  return {
    isSelected: fullProj.nudgeUsers.some(u => u.userId === state.loggedInUser)
  };
}

class NudgeBtn extends Component {

  static propTypes = {
    isSelected: PropTypes.bool.isRequired,
    project: PropTypes.string.isRequired
  };

  constructor (props) {
    super(props);

    this.state = { isSelected: props.isSelected };
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ isSelected: nextProps.isSelected });
  }

  renderButton () {
    let image = this.state.isSelected
      ? require('../../../assets/icons/nudge-filled.png')
      : require('../../../assets/icons/nudge.png');

    return <Image source={ image } style={ Style.image } />;
  }

  render () {
    return (
      <TouchableOpacity onPress={ () => null } style={ Style.touchable }>
        { this.renderButton() }
      </TouchableOpacity>
    );
  }

}

export default connect(mapStateToProps)(NudgeBtn);
