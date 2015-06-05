'use strict';

var React = require('react');
var Router = require('react-router');

var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var BulkTaskForm = require('./components/bulk_task_form');
var PrivacyPage = require('./components/static/privacy_page');
var WhatPage = require('./components/static/what_page');
var ScratchPage = require('./components/scratch_page');
var SessionsNew = require('./components/sessions_new');
var TasksIndex = require('./components/tasks_index');
var TasksShow = require('./components/tasks/show');
var TimeframesIndex = require('./components/timeframes_index');

var AppBase = React.createClass({
  render: function () {
    return (
      <RouteHandler />
    );
  }
});

var Nothing = React.createClass({
  render: function () { return false; }
});

var routes = (
  <Route handler={AppBase} path='/'>
    <Route path='/bulk_tasks/new' handler={BulkTaskForm} />
    <Route path='/free_accounts/new' handler={Nothing} />
    <Route path='/sessions/new' handler={SessionsNew} />
    <Route path='/sessions' handler={Nothing} />
    <Route path='/tasks' handler={TasksIndex} />
    <Route path='/privacy' handler={PrivacyPage} />
    <Route path='/what' handler={WhatPage} />
    <Route path='/scratch' handler={ScratchPage} />
    <Route path='/timeframes' handler={TimeframesIndex} />
    <Route name='tag' path='/:slug' handler={TasksShow} />
    <DefaultRoute handler={TasksShow} />
  </Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler />, $('#app-base')[0]);
});
