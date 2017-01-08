'use strict';

import {extend} from 'lodash';

import request from 'js/_helpers/request';
import RestfulStore from 'js/_common/restful_store';
import TaskStore from 'js/task/store';

const TagStore = extend({}, RestfulStore, {
  name: 'tag',

  get(url) {
    return request({url, method: 'get', success() { /* do nothing */ }});
  }
});

TaskStore.on('change', function triggerTagStoreChange() {
  TagStore.loaded = false;
  TagStore.trigger('change');
});

export default TagStore;
