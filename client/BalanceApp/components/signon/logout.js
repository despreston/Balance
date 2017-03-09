import React, { Component, PropTypes } from 'react';
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