import React, { Component, PropTypes } from 'react';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import NavBtn from '../../navigation/nav-btn';
import { NavigationActions } from 'react-navigation';
import UserSettings from './user-settings';
import actions from '../../../actions/';
import s3upload from '../../../utils/s3-upload';

class UserSettingsContainer extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired
  }

  static mapStateToProps (state) {
    return {
      user: state.users[state.loggedInUser]
    };
  }

  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    const title = 'Settings';
    const headerRight = <NavBtn title='Save' onPress={ () => state.params.save() }/>;

    return { headerRight, title };
  }
  
  constructor (props) {
    super(props);
    this.state = { user: props.user, helpVisible: false };
    this.newPhoto = false;
    this.onEdit = this.onEdit.bind(this);
    this.beforeLogout = this.beforeLogout.bind(this);
    this.toggleHelp = this.toggleHelp.bind(this);
    this.togglePhotoUploader = this.togglePhotoUploader.bind(this);
  }

  componentDidMount () {
    setTimeout(() => this.props.navigation.setParams({
      save: () => this.save()
    }), 500);
  }

  beforeLogout () {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Login' })
      ],
      key: null
    });

    this.props.navigation.dispatch(resetAction);
  }

  onEdit (property, value) {
    this.newPhoto = true;
    this.setState({ 
      user: {
        ...this.state.user,
        [property]: value
      }
    });
  }

  save () {
    this.props.navigation.navigate('Profile');

    new Promise((resolve) => {
      if (this.newPhoto) {
        const height = 612, width = 612;
        return s3upload(this.state.user.picture, width, height).then(url => {
          this.onEdit('picture', url);
          return resolve();
        });
      }
    })
    .then(() => {
      this.newPhoto = false;
      this.props.dispatch(actions.saveUser(this.state.user));
    });
  }

  toggleHelp () {
    this.setState({ helpVisible: !this.state.helpVisible });
  }

  togglePhotoUploader () {
    const options = {
      title: null,
      noData: true,
      mediaType: 'photo',
      allowsEditing: true
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (!response.didCancel && !response.error) {
        let source = { uri: response.origURL };
        this.onPhotoSelect(source);
      }
    });
  }

  onPhotoSelect ({ uri: picture }) {
    this.onEdit('picture', picture);
  }

  render () {
    return (
      <UserSettings
        user={ this.state.user }
        onEdit={ this.onEdit }
        beforeLogout={ this.beforeLogout }
        toggleHelp={ this.toggleHelp }
        helpVisible={ this.state.helpVisible }
        togglePhotoUploader={ this.togglePhotoUploader }
      />
    );
  }
}

export default connect(UserSettingsContainer.mapStateToProps)(UserSettingsContainer);
