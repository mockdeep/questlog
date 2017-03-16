import request from 'js/_helpers/request';
import RestfulStore from 'js/_common/restful_store';
import TaskStore from 'js/task/store';

const TagStore = {
  ...RestfulStore,

  name: 'tag',

  get(url) {
    return request({url, method: 'get', success() { /* do nothing */ }});
  },
};

TaskStore.subscribe(function triggerTagStoreChange() {
  TagStore.loaded = false;
  TagStore.notifyListeners();
});

export default TagStore;
