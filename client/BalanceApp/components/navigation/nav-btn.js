import React, { PropTypes } from 'react';
import { Button } from 'react-native';

// styles
import { styles } from './navigation-styles';

function NavBtn ({ onPress, customStyle = {}, title, color = '#fff' }) {
  return (
    <Button
      color={color}
      style={[
        styles.button,
        styles.text,
        { fontWeight: 'normal' },
        ...customStyle
      ]}
      title={title}
      onPress={onPress}
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