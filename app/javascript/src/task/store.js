import request from 'src/_helpers/request';

function estimateMinutes(task) {
  return Math.floor((task.estimateSeconds || 1800) / 60);
}

export default {
  listeners: [],
  loaded: false,
  models: [],
  name: 'task',
  url: '/tasks',

  subscribe(listener) {
    this.listeners = [...this.listeners, listener];

    return this.unsubscribe.bind(this, listener);
  },

  unsubscribe(listener) {
    const index = this.listeners.indexOf(listener);

    this.listeners.splice(index, 1);
  },

  notifyListeners() {
    if (!this.listeners) { return; }

    this.listeners.forEach(listener => { listener(); });
  },

  unload() {
    this.loaded = false;
    this.notifyListeners();
  },

  updateModels({data}) {
    this.models = data.map(taskData => ({
      ...taskData,
      estimateMinutes: estimateMinutes(taskData),
    }));
    this.loaded = true;
    this.notifyListeners();
  },

  getState() {
    return {
      loaded: this.loaded,
      tasks: this.models,
    };
  },

  dispatch(action) {
    switch (action.type) {
    case 'tasks/FETCH':
      this.fetchTasks();
      break;
    default:
      throw new Error(`invalid action type ${action.type}`);
    }
  },

  fetchTasks() {
    request({
      method: 'get',
      url: this.url,
      success: this.updateModels.bind(this),
    });
  },
};
