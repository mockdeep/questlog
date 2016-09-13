'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const Router = require('react-router').Router;
const Route = require('react-router').Route;
const IndexRoute = require('react-router').IndexRoute;
const createBrowserHistory = require('history/lib/createBrowserHistory');

const history = createBrowserHistory();

const BulkTasksNew = require('task/containers/bulk_new');
const PrivacyPage = require('static/containers/privacy_page');
const WhatPage = require('static/containers/what_page');
const SessionsNew = require('session/containers/new');
const TasksIndex = require('task/containers/list');
const TasksShow = require('task/containers/item');
const TimeframesIndex = require('timeframe/containers/list');

const AppBase = React.createClass({
  propTypes: {children: React.PropTypes.object.isRequired},
  render() {
    return (
      <div>{this.props.children}</div>
    );
  }
});

const Nothing = React.createClass({render() { return false; }});

const routes =
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
  </Route>;

ReactDOM.render(<Router history={history}>{routes}</Router>, $('#app-base')[0]);
