import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// components
import Reactions from './reactions';

class ReactionsContainer extends Component {

  static propTypes = {
    reactions: PropTypes.array,
    note: PropTypes.string.isRequired
  }

  // /**
  //  * Handles tapping on an existing reaction
  //  * If the user has already added that reaction, then delete the reaction
  //  * otherwise, add the reaction to the note
  //  *
  //  * @param {String} reaction
  //  * @param {String} note The _id of the note
  //  * @returns {Promise}
  //  */
  // onReactionTap (reaction, note) {
  //   let existing = this.props.reactions.find(r => {
  //     return r.userId === this.props.loggedInUser && r.reaction === reaction;
  //   });

  //   if (existing) {
  //     return this.props.deleteReaction(existing._id);
  //   }

  //   return this.props.addReaction(reaction, note);
  // }

  render () {
    return <Reactions note={ this.props.note } reactions={ this.props.reactions }/>;
  }

}

export default connect()(ReactionsContainer);
