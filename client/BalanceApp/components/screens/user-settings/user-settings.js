import React, { Component, PropTypes } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native';
import Styles from '../edit-project/edit-project-style';
import UserSettingsStyles from './user-settings-styles';
import Help from '../../help/help';
import Logout from '../../logout/logout';

class UserSettings extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired,
    onEdit: PropTypes.func.isRequired,
    beforeLogout: PropTypes.func.isRequired,
    toggleHelp: PropTypes.func.isRequired,
    helpVisible: PropTypes.bool.isRequired,
    togglePhotoUploader: PropTypes.func.isRequired
  }

  render () {
    const {
      user,
      onEdit,
      beforeLogout,
      toggleHelp,
      helpVisible,
      togglePhotoUploader
    } = this.props;

    return (
      <ScrollView contentContainerStyle={ UserSettingsStyles.container }>
        <Image style={ UserSettingsStyles.avatar } source={{ uri: user.picture }} />
        <TouchableOpacity onPress={ togglePhotoUploader }>
          <Text>Edit</Text>
        </TouchableOpacity>
        <View style={ Styles.editProject }>
          <View style={ Styles.formContainer }>
            <View style={ Styles.inputRow }>
              <Text style={ [Styles.text, Styles.rowLabel] }>Username</Text>
              <TextInput
                clearButtonMode='while-editing'
                value={ user.username }
                style={ [Styles.text, Styles.rowInput] }
                placeholder="@username"
                autoCorrect={ false }
                onChangeText={ value => onEdit('username', value) } />
            </View>
            <View style={ Styles.inputRow }>
              <Text style={ [Styles.text, Styles.rowLabel] }>Email</Text>
              <TextInput
                clearButtonMode='while-editing'
                keyboardType='email-address'
                autoCapitalize='none'
                autoCorrect={ false }
                value={ user.email }
                style={ [Styles.text, Styles.rowInput] }
                placeholder="email address"
                onChangeText={ value => onEdit('email', value) } />
            </View>
            <View style={ Styles.inputRow }>
              <Text style={ [Styles.text, Styles.rowLabel] }>Bio</Text>
              <TextInput
                value={ user.bio }
                style={ [Styles.text, Styles.rowInput] }
                placeholder="A short bio"
                onChangeText={ value => onEdit('bio', value) } />
            </View>
            <View style={ [Styles.inputRow, { borderBottomWidth: 0 }] }>
              <Text style={[ Styles.text, { textAlign: 'center' } ]}>
                Other users can search for you by name or username.
              </Text>
            </View>
            <Logout beforeLogoutHook={ beforeLogout }/>
            <View style={ [Styles.inputRow, { borderBottomWidth: 0 }] }>
              <TouchableOpacity onPress={ toggleHelp }>
                <Text style={ [Styles.text, Styles.help] }>
                  What is this app?
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Help
            visible={ helpVisible }
            hideFn={ toggleHelp }
          />
        </View>
      </ScrollView>
    );
  }

}

export default UserSettings;