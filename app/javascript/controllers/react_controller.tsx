import React from 'react';
import ReactDOM from 'react-dom';
import {Controller} from '@hotwired/stimulus';

import AppBase from 'src/app_base';
import appStore from 'src/app_store';
import {fetchRoute} from 'src/route/action_creators';
import {fetchTasks} from 'src/task/action_creators';
import {removeNotification} from 'src/notification/action_creators';

class ReactController extends Controller {
  connect() {
    appStore.dispatch(fetchRoute());
    appStore.dispatch(fetchTasks());

    window.addEventListener('beforeunload', () => {
      appStore.dispatch(removeNotification({key: 'currentTask'}));
    });

    ReactDOM.render(<AppBase />, this.element);
  }
}

export default ReactController;
