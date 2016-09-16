'use strict';

const React = require('react');
const Router = require('react-router').Router;
const browserHistory = require('react-router').browserHistory;

const routes = require('_config/routes');

module.exports = <Router history={browserHistory}>{routes}</Router>;
