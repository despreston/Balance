import React, { Component, PropTypes } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import actions from '../../actions/';
import { removeAuthToken, removeRefreshToken } from '../../utils/auth';
import Styles from './logout-styles';

class Logout extends Component {

  static propTypes = {
    beforeLogoutHook: PropTypes.func
  };

  constructor (props) {
    super(props);
  }

  logout = () => {
    if (this.props.beforeLogoutHook) {
      this.props.beforeLogoutHook();
    }
    
    removeRefreshToken()
    .then(removeAuthToken)
    .then( err => {  
      if (err) {
        throw "Could not log out";
      }

      this.props.dispatch(actions.reset());
    });
  }

  render () {
    return (
      <TouchableOpacity onPress={this.logout}>
        <Text style={ Styles.text }>
          Logout
        </Text>
      </TouchableOpacity>
    );
  }
}

export default connect()(Logout);