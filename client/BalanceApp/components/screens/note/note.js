// vendors
import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

// actions
import { fetchNote } from '../../../actions';

function mapStateToProps (state, ownProps) {
  return {
    note: state.notes[ownProps.navigation.state.params.id]
  };
}

const mapDispatchToProps = { fetchNote };

class Note extends Component {
  
  constructor (props) {
    super(props);

    props.fetchNote(props.navigation.state.params.id);
  }

  render () {
    return (
      <View>
        <Text>{ this.props.note.content }</Text>
      </View>
    );
  }

};

export default connect(mapStateToProps, mapDispatchToProps)(Note);