import PropTypes from 'prop-types';
import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

// styles
import { styles } from './navigation-styles';

function Icon ({ onPress, imagePath }) {
  return (
    <TouchableOpacity style={ styles.touchable } onPress={ onPress }>
      <Image source={ imagePath } style={ styles.icon } />
    </TouchableOpacity>
  );
}

Icon.propTypes = {
  onPress: PropTypes.func.isRequired,
  imagePath: PropTypes.number.isRequired
};

export default Icon;