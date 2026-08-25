/*
 * Lets the parts of the app that hold on to tasks know when one has changed,
 * so that they can reload.
 */
const TaskChangeNotifier: TaskChangeNotifierType = {
  listeners: [],

  notifyListeners(): void {
    this.listeners.forEach((listener) => { listener(); });
  },

  subscribe(listener) {
    this.listeners = [...this.listeners, listener];

    return this.unsubscribe.bind(this, listener);
  },

  unsubscribe(listener): void {
    const index = this.listeners.indexOf(listener);

    this.listeners.splice(index, 1);
  },
};

export default TaskChangeNotifier;
