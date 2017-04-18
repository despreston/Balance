// vendors
import React, { Component } from 'react';
import { TextInput, View, Text } from 'react-native';
import { api } from '../../../utils/api';

// components 
import UserList from '../../user-list/user-list';

// styles
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

  renderUserList () {
    if (this.state.query.length > 0 && this.state.users.length < 1 && !this.state.searching) {
      return <Empty />;
    }

    return (
      <UserList
        users={this.state.users}
        onTextChange={ this.onTextChange.bind(this) }
        onUserSelect={ userId => navigate('UserProfile', { userId }) }
      />
    );
  }
 
  render () {
    const { navigate } = this.props.navigation;

    return (
      <View style={ Styles.container }>
        <View style={ Styles.searchContainer }>
          <TextInput
            autoCorrect={ false }
            autoCapitalize='none'
            style={ Styles.searchBox }
            placeholder="Search for users"
            onChangeText={ this.onTextChange.bind(this) }
            value={ this.state.query }
          />
        </View>
        { this.renderUserList() }
      </View>
    )
  } 
}

const Empty = () => {
  return (
    <View style={ Styles.center }>
      <Text style={ Styles.text }>No results</Text>
    </View>
  );
}

export default UserSearch;