import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, View } from 'react-native';

// actions
import { login } from '../../actions';

function mapDispatchToProps (dispatch) {
  return {
    login: () => dispatch(login())
  };
}

class SignOn extends Component {

  constructor (props) {
    super(props);
  }

  render () {
    return <View><Button onPress={() => this.props.login()} title='login' /></View>;
  }

}

export default connect(null, mapDispatchToProps)(SignOn);