import React, {
  Component,
  PropTypes
}                         from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image
}                         from 'react-native';
import Styles             from '../edit-project/edit-project-style';
import UserSettingsStyles from './user-settings-styles';
import Help               from '../../help/help';
import Logout             from '../../logout/logout';
import FormListItem       from '../../form-list-item/form-list-item';
import HideNameSwitch     from './hide-name-switch/hide-name-switch';

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

    const messageStyles = [Styles.text, UserSettingsStyles.centerText];
    const userNameError = user.hideName && !user.username;

    const hideNameMessage = `Other users can search for you by ` +
      `${(!user.hideName ? 'name or ' : '')}username.`;

    return (
      <ScrollView contentContainerStyle={ UserSettingsStyles.container }>
        <Image style={ UserSettingsStyles.avatar } source={{ uri: user.picture }} />
        <TouchableOpacity
          style={ UserSettingsStyles.editAvatar }
          onPress={ togglePhotoUploader }
        >
          <Text style={ Styles.help }>Change picture</Text>
        </TouchableOpacity>
        <View style={ Styles.editProject }>
          <View style={ Styles.formContainer }>
            <FormListItem label='Name'>
              <Text style={[ Styles.rowInput, UserSettingsStyles.readOnlyText ]}>
                { user.name }
              </Text>
            </FormListItem>
            <FormListItem error={ userNameError } label='Username'>
              <TextInput
                clearButtonMode='while-editing'
                value={ user.username }
                style={[ Styles.text, Styles.rowInput ]}
                placeholder="username"
                autoCorrect={ false }
                onChangeText={ value => onEdit('username', value) } />
            </FormListItem>
            <FormListItem label='Email'>
              <TextInput
                clearButtonMode='while-editing'
                keyboardType='email-address'
                autoCapitalize='none'
                autoCorrect={ false }
                value={ user.email }
                style={[ Styles.text, Styles.rowInput ]}
                placeholder="john@website.com"
                onChangeText={ value => onEdit('email', value) } />
            </FormListItem>
            <FormListItem label='Bio'>
              <TextInput
                value={ user.bio }
                style={[ Styles.text, Styles.rowInput ]}
                placeholder="Loves to get things done."
                onChangeText={ value => onEdit('bio', value) } />
            </FormListItem>
            <FormListItem label='Show username only' style={{ borderBottomWidth: 0 }}>
              <HideNameSwitch
                value={ user.hideName }
                onValueChange={ value => onEdit('hideName', value) }
              />
            </FormListItem>
            {
              userNameError &&
              (
                <FormListItem style={{ borderBottomWidth: 0 }}>
                  <Text style={[ ...messageStyles, UserSettingsStyles.error ]}>
                    Username is required if you want to hide your name.
                  </Text>
                </FormListItem>
              )
            }
            <FormListItem style={{ borderBottomWidth: 0 }}>
              <Text style={ messageStyles }>
                { hideNameMessage }
              </Text>
            </FormListItem>
            <Logout beforeLogoutHook={ beforeLogout }/>
            <FormListItem style={{ borderBottomWidth: 0 }}>
              <TouchableOpacity onPress={ toggleHelp }>
                <Text style={[ Styles.text, Styles.help ]}>
                  Help
                </Text>
              </TouchableOpacity>
            </FormListItem>
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
