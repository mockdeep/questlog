'use strict';

import React from 'react';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';

import appStore from 'js/app_store';
import routes from 'js/_config/routes';

export default (
  <Provider store={appStore}>
    <Router history={browserHistory}>{routes}</Router>
  </Provider>
);
