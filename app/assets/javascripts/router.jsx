'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var createBrowserHistory = require('history/lib/createBrowserHistory');

var history = createBrowserHistory();

var BulkTasksNew = require('containers/bulk_tasks/new');
var PrivacyPage = require('containers/static/privacy_page');
var WhatPage = require('containers/static/what_page');
var SessionsNew = require('containers/sessions/new');
var TasksIndex = require('containers/tasks/index');
var TasksShow = require('containers/tasks/show');
var TimeframesIndex = require('containers/timeframes/index');

var AppBase = React.createClass({
  propTypes: {
    children: React.PropTypes.object.isRequired
  },
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
