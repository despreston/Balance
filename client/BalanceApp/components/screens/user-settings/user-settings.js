// vendors
import React, { Component, PropTypes } from 'react';
import { View, Text, TextInput } from 'react-native';
import { connect } from 'react-redux';

// components
import Logout from '../../signon/logout';
import NavBtn from '../../navigation/nav-btn';

// styles
import Styles from '../edit-project/edit-project-style';

function mapStateToProps (state) {
  return {
    user: state.users[state.loggedInUser]
  };
}

class UserSettings extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired
  };

  static navigationOptions = {
    header: ({ goBack, dispatch, state, navigate }, defaultHeader) => {

      const title = 'Settings';

      const left = (
        <NavBtn
          title='Cancel'
          onPress={() => goBack()}
        />
      );

      const right = (
        <NavBtn
          title='Save'
          onPress={() => null}
        />
      );

      return { ...defaultHeader, left, right, title };
    }
  };
  
  constructor (props) {
    super(props);
  }

  beforeLogout () {
    this.props.navigation.navigate('Home');
  }

  render () {
    const { user } = this.props;
    return (
      <View style={ Styles.editProject }>
        <View style={ Styles.formContainer }>
          <View style={ Styles.inputRow }>
            <Text style={ Styles.rowLabel }>Name</Text>
            <TextInput
              value={ user.name }
              style={ Styles.rowInput }
              placeholder="Name (required)"
              onChangeText={ value => null } />
          </View>
          <View style={ Styles.inputRow }>
            <Text style={ Styles.rowLabel }>Display Name</Text>
            <TextInput
              value={ user.displayName || null }
              style={ Styles.rowInput }
              placeholder="@Display Name"
              onChangeText={ value => null } />
          </View>
          <View style={ [Styles.inputRow, { borderBottomWidth: 0 }] }>
            <Text>Other users can search for you by name or display name.</Text>
          </View>
          <Logout beforeLogoutHook={ () => this.beforeLogout() }/>
        </View>
      </View>
    );
  }

};

export default connect(mapStateToProps)(UserSettings);