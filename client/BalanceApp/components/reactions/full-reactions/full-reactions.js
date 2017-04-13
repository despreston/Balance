import React, { Component, PropTypes } from 'react';
import { ScrollView, Modal, View, Text, TouchableOpacity } from 'react-native';
import Styles from './full-reactions-styles';
import { api } from '../../../utils/api';

class FullReactions extends Component {

  static propTypes = {
    note: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired
  }

  constructor (props) {
    super(props);
    this.state = { users: [] };
    this.fetchReactions();
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.visible) {
      this.fetchReactions();
    }
  }

  fetchReactions () {
    api(`notes/${this.props.note}/reactions`)
    .then(this.transform)
    .then(reactionsByUser => {
      this.setState({ users: reactionsByUser });
    });
  }

  transform (reactions) {
    let obj = {};

    reactions.forEach(r => {
      const copy = Object.assign({}, r);
      const key = r.user.userId;

      delete copy.user;
      delete copy.note;

      if (obj[key]) {
        obj[key].reactions.push(copy);
      } else {
        obj[key] = { user: r.user, reactions: [copy] };
      }
    });

    return obj;
  }

  render () {
    return (
      <Modal transparent visible={ this.props.visible } animationType='fade'>
        <View style={[ Styles.absolute, Styles.flex, Styles.center ]}>
          <TouchableOpacity style={[ Styles.absolute ]}
            onPress={ () => this.props.onClose() }
          >
            <View style={[ Styles.flex, Styles.overlay ]} />
          </TouchableOpacity>
          <UserList users={ this.state.users } close={ this.props.onClose }/>
        </View>
      </Modal>
    );
  }

}

const UserList = ({ users, close }) => {
  return (
    <View style={[ Styles.userlist ]}>
      <ScrollView>
        { Object.keys(users).map(u => <ReactionsByUser key={ u } user={ users[u] } />) }
      </ScrollView>
      <CloseButton close={ close }/>
    </View>
  )
};

const CloseButton = ({ close }) => {
  return (
    <TouchableOpacity onPress={ close } style={ Styles.close }>
      <Text style={ Styles.closeText }>Close</Text>
    </TouchableOpacity>
  )
};

const ReactionsByUser = ({ user }) => {
  return (
    <View style={[ Styles.listItem ]}>
      <Text style={ Styles.text }>
        <Text style={ Styles.bold }>{ user.user.username } </Text>
        reacted with
      </Text>
      <Text>{ user.reactions.map(r => r.reaction).join(' ') }</Text>
    </View>
  )
};

export default FullReactions;