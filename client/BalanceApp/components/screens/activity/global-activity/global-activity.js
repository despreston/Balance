import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect }                     from 'react-redux';
import actions                         from '../../../../actions';
import NoteListContainer               from '../../../note-list/note-list-container';

class GlobalActivity extends Component {

  static mapStateToProps ({ notes }) {
    notes = Object.keys(notes)
      .map(id => notes[id])
      .sort((a,b) => b.lastUpdated.getTime() - a.lastUpdated.getTime());

    return { notes };
  }

  static propTypes = {
    notes: PropTypes.array,
    onSelect: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props);
    this.state = { loading: false };
    this.limit = 30;
    this.skip = 0;
    this.onEndReached = this.onEndReached.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.fetchActivity();
  }

  onEndReached () {
    if (!this.state.loading) {
      this.skip += this.limit;
      this.fetchActivity();
    }
  }

  fetchActivity () {
    this.props.dispatch(actions.fetchGlobalActivity([{ skip: this.skip }]))
      .then(() => this.setState({ loading: false }));
  }

  onRefresh () {
    this.skip = 0;
    this.fetchActivity();
  }

  render () {
    return (
      <NoteListContainer
        refreshing={ this.state.loading }
        onRefresh={ this.onRefresh }
        onEndReached={ this.onEndReached }
        showTypeText
        showUser
        showProjectName
        { ...this.props }
      />
    );
  }

}

export default connect(GlobalActivity.mapStateToProps)(GlobalActivity);
