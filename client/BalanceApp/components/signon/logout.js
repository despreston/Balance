import React, { Component, PropTypes } from 'react';
import { Button } from 'react-native';
import { connect } from 'react-redux';
import { reset } from '../../actions';
import { removeToken } from '../../utils/auth';

function mapDispatchToProps (dispatch) {
  return {
    reset: () => dispatch(reset(null))
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

      this.props.reset();
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