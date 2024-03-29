import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserProfile from '../../user-profile/user-profile';
import Icon from '../../navigation/icon';

class Profile extends Component {

  static mapStateToProps (state) {
    return { loggedInUser: state.loggedInUser };
  }

  static navigationOptions = ({ navigation }) => {
    const { navigate: nav } = navigation;
    const headerBackTitle = null;

    const headerLeft = (
      <Icon
        imagePath={ require('../../../assets/icons/users.png') }
        onPress={ () => nav('UserSearch') }
       />
    );

    const headerRight = (
      <Icon
        imagePath={ require('../../../assets/icons/settings.png') }
        onPress={ () => nav('UserSettingsContainer') }
       />
    );

    return { headerLeft, headerRight, headerBackTitle };
  };

  render () {
    const { navigate } = this.props.navigation;

    if (!this.props.loggedInUser) { return null; }

    return <UserProfile userId={ this.props.loggedInUser } nav={ navigate } />;
  }

}

export default connect(Profile.mapStateToProps)(Profile);
