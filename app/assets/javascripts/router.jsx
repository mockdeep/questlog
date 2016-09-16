'use strict';

const React = require('react');
const Router = require('react-router').Router;
const createBrowserHistory = require('history/lib/createBrowserHistory');

const routes = require('_config/routes');

const history = createBrowserHistory();

module.exports = <Router history={history}>{routes}</Router>;
