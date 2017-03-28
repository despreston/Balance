// vendors
import React, { Component, PropTypes } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';

// styles
import Styles from './friend-button-style';

// actions
import { createFriendship, removeFriendship } from '../../actions';

function mapStateToProps (state, ownProps) {
  let fullLoggedInUser = state.users[state.loggedInUser];

  let fromFriendList = fullLoggedInUser.friends.find(friend => {
    return friend.userId === ownProps.userId;
  });

  return {
    status: fromFriendList ? fromFriendList.status : 'none',
    loggedInUser: state.loggedInUser
  };
}

function mapDispatchToProps (dispatch) {
  return {
    createFriendship: (userId, friend) => {
      return dispatch(createFriendship(userId, friend));
    },
    removeFriendship: (userId, friend) => {
      return dispatch(removeFriendship(userId, friend));
    }
  };
}

class FriendButton extends Component {

  static propTypes = {
    userId: PropTypes.string.isRequired,
    loggedInUser: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    hideIfLoggedInUser: PropTypes.bool
  };

  constructor (props) {
    super(props);

    this.state = {
      actionText: null,
      textStyles: null,
      pressAction: null,
      buttonStyles: null,
      status: props.status
    };
  }

  componentWillReceiveProps (nextProps) {
    this.handleStatus(nextProps.status);
  }

  componentWillMount () {
    this.handleStatus(this.props.status);
  }

  handleStatus (newStatus) {
    let actionText;
    let textStyles = [Styles.text];
    let buttonStyles = [Styles.container, Styles.button];
    let pressAction = this.create.bind(this);

    switch (newStatus) {
      case 'accepted':
        actionText = 'Friends';
        buttonStyles.push(Styles.friends);
        pressAction = this.removePending.bind(this);
        break;
      case 'removePending':
        actionText = 'Remove?';
        buttonStyles.push(Styles.removePending);
        pressAction = this.remove.bind(this);
        break;
      case 'requested':
        actionText = 'Accept';
        break;
      case 'pending':
        actionText = 'Requested';
        pressAction = this.remove.bind(this);
        break;
      default:
        textStyles.push(Styles.addText);
        actionText = 'Add Friend';
        break;
    }

    this.setState({
      status: newStatus,
      actionText,
      buttonStyles,
      textStyles,
      pressAction
    });
  }

  create () {
    const { userId, loggedInUser, createFriendship } = this.props;
    createFriendship(loggedInUser, userId);
  }

  removePending () {
    this.handleStatus('removePending');
  }

  remove () {
    const { userId, loggedInUser, removeFriendship } = this.props;
    removeFriendship(loggedInUser, userId);
  }

  render () {
    const { hideIfLoggedInUser, userId, loggedInUser, createFriendship } = this.props;
    const { actionText, buttonStyles, textStyles, pressAction } = this.state;

    if (userId === loggedInUser) {
      if (hideIfLoggedInUser) {
        return null;
      }
      return <View style={ Styles.container }><Text>You!</Text></View>;
    }

    return (
      <TouchableOpacity
        style={ buttonStyles }
        onPress={ () => pressAction() } >
        <Text style={ textStyles }>{ actionText }</Text>
      </TouchableOpacity>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(FriendButton);