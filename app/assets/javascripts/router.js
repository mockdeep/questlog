'use strict';

import {Provider} from 'react-redux';
import store from '_common/store';

import React from 'react';
import {Router, browserHistory} from 'react-router';

import routes from '_config/routes';

export default (
  <Provider store={store}>
    <Router history={browserHistory}>{routes}</Router>
  </Provider>
);
