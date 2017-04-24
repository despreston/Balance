// vendors
import React, { Component, PropTypes } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

// components
import Logout from '../../logout/logout';
import NavBtn from '../../navigation/nav-btn';
import Help from '../../help/help';

// styles
import Styles from '../edit-project/edit-project-style';

// actions
import actions from '../../../actions/';

class UserSettings extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired
  }

  static mapStateToProps (state) {
    return {
      user: state.users[state.loggedInUser]
    };
  }

  static navigationOptions = {
    header: ({ goBack, state }, defaultHeader) => {

      const title = 'Settings';

      const right = <NavBtn title='Save' onPress={ () => state.params.save() }/>;

      return { ...defaultHeader, right, title };
    }
  }
  
  constructor (props) {
    super(props);

    this.state = { user: props.user, helpVisible: false };
  }

  componentDidMount () {
    setTimeout(() => this.props.navigation.setParams({
      save: () => this.save()
    }), 500);
  }

  beforeLogout () {
    // this.props.navigation.navigate('Login');
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Login' })
      ]
    });

    this.props.navigation.dispatch(resetAction);
  }

  onEdit (property, value) {
    this.setState({ 
      user: {
        ...this.state.user,
        [property]: value 
      }
    });
  }

  save () {
    this.props.navigation.navigate('Profile');
    this.props.dispatch(actions.saveUser(this.state.user));
  }

  toggleHelp () {
    this.setState({ helpVisible: !this.state.helpVisible });
  }

  render () {
    const { user } = this.state;
    return (
      <View style={ Styles.editProject }>
        <View style={ Styles.formContainer }>
          <View style={ Styles.inputRow }>
            <Text style={ [Styles.text, Styles.rowLabel] }>Username</Text>
            <TextInput
              value={ user.username }
              style={ [Styles.text, Styles.rowInput] }
              placeholder="@username"
              autoCorrect={ false }
              onChangeText={ value => this.onEdit('username', value) } />
          </View>
          <View style={ Styles.inputRow }>
            <Text style={ [Styles.text, Styles.rowLabel] }>Email</Text>
            <TextInput
              keyboardType='email-address'
              autoCapitalize='none'
              autoCorrect={ false }
              value={ user.email }
              style={ [Styles.text, Styles.rowInput] }
              placeholder="email address"
              onChangeText={ value => this.onEdit('email', value) } />
          </View>
          <View style={ Styles.inputRow }>
            <Text style={ [Styles.text, Styles.rowLabel] }>Bio</Text>
            <TextInput
              value={ user.bio }
              style={ [Styles.text, Styles.rowInput] }
              placeholder="A short bio"
              onChangeText={ value => this.onEdit('bio', value) } />
          </View>
          <View style={ [Styles.inputRow, { borderBottomWidth: 0 }] }>
            <Text style={[ Styles.text, { textAlign: 'center' } ]}>
              Other users can search for you by name or username.
            </Text>
          </View>
          <Logout beforeLogoutHook={ () => this.beforeLogout() }/>
          <View style={ [Styles.inputRow, { borderBottomWidth: 0 }] }>
            <TouchableOpacity onPress={() => this.toggleHelp() }>
              <Text style={ [Styles.text, Styles.help] }>
                What is this app?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Help
          visible={ this.state.helpVisible }
          hideFn={ () => this.toggleHelp() }
        />
      </View>
    );
  }

};

export default connect(UserSettings.mapStateToProps)(UserSettings);