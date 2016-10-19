'use strict';

import {Provider} from 'react-redux';
import store from '_common/store';

const React = require('react');
const Router = require('react-router').Router;
const browserHistory = require('react-router').browserHistory;

const routes = require('_config/routes');

export default (
  <Provider store={store}>
    <Router history={browserHistory}>{routes}</Router>
  </Provider>
);
