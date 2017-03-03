import React, { Component } from 'react';
import { Button } from 'react-native';
import { connect } from 'react-redux';
import { resetCurrentUser } from '../../actions';
import { removeToken } from '../../utils/auth';

function mapDispatchToProps (dispatch) {
  return {
    resetCurrentUser: () => dispatch(resetCurrentUser(null))
  };
}

class Logout extends Component {

  constructor (props) {
    super();
  }

  logout = () => {
    removeToken().then( err => {  
      if (err) {
        throw "Could not log out";
      }

      this.props.resetCurrentUser();
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