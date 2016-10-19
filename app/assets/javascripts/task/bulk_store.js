'use strict';

import {extend} from 'lodash';

import request from '_helpers/request';

import RestfulStore from '_common/restful_store';
import TaskStore from 'task/store';

const BulkTaskStore = extend({}, RestfulStore, {
  name: 'bulk_task',

  update(attrs) {
    const data = {};

    data[this.name] = attrs;

    return request({data, url: this.url(), success: this.unload.bind(this)});
  }
});

BulkTaskStore.on('change', function unloadTaskStore() { TaskStore.unload(); });
export default BulkTaskStore;
