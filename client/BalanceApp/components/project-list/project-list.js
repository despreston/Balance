// Vendors
import React, { Component, PropTypes } from 'react';
import { View, ListView, TouchableHighlight } from 'react-native';

// Components
import ProjectListItem from '../project-list-item/project-list-item';
import { Style } from './project-list-style';

export default class ProjectList extends Component {
  static propTypes = {
    onProjectTap: PropTypes.func,
    projects: PropTypes.array.isRequired
  }

  constructor (props) {
    super();
    this._renderRow = this._renderRow.bind(this);
  }

  // https://github.com/facebook/react-native/issues/1040
  setNativeProps (nativeProps) {
    this._root.setNativeProps(nativeProps);
  }

  onProjectListItemTapped (project) {
    if (this.props.onProjectTap) {
      this.props.onProjectTap(project);
    }
  }

  _renderRow (rowData) {
    return (
      <TouchableHighlight onPress={this.onProjectListItemTapped.bind(this,rowData)}>
        <View ref={component => this._root = component}>
          <ProjectListItem  project={rowData} />
        </View>
      </TouchableHighlight>
    );    
  }

  render () {
    const ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});

    return (
      <ListView
        style={Style.projectList}
        dataSource={ds.cloneWithRows(this.props.projects)}
        renderRow={this._renderRow.bind(this)}
      />
    );    
  }
}
