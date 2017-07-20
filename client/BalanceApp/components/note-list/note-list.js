import React, { Component, PropTypes } from 'react';
import { ListView, TouchableOpacity } from 'react-native';
import NoteListItem from './note-list-item/note-list-item';
import { Styles } from './note-list-style';

class NoteList extends Component {

  static propTypes = {
    notes: PropTypes.array.isRequired,
    showProjectName: PropTypes.bool,
    onSelect: PropTypes.func.isRequired,
    showTypeText: PropTypes.bool,
    showUser: PropTypes.bool,
    onEndReached: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props);

    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.notes = props.notes.map(n => n).sort(this.sortNotes);
    this.state = { dataSource: this.dataSource.cloneWithRows(this.notes) };
    this.renderNote = this.renderNote.bind(this);
  }

  componentWillReceiveProps (nextProps) {
    nextProps.notes.sort(this.sortNotes);

    this.setState({
      dataSource: this.dataSource.cloneWithRows(nextProps.notes)
    });
  }

  sortNotes (a, b) {
    return b.lastUpdated.getTime() - a.lastUpdated.getTime();
  }

  renderNotes () {
    const {
      notes,
      showTypeText,
      onSelect,
      showProjectName,
      showUser
    } = this.props;

    return notes.map(note => {
      return (
        <TouchableOpacity
          key={ note._id }
          style={ Styles.noteListItem }
          onPress={ () => onSelect(note._id) }>
          <NoteListItem
            { ...{ note, showTypeText, showProjectName, showUser } }
          />
        </TouchableOpacity>
      );
    });
  }

  renderNote (note) {
    const {
      showTypeText,
      onSelect,
      showProjectName,
      showUser
    } = this.props;

    return (
      <TouchableOpacity
        key={ note._id }
        style={ Styles.noteListItem }
        onPress={ () => onSelect(note._id) }>
        <NoteListItem
          { ...{ note, showTypeText, showProjectName, showUser } }
        />
      </TouchableOpacity>
    );
  }

  render () {
    return (
      <ListView
        refreshControl={ this.props.refreshControl }
        dataSource={ this.state.dataSource }
        renderRow={ this.renderNote }
        onEndReached={ this.props.onEndReached }
        onEndReachedThreshold={ 0 }
        enableEmptySections
      />
    )
  }

}

export default NoteList;
