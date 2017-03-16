import request from 'js/_helpers/request';

import RestfulStore from 'js/_common/restful_store';
import TaskStore from 'js/task/store';

const BulkTaskStore = {
  ...RestfulStore,

  name: 'bulk_task',

  update(attrs) {
    const data = {};

    data[this.name] = attrs;

    return request({data, url: this.url(), success: this.unload.bind(this)});
  },
};

BulkTaskStore.subscribe(function unloadTaskStore() { TaskStore.unload(); });
export default BulkTaskStore;
