'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var createBrowserHistory = require('history/lib/createBrowserHistory');

var RouteHandler = Router.RouteHandler;
var history = createBrowserHistory();

var BulkTasksNew = require('components/bulk_tasks/new');
var PrivacyPage = require('components/static/privacy_page');
var WhatPage = require('components/static/what_page');
var SessionsNew = require('components/sessions/new');
var TasksIndex = require('components/tasks/index');
var TasksShow = require('components/tasks/show');
var TimeframesIndex = require('components/timeframes/index');

var AppBase = React.createClass({
  render: function () {
    return (
      <div>{this.props.children}</div>
    );
  }
});

var Nothing = React.createClass({
  render: function () { return false; }
});

var routes = (
  <Route path='/' component={AppBase}>
    <Route path='/bulk_tasks/new' component={BulkTasksNew} />
    <Route path='/free_accounts/new' component={Nothing} />
    <Route path='/sessions/new' component={SessionsNew} />
    <Route path='/sessions' component={Nothing} />
    <Route path='/tasks' component={TasksIndex} />
    <Route path='/privacy' component={PrivacyPage} />
    <Route path='/what' component={WhatPage} />
    <Route path='/timeframes' component={TimeframesIndex} />
    <IndexRoute component={TasksShow} />
    <Route path='/:slug' component={TasksShow} />
  </Route>
);

ReactDOM.render(<Router history={history}>{routes}</Router>, $('#app-base')[0]);
