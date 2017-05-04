import React, { Component, PropTypes } from 'react';
import { Image, TouchableOpacity, Alert } from 'react-native';

class Trash extends Component {

  static propTypes = {
    remove: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props);
    this.showConfirmation = this.showConfirmation.bind(this);
  }

  showConfirmation () {
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: () => this.props.remove(), style: 'destructive' },
      ]
    );
  }
  
  render () {
    return (
      <TouchableOpacity onPress={ () => this.showConfirmation() }>
        <Image
          style={{ height: 20, width: 20 }}
          source={ require('../../../assets/icons/trash.png')}
        />
      </TouchableOpacity>
    );
  }

}

export default Trash;