import React, { Component, PropTypes } from 'react';
import { TouchableOpacity, View, Image } from 'react-native';

import AddUpdateContainer from '../../../add-update/add-update-container';

import Styles from './update-icon-styles';

export default class UpdateIcon extends Component {

  static propTypes = {
    project: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props);

    this.state = { addUpdateVisible: false };
  }

  toggleAddUpdateModal () {
    this.setState({ addUpdateVisible: !this.state.addUpdateVisible });
  }

  render () {
    return (
      <View>
        <TouchableOpacity
          onPress={ () => this.toggleAddUpdateModal() }
          style={ Styles.touchable }
        >
          <Image
            source={ require('../../../../assets/icons/add-note.png') }
            style={ Styles.image }
          />
        </TouchableOpacity>

        <AddUpdateContainer
          project={ this.props.project }
          visible={ this.state.addUpdateVisible }
          hideFn={ () => this.toggleAddUpdateModal() }
        />
      </View>
    );
  }
}