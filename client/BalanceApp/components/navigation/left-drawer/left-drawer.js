// vendors
import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

// utils
import { parseToken } from '../../../utils/auth';

// components
import ProfileInfo from '../../profile-info/profile-info';
import LeftDrawerMenuItem from './left-drawer-menu-item';
import Logout from '../../signon/logout';

// styles
import { Styles } from './left-drawer-styles';

function mapStateToProps (state) {
  return {
    user: state.users[state.current_user]
  };
}

class LeftDrawer extends Component {

  static propTypes = {
    routes: PropTypes.array.isRequired,
    user: PropTypes.object
  };

  constructor (props) {
    super(props);
  }

  renderMenuOptions = () => {
    const { routes } = this.props;
    let i = 0;

    return routes.map(title => {
      i++;
      return (
        <LeftDrawerMenuItem
          key={i}
          title={title}
          navigate={this.props.navigate}
        />
      );
    });
  }



  render () {
    const { user } = this.props;

    if (!user) { return null; }

    return (
      <View style={Styles.LeftDrawer}>
        <ProfileInfo user={user} />
        {this.renderMenuOptions()}
        <TouchableOpacity onPress={() => this.props.navigate('DrawerClose')}>
          <Logout />
        </TouchableOpacity>
      </View>
    );
  }

}

export default connect(mapStateToProps)(LeftDrawer);