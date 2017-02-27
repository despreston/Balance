// vendors
import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  Image
} from 'react-native';
import { connect } from 'react-redux';

// utils
import { parseToken } from '../../../utils/auth';

function mapStateToProps (state) {
  return {
    user: state.users[state.current_user]
  };
}

class LeftDrawer extends Component {

  constructor () {
    super();
  }

  render () {
    const { user } = this.props;

    if (!user) { return null; }

    return (
      <View>
        <Text>{user.name}</Text>
        <Image
          style={{ width: 60, height: 60 }}
          source={{ uri: user.picture }}
        />
      </View>
    );
  }

}

export default connect(mapStateToProps)(LeftDrawer);