import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity, Text } from 'react-native';
import Styles from '../reactions-styles';
import ReactionStyles from './reaction-styles';
import actions from '../../../actions/';

class Reaction extends Component {

  static mapStateToProps ({ loggedInUser }) {
    return { loggedInUser };
  }

  static propTypes = {
    reaction: PropTypes.string.isRequired,
    users: PropTypes.array.isRequired,
    note: PropTypes.string.isRequired,
    loggedInUser: PropTypes.string.isRequired
  }

  constructor (props) {
    super(props);
    this.state = { disabled: false };
  }

  onTap () {
    this.setState({ disabled: true });
    const { dispatch } = this.props;
    let userReactionPair = this.isSelected();

    new Promise((resolve) => {
      if (userReactionPair) {
        return resolve(dispatch(actions.deleteReaction(userReactionPair[1], this.props.note)));
      }

      return resolve(dispatch(actions.addReaction(this.props.reaction, this.props.note)));
    }).then(() => this.setState({ disabled: false }));
  }

  isSelected () {
    return this.props.users.find(userReactionPair => {
      return userReactionPair[0] === this.props.loggedInUser;
    });
  }

  containerStyles () {
    return this.isSelected()
      ? [ Styles.iconContainer, ReactionStyles.selectedContainer ]
      : [ Styles.iconContainer ];
  }

  countStyles () {
    return this.isSelected()
      ? [ ReactionStyles.selectedCount ]
      : [ ReactionStyles.count ];
  }

  render () {
    return (
      <TouchableOpacity
        disabled={ this.state.disabled }
        style={ this.containerStyles() }
        onPress={ () => this.onTap() }
      >
        <Text style={{ left: 1 }}>{ this.props.reaction }</Text>
        {
          this.props.users.length > 1 &&
          <Text style={ this.countStyles() }>{ this.props.users.length }</Text>
        }
      </TouchableOpacity>
    );
  }

}

export default connect(Reaction.mapStateToProps)(Reaction);