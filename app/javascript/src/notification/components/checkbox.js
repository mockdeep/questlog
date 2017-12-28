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
    const {notificationsEnabled, task} = this.props;

    if (prevProps.task.id !== task.id) { this.notifyTask(); }
    if (notificationsEnabled && !prevProps.notificationsEnabled) {
      this.notifyOnInterval();
    }
  }

  componentWillUnmount() {
    this.closeNotification();
  }

  enableNotifications() {
    const {updateUser} = this.props;

    updateUser({notificationsEnabled: true});
  }

  notifyOnInterval() {
    if (!this.shouldShowNotifications()) { return; }

    this.notifyTask();
    setTimeout(this.notifyOnInterval, 60000);
  }

  notifyTask() {
    this.closeNotification();
    if (!this.shouldShowNotifications()) { return; }

    const {addNotification, task} = this.props;

    addNotification({
      key: 'currentTask',
      message: task.title,
      onClick: this.completeTask,
    });
  }

  completeTask() {
    const {completeTask, task} = this.props;

    this.closeNotification();
    completeTask(task.id);
  }

  shouldShowNotifications() {
    const {notificationsEnabled, task} = this.props;

    return Boolean(task.id) && notificationsEnabled;
  }

  toggleNotifications(event) {
    if (event.target.checked) {
      this.enableNotifications();
    } else {
      this.disableNotifications();
    }
  }

  disableNotifications() {
    const {updateUser} = this.props;

    this.closeNotification();
    updateUser({notificationsEnabled: false});
  }

  closeNotification() {
    const {removeNotification} = this.props;

    removeNotification({key: 'currentTask'});
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
