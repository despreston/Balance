import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import actions from '../../actions/';
import styles from './bookmark-button-styles';

class BookmarkButton extends Component {

  static mapStateToProps (state, ownProps) {
    // find the bookmark belonging to this user and project
    const bookmark = Object.keys(state.bookmarks)
      .map(id => state.bookmarks[id])
      .find(bookmark => {
        return bookmark.project === ownProps.project &&
          bookmark.bookmarker.userId === state.loggedInUser;
      });

    return { bookmark };
  }

  static propTypes = {
    project: PropTypes.string.isRequired,
    bookmark: PropTypes.object
  }

  constructor (props) {
    super(props);
    this.toggleBookmark = this.toggleBookmark.bind(this);
  }

  toggleBookmark () {
    if (!this.props.bookmark) {
      this.props.dispatch(actions.createBookmark({ project: this.props.project }));
    } else {
      this.props.dispatch(actions.deleteBookmark(this.props.bookmark._id));
    }
  }

  render () {
    return (
      <TouchableOpacity onPress={ this.toggleBookmark } style={ styles.touchable }>
        <Image
          source={
            this.props.bookmark
              ? require('../../assets/icons/star-filled.png')
              : require('../../assets/icons/star.png')
          }
          style={ styles.icon }
        />
      </TouchableOpacity>
    );
  }

}

export default connect(BookmarkButton.mapStateToProps)(BookmarkButton);
