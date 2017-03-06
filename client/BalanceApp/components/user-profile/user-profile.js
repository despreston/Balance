import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

// components
import Logout from '../signon/logout';
import ProfileInfo from './profile-info/profile-info';
import NoteList from '../note-list/note-list';

// actions
import { requestNotes } from '../../actions';

// styles
import Styles from './profile-styles';

function mapStateToProps (state, ownProps) {
  
  // latest notes for user
  const latestNotes = Object.keys(state.notes)
    .map(id => state.notes[id])
    .filter(note => note.user === ownProps.userId);

  return {
    user: state.users[ownProps.userId],
    latestNotes
  };

}

function mapDispatchToState (dispatch) {
  return {
    requestLatestNotes: params => dispatch(requestNotes(params))
  };
}

class UserProfile extends Component {
  
  static propTypes = {
    userId: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    latestNotes: PropTypes.array.isRequired,
    requestLatestNotes: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);

    this.state = { context: 'latest' };

    this.loadLatestNotes();
  }

  loadLatestNotes () {
    this.props.requestLatestNotes([
      { user: this.props.userId }
    ]);
  }

  renderBody () {
    switch (this.state.context) {
      case 'latest':
        return (
          <NoteList
            notes={this.props.latestNotes}
            showContext={true} />
        );
      case 'friends':
        return null;
    }
  }

  render () {
    return (
      <View style={ Styles.profile }>
        <View style={ Styles.profileInfo }>
          <ProfileInfo
            user={ this.props.user }
            hideProjects={true} 
            switchContext={ (context) => this.setState({ context }) }/>
        </View>
        <View>
          { this.renderBody() }
        </View>
        <Logout />
      </View>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToState)(UserProfile);

