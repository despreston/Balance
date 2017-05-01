import React, { Component, PropTypes } from 'react';
import { Image, TouchableOpacity } from 'react-native';

class Trash extends Component {

  static propTypes = {
    remove: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props);
  }
  
  render () {
    return (
      <TouchableOpacity onPress={ () => this.props.remove() }>
        <Image
          style={{ height: 20, width: 20 }}
          source={ require('../../../assets/icons/trash.png')}
        />
      </TouchableOpacity>
    );
  }

}

export default Trash;