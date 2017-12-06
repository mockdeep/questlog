import autobind from 'class-autobind';
import PropTypes from 'prop-types';
import React from 'react';

import {taskShape} from 'src/shapes';

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

  enableNotifications() {
    this.props.updateUser({notificationsEnabled: true});
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
      key: 'currentTask',
      message: this.props.task.title,
      onClick: this.completeTask,
    });
  }

  completeTask() {
    this.closeNotification();
    this.props.completeTask(this.props.task.id);
  }

  shouldShowNotifications() {
    return Boolean(this.props.task.id) && this.props.notificationsEnabled;
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
    this.props.removeNotification({key: 'currentTask'});
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
  task: taskShape.isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default NotificationCheckbox;
