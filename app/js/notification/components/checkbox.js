import React from 'react';

export default React.createClass({
  propTypes: {
    addNotification: React.PropTypes.func.isRequired,
    completeTask: React.PropTypes.func.isRequired,
    disableNotifications: React.PropTypes.func.isRequired,
    enableNotifications: React.PropTypes.func.isRequired,
    notificationsEnabled: React.PropTypes.bool.isRequired,
    notificationsPermitted: React.PropTypes.bool.isRequired,
    removeNotification: React.PropTypes.func.isRequired,
    task: React.PropTypes.object.isRequired,
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

  notifyOnInterval() {
    if (!this.shouldShowNotifications()) { return; }

    this.notifyTask();
    setTimeout(this.notifyOnInterval, 60000);
  },

  notifyTask() {
    this.props.removeNotification({type: 'task'});
    if (!this.shouldShowNotifications()) { return; }

    const notification = new Notification(this.props.task.title);

    notification.onclick = function notificationClick() {
      this.props.completeTask(this.props.task.id);
      notification.close();
    }.bind(this);
    this.props.addNotification({type: 'task', notification});
  },

  shouldShowNotifications() {
    return Boolean(this.props.task.id) &&
           this.props.notificationsEnabled &&
           this.props.notificationsPermitted;
  },

  toggleNotifications(event) {
    if (event.target.checked) {
      this.props.enableNotifications();
    } else {
      this.disableNotifications();
    }
  },

  disableNotifications() {
    this.closeNotification();
    this.props.disableNotifications();
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
