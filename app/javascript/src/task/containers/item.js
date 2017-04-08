import React from 'react';
import {connect} from 'react-redux';

import {deleteTask, updateTask} from 'src/task/action_creators';
import {updateUser} from 'src/user/action_creators';
import TaskItem from 'src/task/components/item';
import QNotification from 'src/q_notification';

const ItemContainer = React.createClass({
  propTypes: {
    deleteTask: React.PropTypes.func.isRequired,
    params: React.PropTypes.object.isRequired,
    updateUser: React.PropTypes.func.isRequired,
    user: React.PropTypes.object.isRequired,
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
        deleteTask={this.props.deleteTask}
        requestNotificationPermission={this.requestNotificationPermission}
        notificationsEnabled={this.notificationsEnabled()}
        notificationsPermitted={this.notificationsPermitted()}
        enableNotifications={this.enableNotifications}
        disableNotifications={this.disableNotifications}
      />
    );
  },
});

function mapStateToProps(state) {
  return {user: state.user};
}

const actionCreators = {deleteTask, updateTask, updateUser};

export default connect(mapStateToProps, actionCreators)(ItemContainer);
