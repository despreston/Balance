import PropTypes from 'prop-types';
import React from 'react';
import { Button }           from 'react-native';
import { styles }           from './navigation-styles';

function NavBtn ({ disabled, onPress, customStyle = {}, title, color = '#432B52' }) {
  return (
    <Button
      disabled={ disabled }
      color={ color }
      style={[
        styles.button,
        styles.text,
        { fontWeight: 'normal' },
        ...customStyle
      ]}
      title={ title }
      onPress={ onPress }
    />
  );
}

NavBtn.propTypes = {
  onPress: PropTypes.func.isRequired,
  customStyle: PropTypes.array,
  title: PropTypes.string.isRequired,
  color: PropTypes.string
};

export default NavBtn;
