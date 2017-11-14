import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View } from 'react-native';
import UserList from '../../user-list/user-list';
import Styles from './project-bookmarks-style';

class ProjectBookmarks extends Component {

  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          bookmarks: PropTypes.array.isRequired,
          onUserSelect: PropTypes.func.isRequired
        })
      })
    }).isRequired
  }

  static navigationOptions = () => ({ title:  'Who bookmarked' })

  constructor (props) {
    super(props);
    const { bookmarks, onUserSelect } = props.navigation.state.params;
    this.users = bookmarks.map(bookmark => bookmark.bookmarker);
    this.onUserSelect = onUserSelect.bind(this);
  }

  render () {
    return (
      <View style={ Styles.bookmarks } >
        <UserList users={ this.users } onUserSelect={ this.onUserSelect } />
      </View>
    );
  }

}

export default ProjectBookmarks;
