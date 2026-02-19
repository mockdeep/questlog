import {request} from "helpers/request";

function estimateMinutes(task: Task): number {
  return Math.floor((task.estimateSeconds || 1800) / 60);
}

const TaskStore: TaskStoreType = {
  listeners: [],
  loaded: false,
  models: [],
  name: "task",
  url: "/tasks",

  subscribe(listener) {
    this.listeners = [...this.listeners, listener];

    return this.unsubscribe.bind(this, listener);
  },

  unsubscribe(listener): void {
    const index = this.listeners.indexOf(listener);

    this.listeners.splice(index, 1);
  },

  notifyListeners(): void {
    if (!this.listeners) { return; }

    this.listeners.forEach(listener => { listener(); });
  },

  unload(): void {
    this.loaded = false;
    this.notifyListeners();
  },

  updateModels({data}): void {
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
    case "tasks/FETCH":
      this.fetchTasks();
      break;
    default:
      throw new Error(`invalid action type ${action.type}`);
    }
  },

  fetchTasks(): void {
    request(this.url, {method: "GET", success: this.updateModels.bind(this)});
  },
};

export default TaskStore;
