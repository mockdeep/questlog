import autobind from 'class-autobind';
import PropTypes from 'prop-types';
import React from 'react';

class NotificationCheckbox extends React.Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  componentDidMount() {
    this.notifyOnInterval();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.task.id !== this.props.task.id) { this.notifyTask(); }
    if (this.props.notificationsEnabled && !prevProps.notificationsEnabled) {
      this.notifyOnInterval();
    }
  }

  componentWillUnmount() {
    this.closeNotification();
  }

  notificationsPermitted() {
    return window.Notification.permission === 'granted';
  }

  requestNotificationPermission() {
    Notification.requestPermission().then((result) => {
      if (result === 'granted') {
        this.enableNotifications();

        return;
      }

      this.disableNotifications();
    });
  }

  enableNotifications() {
    if (this.notificationsPermitted()) {
      this.props.updateUser({notificationsEnabled: true});
    } else {
      this.requestNotificationPermission();
    }
  }

  notifyOnInterval() {
    if (!this.shouldShowNotifications()) { return; }

    this.notifyTask();
    setTimeout(this.notifyOnInterval, 60000);
  }

  notifyTask() {
    this.closeNotification();
    if (!this.shouldShowNotifications()) { return; }

    this.props.addNotification({
      key: 'task',
      message: this.props.task.title,
      onClick: this.completeTask,
    });
  }

  completeTask() {
    this.closeNotification();
    this.props.completeTask(this.props.task.id);
  }

  shouldShowNotifications() {
    return Boolean(this.props.task.id) &&
           this.props.notificationsEnabled &&
           this.notificationsPermitted();
  }

  toggleNotifications(event) {
    if (event.target.checked) {
      this.enableNotifications();
    } else {
      this.disableNotifications();
    }
  }

  disableNotifications() {
    this.closeNotification();
    this.props.updateUser({notificationsEnabled: false});
  }

  closeNotification() {
    this.props.removeNotification({key: 'task'});
  }

  render() {
    return (
      <label>
        {'Nag me about next task: '}
        <input
          type='checkbox'
          onChange={this.toggleNotifications}
          checked={this.shouldShowNotifications()}
        />
      </label>
    );
  }
}

NotificationCheckbox.propTypes = {
  addNotification: PropTypes.func.isRequired,
  completeTask: PropTypes.func.isRequired,
  notificationsEnabled: PropTypes.bool.isRequired,
  removeNotification: PropTypes.func.isRequired,
  task: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default NotificationCheckbox;
