import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Note from './note';
import { fetchNote, createComment } from '../../../actions';

function mapStateToProps (state, ownProps) {
  let noteId = ownProps.navigation.state.params.id;

  let comments = Object.keys(state.comments)
    .map(id => state.comments[id])
    .filter(c => c.note === noteId);

  return {
    note: state.notes[noteId],
    comments,
    loggedInUser: state.loggedInUser
  };
}

const mapDispatchToProps = { fetchNote, createComment };

class NoteContainer extends Component {

  static navigationOptions = {
    header: ({ state, navigate }, defaultHeader) => {
      return { ...defaultHeader, title: 'Note' };
    }
  }
  
  constructor (props) {
    super(props);

    props.fetchNote(props.navigation.state.params.id);
  }

  goToProject () {
    const project = this.props.note.project._id;
    this.props.navigation.navigate('Project', { project });
  }

  goToUser (userId) {
    this.props.navigation.navigate('UserProfile', { userId });
  }

  sendComment (content) {
    const comment = {
      note: this.props.note._id,
      user: this.props.loggedInUser,
      content
    };

    this.props.createComment(comment);
  }

  render () {
    return (
      <Note
        note={ this.props.note }
        comments={ this.props.comments }
        goToProject={ () => this.goToProject() }
        goToUser={ user => this.goToUser(user) }
        sendComment={ content => this.sendComment(content) }
      />
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(NoteContainer);