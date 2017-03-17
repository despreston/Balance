// vendors
import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

// actions
import { fetchNote } from '../../../actions';

function mapDispatchToProps (dispatch) {
  return {
    fetchNote: id => dispatch(fetchNote(id))
  };
}

class Note extends Component {
  
  constructor (props) {
    super(props);
  }

  render () {
    const { id } = this.props.navigation.state.params;
    return (
      <View>
        <Text>{ id }</Text>
      </View>
    );
  }

};

export default connect(null, mapDispatchToProps)(Note);