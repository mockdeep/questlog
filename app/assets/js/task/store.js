'use strict';

import RestfulStore from 'js/_common/restful_store';
import Task from 'js/task/model';

export default Object.assign({}, RestfulStore, {
  name: 'task',

  updateModels(data) {
    data.tasks = data.tasks.map(function buildTask(taskData) {
      return new Task(taskData);
    });
    RestfulStore.updateModels.call(this, data);
  }
});
