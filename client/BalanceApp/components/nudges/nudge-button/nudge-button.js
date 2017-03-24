import React, { Component, PropTypes } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';

// actions
import { nudge, removeNudge } from '../../../actions';

// styles
import Style from './nudge-button-style';

function mapStateToProps (state, ownProps) {
  let fullProj = state.projects[ownProps.project];

  return {
    user: state.loggedInUser,
    isSelected: fullProj.nudgeUsers.some(u => u.userId === state.loggedInUser)
  };
}

const mapDispatchToProps = {
  nudge,
  removeNudge
};

class NudgeBtn extends Component {

  static propTypes = {
    isSelected: PropTypes.bool.isRequired,
    project: PropTypes.string.isRequired,
    removeNudge: PropTypes.func.isRequired,
    nudge: PropTypes.func.isRequired
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

  toggleNudge () {
    const { removeNudge, project, user, nudge } = this.props;

    if (this.state.isSelected) {
      removeNudge(project, user);
    } else {
      nudge(project);
    }

    this.setState({ isSelected: !this.state.isSelected });
  }

  render () {
    return (
      <TouchableOpacity
        onPress={ () => this.toggleNudge() }
        style={ Style.touchable }>
          { this.renderButton() }
      </TouchableOpacity>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(NudgeBtn);
