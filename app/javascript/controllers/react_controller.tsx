import React from 'react';
import ReactDOM from 'react-dom';
import {Controller} from '@hotwired/stimulus';
import {Provider} from 'react-redux';

import appStore from 'src/app_store';
import RouterContainer from 'src/route/containers/router';
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

    ReactDOM.render(
      <Provider store={appStore}>
        <div>
          <RouterContainer />
        </div>
      </Provider>,
      this.element,
    );
  }
}

export default ReactController;
