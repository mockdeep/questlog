import React from 'react';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';

import appStore from 'src/app_store';
import routes from 'src/_config/routes';
import {fetchTasks} from 'src/task/action_creators';

appStore.dispatch(fetchTasks());

export default
  <Provider store={appStore}>
    <Router history={browserHistory}>{routes}</Router>
  </Provider>
;
