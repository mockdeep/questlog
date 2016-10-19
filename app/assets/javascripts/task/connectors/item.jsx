'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {updateUser} from 'user/actions';
import TaskItem from 'task/containers/item';

const ItemConnector = React.createClass({
  propTypes: {
    params: React.PropTypes.object.isRequired,
    updateUser: React.PropTypes.func.isRequired,
    user: React.PropTypes.object.isRequired
  },

  enableNotifications() {
    this.props.updateUser({notificationsEnabled: true});
  },

  disableNotifications() {
    this.props.updateUser({notificationsEnabled: false});
  },

  render() {
    return (
      <TaskItem
        params={this.props.params}
        notificationsEnabled={Boolean(this.props.user.notificationsEnabled)}
        enableNotifications={this.enableNotifications}
        disableNotifications={this.disableNotifications}
      />
    );
  }
});

function mapStateToProps(state) {
  return {user: state.user};
}

export default connect(mapStateToProps, {updateUser})(ItemConnector);
