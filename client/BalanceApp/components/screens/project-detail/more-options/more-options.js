import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Icon from '../../../navigation/icon';

class MoreOptions extends Component {

  static propTypes = {
    onPress: PropTypes.func
  }

  render () {
    return (
      <Icon
        imagePath={ require('../../../../assets/icons/more-large.png') }
        onPress={ () => this.props.onPress() }
      />
    );
  }

}

export default MoreOptions;
