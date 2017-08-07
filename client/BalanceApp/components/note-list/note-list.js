import React, { Component, PropTypes } from 'react';
import { FlatList, TouchableOpacity }  from 'react-native';
import NoteListItem                    from './note-list-item/note-list-item';
import { Styles }                      from './note-list-style';

class NoteList extends Component {

  static propTypes = {
    notes: PropTypes.array.isRequired,
    showProjectName: PropTypes.bool,
    onSelect: PropTypes.func.isRequired,
    showTypeText: PropTypes.bool,
    showUser: PropTypes.bool,
    onEndReached: PropTypes.func.isRequired,
    onRefresh: PropTypes.func,
    refreshing: PropTypes.bool
  }

  constructor (props) {
    super(props);
    this.state = { notes: this.notesForList(props.notes) };
    this.renderNote = this.renderNote.bind(this);
  }

  notesForList (notes) {
    return Array.from(notes).sort(this.sortByLastUpdated);
  }

  sortByLastUpdated (a, b) {
    return b.lastUpdated.getTime() - a.lastUpdated.getTime();
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ notes: this.notesForList(nextProps.notes) });
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
      <FlatList
        refreshing={ this.props.refreshing }
        keyExtractor={ note => note._id }
        data={ this.state.notes }
        renderItem={ ({ item }) => this.renderNote(item) }
        onEndReached={ this.props.onEndReached }
        onEndReachedThreshold={ 0 }
        onRefresh={ this.props.onRefresh }
      />
    );
  }

}

export default NoteList;
