import React, { Component, PropTypes } from 'react';
import UserList from '../../user-list/user-list';
import EmptyMessage from '../empty-message/empty-message';

function Friends ({ friends, nav }) {

  if (friends.length > 0) {
    return (
      <UserList
        users={ friends }
        onUserSelect={ userId => nav('UserProfile', { userId }) } />
    );
  }

  return <EmptyMessage message='No friends yet.' />;
};

Friends.propTypes = {
  friends: PropTypes.array.isRequired,
  nav: PropTypes.func.isRequired
};

export default Friends;