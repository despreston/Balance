// vendors
import React, { Component, PropTypes } from 'react';
import { View, Text, TextInput } from 'react-native';
import { connect } from 'react-redux';

// components
import Logout from '../../signon/logout';
import NavBtn from '../../navigation/nav-btn';

// styles
import Styles from '../edit-project/edit-project-style';

// actions
import { saveUser} from '../../../actions';

function mapStateToProps (state) {
  return {
    user: state.users[state.loggedInUser]
  };
}

const mapDispatchToProps = { saveUser };

class UserSettings extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired
  };

  static navigationOptions = {
    header: ({ goBack, state }, defaultHeader) => {

      const title = 'Settings';

      const left = (
        <NavBtn
          title='Cancel'
          onPress={ () => goBack() }
        />
      );

      const right = (
        <NavBtn
          title='Save'
          onPress={ () => state.params.save() }
        />
      );

      return { ...defaultHeader, left, right, title };
    }
  };
  
  constructor (props) {
    super(props);

    this.state = { user: props.user };
  }

  componentDidMount () {
    setTimeout(() => this.props.navigation.setParams({
      save: () => this.save()
    }), 500);
  }

  beforeLogout () {
    this.props.navigation.navigate('Home');
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
    this.props.saveUser(this.state.user);
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
              onChangeText={ value => this.onEdit('username', value) } />
          </View>
          <View style={ Styles.inputRow }>
            <Text style={ [Styles.text, Styles.rowLabel] }>Email</Text>
            <TextInput
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
            <Text>
              Other users can search for you by name or username.
            </Text>
          </View>
          <Logout beforeLogoutHook={ () => this.beforeLogout() }/>
        </View>
      </View>
    );
  }

};

export default connect(mapStateToProps, mapDispatchToProps)(UserSettings);