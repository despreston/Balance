import React, { Component } from 'react';
import { WebView } from 'react-native';

class InfoWebView extends Component {
  render () {
    return (
      <WebView
        source={{ uri: CONFIG.infoWebViewUrl }}
      />
    );
  }
}

export default InfoWebView;
