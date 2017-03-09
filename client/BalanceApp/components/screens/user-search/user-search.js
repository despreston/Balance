// vendors
import React, { Component } from 'react';
import { TextInput, View } from 'react-native';
import { api } from '../../../utils/api';

// components 
import UserList from '../../user-list/user-list';

// styles
import Styles from './user-search-styles';

export default class UserSearch extends Component {

  constructor (props) {
    super(props);

    this.state = { query: '', users: [] };
  }

  queryUsers () {
    // If the query is empty, don't show anything
    if (this.state.query === '') {
      this.setState({ users: [] });
      return;
    }

    api('users/search?q=' + this.state.query).then(users => {
      this.setState({ users });
    });
  }

  onTextChange (query) {
    this.setState({ query });

    if (this.submitTimeout) {
      clearTimeout(this.submitTimeout);
    }

    this.submitTimeout = setTimeout(() => this.queryUsers(), 400);

  }
 
  render () {
    const { navigate } = this.props.navigation;

    return (
      <View style={ Styles.container }>
        <View style={ Styles.searchContainer }>
          <TextInput
            style={ Styles.searchBox }
            placeholder="Search for users"
            onChangeText={ this.onTextChange.bind(this) }
            value={ this.state.query }
          />
        </View>
        <UserList
          users={this.state.users}
          onTextChange={ this.onTextChange.bind(this) }
          onUserSelect={ userId => navigate('UserProfile', { userId }) }
        />
      </View>
    )
  } 
}