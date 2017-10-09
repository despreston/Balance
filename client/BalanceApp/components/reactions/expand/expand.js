import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import Styles from '../reactions-styles';
import FullReactions from '../full-reactions/full-reactions';

export default class Expand extends Component {

  static propTypes = {
    note: PropTypes.string.isRequired
  }

  constructor (props) {
    super(props);
    this.state = { fullReactionsVisible: false };
  }

  toggleFullReactions () {
    this.setState({ fullReactionsVisible: !this.state.fullReactionsVisible });
  }

  render () {
    return (
      <View>
        <TouchableOpacity
          style={ Styles.iconContainer }
          onPress={ () => this.toggleFullReactions() }
        >
          <Image
            style={[ Styles.icon, { paddingHorizontal: 14 } ]}
            source={ require('../../../assets/icons/more.png') }
          />
        </TouchableOpacity>
        <FullReactions
          onClose={ () => this.toggleFullReactions() }
          note={ this.props.note }
          visible={ this.state.fullReactionsVisible }
        />
      </View>
    )
  }

}