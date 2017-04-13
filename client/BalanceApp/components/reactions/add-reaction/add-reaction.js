import React, { Component, PropTypes } from 'react';
import { TouchableOpacity, View, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import Styles from '../reactions-styles';
import actions from '../../../actions/';
import ReactionSelector from '../../reaction-selector/reaction-selector';

class AddReaction extends Component {

  constructor (props) {
    super(props);

    this.state = { selectorVisible: false }

    this.onSelectorClose = this.onSelectorClose.bind(this);
    this.openSelector = this.openSelector.bind(this);
  }

  openSelector () {
    this.setState({ selectorVisible: true });
  }

  onSelectorClose (emoji) {
    this.setState({ selectorVisible: false });

    if (emoji) {
      this.props.dispatch(actions.addReaction(emoji, this.props.note));
    }
  }

  render () {
    return (
      <View>
        <TouchableOpacity
          style={[ Styles.iconContainer, { flex: 1 } ]}
          onPress={ () => this.openSelector() }
        >
          <Text style={ Styles.plus }>✚</Text>
          <Image
            style={ Styles.icon }
            source={ require('../../../assets/icons/add-reaction.png') }
          />
        </TouchableOpacity>

        <ReactionSelector
          visible={ this.state.selectorVisible }
          close={ this.onSelectorClose }
        />
      </View>
    )
  }

}

export default connect(
  AddReaction.mapStateToProps
)(AddReaction);