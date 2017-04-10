import React from 'react';

import QNotification from 'src/q_notification';

const NotificationCheckbox = React.createClass({
  propTypes: {
    addNotification: React.PropTypes.func.isRequired,
    completeTask: React.PropTypes.func.isRequired,
    notificationsEnabled: React.PropTypes.bool.isRequired,
    removeNotification: React.PropTypes.func.isRequired,
    task: React.PropTypes.object.isRequired,
    updateUser: React.PropTypes.func.isRequired,
  },

  componentDidMount() {
    window.addEventListener('beforeunload', this.closeNotification);
    this.notifyOnInterval();
  },

  componentDidUpdate(prevProps) {
    if (prevProps.task.id !== this.props.task.id) { this.notifyTask(); }
    if (this.props.notificationsEnabled && !prevProps.notificationsEnabled) {
      this.notifyOnInterval();
    }
  },

  componentWillUnmount() {
    this.closeNotification();
  },

  notificationsPermitted() {
    return QNotification.isPermissionGranted();
  },

  requestNotificationPermission() {
    Notification.requestPermission().then((result) => {
      if (result === 'granted') {
        this.enableNotifications();

        return;
      }

      this.disableNotifications();
    });
  },

  enableNotifications() {
    if (this.notificationsPermitted()) {
      this.props.updateUser({notificationsEnabled: true});
    } else {
      this.requestNotificationPermission();
    }
  },

  notifyOnInterval() {
    if (!this.shouldShowNotifications()) { return; }

    this.notifyTask();
    setTimeout(this.notifyOnInterval, 60000);
  },

  notifyTask() {
    this.props.removeNotification({type: 'task'});
    if (!this.shouldShowNotifications()) { return; }

    const notification = new Notification(this.props.task.title);

    notification.onclick = () => {
      this.props.completeTask(this.props.task.id);
      notification.close();
    };
    this.props.addNotification({type: 'task', notification});
  },

  shouldShowNotifications() {
    return Boolean(this.props.task.id) &&
           this.props.notificationsEnabled &&
           this.notificationsPermitted();
  },

  toggleNotifications(event) {
    if (event.target.checked) {
      this.enableNotifications();
    } else {
      this.disableNotifications();
    }
  },

  disableNotifications() {
    this.closeNotification();
    this.props.updateUser({notificationsEnabled: false});
  },

  closeNotification() {
    this.props.removeNotification({type: 'task'});
  },

  render() {
    return (
      <label>
        {'Nag me about next task: '}
        <input
          type='checkbox'
          onClick={this.toggleNotifications}
          value={this.shouldShowNotifications}
        />
      </label>
    );
  },
});

export default NotificationCheckbox;
