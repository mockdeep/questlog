'use strict';

import {extend} from 'lodash';

import RestfulStore from '_common/restful_store';
import Task from 'task/model';

export default extend({}, RestfulStore, {
  name: 'task',

  updateModels(data) {
    data.tasks = data.tasks.map(function buildTask(taskData) {
      return new Task(taskData);
    });
    RestfulStore.updateModels.call(this, data);
  }
});
