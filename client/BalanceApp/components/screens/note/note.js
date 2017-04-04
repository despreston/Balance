// vendors
import React, { Component, PropTypes } from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';

// actions
import { fetchNote } from '../../../actions';

// utils
import { formatDate } from '../../../utils/helpers';

// styles
import Styles from './note-styles';

function mapStateToProps (state, ownProps) {
  return {
    note: state.notes[ownProps.navigation.state.params.id]
  };
}

class Note extends Component {

  static navigationOptions = {
    header: ({ state, navigate }, defaultHeader) => {
      const title = 'Note';

      return { ...defaultHeader, title };
    }
  }
  
  constructor (props) {
    super(props);

    this.author = props.note.author[0];

    props.fetchNote(props.navigation.state.params.id);
  }

  header () {
    switch (this.props.note.type) {
      case 'Past': return 'Completed';
      case 'Future': return 'Reminder';
    }
  }

  goToProject () {
    const project = this.props.note.project._id;

    this.props.navigation.navigate('Project', { project });
  }

  goToAuthor () {
    const userId = this.author.userId;

    this.props.navigation.navigate('UserProfile', { userId });
  }

  render () {
    const { note } = this.props;

    return (
      <ScrollView style={ Styles.container }>
        <View style={ Styles.meta }>
          <Image
            style={ Styles.authorImage }
            source={{ uri: this.author.picture }}
          />
          <View style={ Styles.info }>
            <Text style={ Styles.header }>{ this.header() }</Text>
            <Text style={[ Styles.text, Styles.subheader ]}>
              for { }
              <Text onPress={ () => this.goToProject() } style={ Styles.purple }>
                { note.project.title }
              </Text>
              { } by { }
              <Text onPress={ () => this.goToAuthor() } style={ Styles.purple }>
                { this.author.username }
              </Text>
            </Text>
          </View>
        </View>
        <Text style={[ Styles.note, Styles.text ]}>{ note.content }</Text>
        <Text style={ Styles.date }>{ formatDate(note.createdAt) }</Text>
      </ScrollView>
    );
  }

};

export default connect(mapStateToProps, { fetchNote })(Note);