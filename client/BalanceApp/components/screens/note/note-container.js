import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Note from './note';
import { fetchNote, createComment } from '../../../actions';

function mapStateToProps (state, ownProps) {
  return {
    note: state.notes[ownProps.navigation.state.params.id]
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

    this.author = props.note.author[0];

    props.fetchNote(props.navigation.state.params.id);
  }

  goToProject () {
    const project = this.props.note.project._id;
    this.props.navigation.navigate('Project', { project });
  }

  goToAuthor () {
    const userId = this.author.userId;
    this.props.navigation.navigate('UserProfile', { userId });
  }

  sendComment (content) {
    const comment = { userId: this.props.note.user, content };

    this.props.createComment(comment, this.props.note._id);
  }

  render () {
    return (
      <Note
        note={ this.props.note }
        goToProject={ () => this.goToProject() }
        goToAuthor={ () => this.goToAuthor() }
        sendComment={ content => this.sendComment(content) }
      />
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(NoteContainer);