'use strict';

import React from 'react';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';

import store from 'js/_common/store';
import routes from 'js/_config/routes';

export default (
  <Provider store={store}>
    <Router history={browserHistory}>{routes}</Router>
  </Provider>
);
