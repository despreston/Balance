// Vendors
import React, { Component, PropTypes } from 'react';
import { View, ListView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

// Components
import ProjectListItem from './project-list-item/project-list-item';
import { Style } from './project-list-style';

function mapStateToProps (state) {
  return { loggedInUser: state.loggedInUser };
}

class ProjectList extends Component {

  static propTypes = {
    onProjectTap: PropTypes.func.isRequired,
    projects: PropTypes.array.isRequired,
    loggedInUser: PropTypes.string.isRequired
  }

  constructor (props) {
    super();
    this._renderRow = this._renderRow.bind(this);
  }

  // https://github.com/facebook/react-native/issues/1040
  setNativeProps (nativeProps) {
    this._root.setNativeProps(nativeProps);
  }

  _renderRow (rowData) {
    const hideNudgeBtn = rowData.owner[0].userId === this.props.loggedInUser;

    return (
      <TouchableOpacity
        onPress={ this.props.onProjectTap.bind(this, rowData) }
        style={ Style.project }>
        <View ref={ component => this._root = component }>
          <ProjectListItem project={ rowData } hideNudgeBtn={ hideNudgeBtn }/>
        </View>
      </TouchableOpacity>
    );    
  }

  render () {
    const ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});

    return (
      <ListView
        enableEmptySections={true}
        style={Style.projectList}
        dataSource={ds.cloneWithRows(this.props.projects)}
        renderRow={this._renderRow.bind(this)}
      />
    );    
  }
}

export default connect(mapStateToProps)(ProjectList);