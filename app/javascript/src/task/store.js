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

    return function unsubscribe() {
      const index = this.listeners.indexOf(listener);

      this.listeners.splice(index, 1);
    }.bind(this);
  },

  notifyListeners() {
    if (!this.listeners) { return; }

    this.listeners.forEach((listener) => { listener(); });
  },

  unload() {
    this.loaded = false;
    this.notifyListeners();
  },

  updateModels({data}) {
    this.models = data.map(function buildTask(taskData) {
      return {...taskData, estimateMinutes: estimateMinutes(taskData)};
    });
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

  update(id, attrs) {
    const data = {};

    data[this.name] = attrs;

    return request({
      data,
      url: `${this.url}/${id}`,
      success: this.unload.bind(this),
    });
  },
};
