import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

import appStore from 'src/app_store';
import routes from 'src/_config/routes';
import {fetchTasks} from 'src/task/action_creators';

appStore.dispatch(fetchTasks());

const appBase =
  <Provider store={appStore}>
    <BrowserRouter>{routes}</BrowserRouter>
  </Provider>

;

export default appBase;
