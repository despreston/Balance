import React, { PropTypes, Component } from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import Styles from './picture-styles';

class Picture extends Component {
  
  static propTypes = {
    uri: PropTypes.string.isRequired,
    remove: PropTypes.func.isRequired
  }

  render () {
    return (
      <View style={ Styles.container }>
        <View>
          <Image source={{ uri: this.props.uri }} style={ Styles.picture }/>
          <TouchableOpacity style={ Styles.remove } onPress={ this.props.remove }>
            <Image
              source={ require('../../../assets/icons/remove.png') }
              style={ Styles.removeIcon }
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default Picture;