import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import UpdateDeck from './update-deck';
import actions from '../../actions';

class UpdateDeckContainer extends Component {

  static mapStateToProps (state, ownProps) {
    const notes = Object.keys(state.notes)
      .map(id => state.notes[id])
      .filter(note => {
        return note.project._id === ownProps.project._id && note.type === 'Past';
      });

    notes.sort((a,b) => b.lastUpdated.getTime() - a.lastUpdated.getTime());

    return { notes };
  }

  static propTypes = {
    visible: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    project: PropTypes.object.isRequired,
    onNoteTap: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props);
    this.fetchNotes();
  }

  fetchNotes () {
    const query = [
      { user: this.props.project.owner[0].userId },
      { project: this.props.project._id },
      { type: 'Past' }
    ];

    return this.props.dispatch(actions.requestNotes(query));
  }
  
  render () {
    return (
      <UpdateDeck
        notes={ this.props.notes }
        visible={ this.props.visible }
        onHide={ this.props.onHide }
        onNoteTap={ this.props.onNoteTap }
      />
    );
  }
  
}

export default connect(UpdateDeckContainer.mapStateToProps)(UpdateDeckContainer);