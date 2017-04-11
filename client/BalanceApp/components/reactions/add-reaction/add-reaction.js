import React, { Component, PropTypes } from 'react';
import { TouchableOpacity, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import Styles from '../reactions-styles';
import { addReaction } from '../../../actions';

class AddReaction extends Component {

  test () {
    this.props.addReaction('😄', '58da814eab025b03b13695b3');
  }

  render () {
    return (
      <TouchableOpacity style={ Styles.iconContainer } onPress={ () => this.test() }>
        <Text style={ Styles.plus }>✚</Text>
        <Image
          style={ Styles.icon }
          source={ require('../../../assets/icons/add-reaction.png') }
        />
      </TouchableOpacity>
    )
  }

}

export default connect(
  AddReaction.mapStateToProps,
  { addReaction }
)(AddReaction);