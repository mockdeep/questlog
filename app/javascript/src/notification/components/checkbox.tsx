import autobind from 'class-autobind';
import React, {ChangeEvent} from 'react';

type Props = {
  addNotification: Function;
  completeTask: Function;
  notificationsEnabled: boolean;
  removeNotification: Function;
  task: Task;
  updateUser: Function;
};

class NotificationCheckbox extends React.Component<Props, never> {
  constructor(props: Props) {
    super(props);
    autobind(this);
  }

  componentDidMount() {
    this.notifyOnInterval();
  }

  componentDidUpdate(prevProps: Props) {
    const {notificationsEnabled, task} = this.props;

    if (prevProps.task.id !== task.id) { this.notifyTask(); }
    if (notificationsEnabled && !prevProps.notificationsEnabled) {
      this.notifyOnInterval();
    }
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

  toggleNotifications(event: ChangeEvent<HTMLInputElement>) {
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

export default NotificationCheckbox;
