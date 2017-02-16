import React, { Component } from 'react';
import { Button } from 'react-native';
import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { setAuthenticated } from '../../actions';

function mapDispatchToProps (dispatch) {
  return {
    setAuth: () => dispatch(setAuthenticated(false))
  };
}

class Logout extends Component {

  constructor (props) {
    super();
  }

  logout = () => {
    AsyncStorage.removeItem('AUTH_TOKEN').then(() => {
      this.props.setAuth();
    });
  }

  render () {
    return (
      <Button
        title='Logout'
        onPress={this.logout}
      />  
    );
  }
}

export default connect(null, mapDispatchToProps)(Logout);