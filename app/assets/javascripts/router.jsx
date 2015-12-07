'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router');

var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var BulkTasksNew = require('./components/bulk_tasks/new');
var PrivacyPage = require('./components/static/privacy_page');
var WhatPage = require('./components/static/what_page');
var SessionsNew = require('./components/sessions/new');
var TasksIndex = require('./components/tasks/index');
var TasksShow = require('./components/tasks/show');
var TimeframesIndex = require('./components/timeframes/index');

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
    <Route path='/bulk_tasks/new' handler={BulkTasksNew} />
    <Route path='/free_accounts/new' handler={Nothing} />
    <Route path='/sessions/new' handler={SessionsNew} />
    <Route path='/sessions' handler={Nothing} />
    <Route path='/tasks' handler={TasksIndex} />
    <Route path='/privacy' handler={PrivacyPage} />
    <Route path='/what' handler={WhatPage} />
    <Route path='/timeframes' handler={TimeframesIndex} />
    <Route name='tag' path='/:slug' handler={TasksShow} />
    <DefaultRoute handler={TasksShow} />
  </Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
  ReactDOM.render(<Handler />, $('#app-base')[0]);
});
