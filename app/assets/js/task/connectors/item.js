'use strict';

import React from 'react';
import {connect} from 'react-redux';

import {updateUser} from 'js/user/actions';
import TaskItem from 'js/task/containers/item';
import QNotification from 'js/q_notification';

const ItemConnector = React.createClass({
  propTypes: {
    params: React.PropTypes.object.isRequired,
    updateUser: React.PropTypes.func.isRequired,
    user: React.PropTypes.object.isRequired
  },

  enableNotifications() {
    if (this.notificationsPermitted()) {
      this.props.updateUser({notificationsEnabled: true});
    } else {
      this.requestNotificationPermission();
    }
  },

  disableNotifications() {
    this.props.updateUser({notificationsEnabled: false});
  },

  notificationsPermitted() {
    return QNotification.isPermissionGranted();
  },

  notificationsEnabled() {
    return Boolean(this.props.user.notificationsEnabled);
  },

  requestNotificationPermission() {
    Notification.requestPermission().then(function notificationPermit(result) {
      if (result === 'granted') {
        this.enableNotifications();

        return;
      }

      this.disableNotifications();
    }.bind(this));
  },

  render() {
    return (
      <TaskItem
        params={this.props.params}
        requestNotificationPermission={this.requestNotificationPermission}
        notificationsEnabled={this.notificationsEnabled()}
        notificationsPermitted={this.notificationsPermitted()}
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
