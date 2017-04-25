import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

// actions
import actions from '../../../actions/';

// components
import Icon from '../../navigation/icon';
import Note from './note';
import AddUpdateContainer from '../../add-update/add-update-container';

class NoteContainer extends Component {

  static mapStateToProps (state, ownProps) {
    let noteId = ownProps.navigation.state.params.id;

    let comments = Object.keys(state.comments)
      .map(id => state.comments[id])
      .filter(c => c.note === noteId);

    return {
      note: state.notes[noteId],
      comments,
      loggedInUser: state.loggedInUser
    };
  }

  static navigationOptions = {
    header: ({ state, navigate }, defaultHeader) => {
      let right = null;

      if (state.params.showEdit) {
        right = (
          <Icon
            imagePath={ require('../../../assets/icons/edit-white.png') }
            onPress={ () => state.params.onEdit() }
          />
        );
      }

      return { ...defaultHeader, right, title: 'Note' };
    }
  };
  
  constructor (props) {
    super(props);

    this.state = { editModalVisible: false };

    this.toggleEditModal = this.toggleEditModal.bind(this);

    props.dispatch(actions.fetchNote(props.navigation.state.params.id));
  }

  componentWillMount () {
    let showEdit = this.props.note.author.userId === this.props.loggedInUser;

    this.props.navigation.setParams({
      showEdit,
      onEdit: this.toggleEditModal.bind(this)
    });
  }

  goToProject () {
    const project = this.props.note.project._id;
    this.props.navigation.navigate('Project', { project });
  }

  goToUser (userId) {
    this.props.navigation.navigate('UserProfile', { userId });
  }

  sendComment (content) {
    const comment = {
      note: this.props.note._id,
      user: this.props.loggedInUser,
      content
    };

    this.props.dispatch(actions.createComment(comment));
  }

  toggleEditModal () {
    this.setState({ editModalVisible: !this.state.editModalVisible });
  }

  render () {
    return (
      <View style={{ flex: 1 }}>
        <Note
          note={ this.props.note }
          comments={ this.props.comments }
          goToProject={ () => this.goToProject() }
          goToUser={ user => this.goToUser(user) }
          sendComment={ content => this.sendComment(content) }
        />
        <AddUpdateContainer
          note={ this.props.note }
          project={ this.props.note.project }
          hideFn={ () => this.toggleEditModal() }
          visible={ this.state.editModalVisible }
        />
      </View>
    );
  }

}

export default connect(
  NoteContainer.mapStateToProps,
)(NoteContainer);