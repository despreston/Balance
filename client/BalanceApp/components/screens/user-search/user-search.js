import React, { Component } from 'react';
import { TextInput, View, Text } from 'react-native';
import { api } from '../../../utils/api';
import UserList from '../../user-list/user-list';
import Styles from './user-search-styles';

class UserSearch extends Component {

  constructor (props) {
    super(props);

    this.state = { query: '', users: [], searching: false };
  }

  queryUsers () {
    // If the query is empty, don't show anything
    if (this.state.query === '') {
      this.setState({ users: [], searching: false });
      return;
    }

    api('users/search?q=' + this.state.query).then(users => {
      this.setState({ users, searching: false });
    });
  }

  onTextChange (query) {
    this.setState({ query, searching: true });

    if (this.submitTimeout) {
      clearTimeout(this.submitTimeout);
    }

    this.submitTimeout = setTimeout(() => this.queryUsers(), 400);
  }
 
  render () {
    return (
      <View style={ Styles.container }>
        <View style={ Styles.searchContainer }>
          <TextInput
            autoFocus
            autoCorrect={ false }
            autoCapitalize='none'
            style={ Styles.searchBox }
            placeholder="Search for users"
            onChangeText={ this.onTextChange.bind(this) }
            value={ this.state.query }
          />
        </View>
        <List
          query={ this.state.query }
          nav={ this.props.navigation.navigate }
          searching={ this.state.searching }
          users={ this.state.users }
          onTextChange={ this.onTextChange.bind(this) }
        />
      </View>
    )
  } 
}

const List = ({ query, nav, searching, users, onTextChange }) => {
  if (query.length > 0 && users.length < 1 && !searching) {
    return (
      <View style={ Styles.center }>
        <Text style={ Styles.text }>No results</Text>
      </View>
    );
  }

  return (
    <UserList
      users={ users }
      onTextChange={ onTextChange }
      onUserSelect={ userId => nav('UserProfile', { userId }) }
    />
  );
};

export default UserSearch;