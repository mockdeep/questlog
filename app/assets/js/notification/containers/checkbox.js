import React from 'react';

export default React.createClass({
  propTypes: {
    task: React.PropTypes.object.isRequired,
    completeTask: React.PropTypes.func.isRequired,
    enableNotifications: React.PropTypes.func.isRequired,
    disableNotifications: React.PropTypes.func.isRequired,
    notificationsEnabled: React.PropTypes.bool.isRequired,
    notificationsPermitted: React.PropTypes.bool.isRequired
  },

  getInitialState() {
    return {};
  },

  componentDidMount() {
    window.addEventListener('beforeunload', this.closeNotification);
    this.notifyOnInterval();
  },

  componentWillUnmount() {
    this.closeNotification();
  },

  componentDidUpdate(prevProps) {
    if (prevProps.task.id !== this.props.task.id) { this.notifyTask(); }
    if (this.props.notificationsEnabled && !prevProps.notificationsEnabled) {
      this.notifyOnInterval();
    }
  },

  notifyOnInterval() {
    if (!this.shouldShowNotifications()) { return; }

    this.notifyTask();
    setTimeout(this.notifyOnInterval, 60000);
  },

  notifyTask() {
    if (this.state.taskNotification) { this.state.taskNotification.close(); }
    if (!this.shouldShowNotifications()) { return; }

    const notification = new Notification(this.props.task.title);

    notification.onclick = function notificationClick() {
      this.props.completeTask(this.props.task.id);
      notification.close();
    }.bind(this);
    this.setState({taskNotification: notification});
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
    if (this.state.taskNotification) {
      this.state.taskNotification.close();
      this.setState({taskNotification: null});
    }
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
  }
});
