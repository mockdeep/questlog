'use strict';

const React = require('react');
const Route = require('react-router').Route;
const IndexRoute = require('react-router').IndexRoute;

const AppBase = require('app_base');
const BulkTasksNew = require('task/containers/bulk_new');
const PrivacyPage = require('static/containers/privacy_page');
const WhatPage = require('static/containers/what_page');
const SessionsNew = require('session/containers/new');
const TaskList = require('task/containers/list');
const TaskItem = require('task/containers/item');
const TimeframeList = require('timeframe/containers/list');

const Nothing = React.createClass({render() { return false; }});

module.exports = ( // eslint-disable-line no-extra-parens
  <Route path='/' component={AppBase}>
    <Route path='/bulk_tasks/new' component={BulkTasksNew} />
    <Route path='/free_accounts/new' component={Nothing} />
    <Route path='/sessions/new' component={SessionsNew} />
    <Route path='/sessions' component={Nothing} />
    <Route path='/tasks' component={TaskList} />
    <Route path='/privacy' component={PrivacyPage} />
    <Route path='/what' component={WhatPage} />
    <Route path='/timeframes' component={TimeframeList} />
    <IndexRoute component={TaskItem} />
    <Route path='/:slug' component={TaskItem} />
  </Route>
);
