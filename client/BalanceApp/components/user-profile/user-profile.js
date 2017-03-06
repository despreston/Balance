import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

// components
import Logout from '../signon/logout';
import ProfileInfo from './profile-info/profile-info';

// styles
import Styles from './profile-styles';

function mapStateToProps (state, ownProps) {
  return {
    user: state.users[ownProps.userId]
  };
}

class UserProfile extends Component {
  
  static propTypes = {
    userId: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
  };

  constructor (props) {
    super(props);
  }

  render () {
    return (
      <View style={Styles.profile}>
        <View style={Styles.profileInfo}>
          <ProfileInfo user={this.props.user} hideProjects={true} />
        </View>
        <Logout />
      </View>
    );
  }

}

export default connect(mapStateToProps)(UserProfile);

