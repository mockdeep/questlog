(function () {
  'use strict';

  var Router = ReactRouter;

  var DefaultRoute = Router.DefaultRoute;
  var Route = Router.Route;
  var RouteHandler = Router.RouteHandler;
  Questlog.Link = Router.Link;

  var TasksShow = require('./components/tasks_show');
  var BulkTaskForm = require('./components/bulk_task_form');

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
      <Route path='/sessions/new' handler={Questlog.SessionsNew} />
      <Route path='/sessions' handler={Nothing} />
      <Route path='/tasks' handler={Questlog.TasksIndex} />
      <Route path='/privacy' handler={Questlog.PrivacyPage} />
      <Route path='/what' handler={Questlog.WhatPage} />
      <Route path='/scratch' handler={Questlog.ScratchPage} />
      <Route path='/timeframes' handler={Questlog.TimeframesIndex} />
      <Route name='tag' path='/:slug' handler={TasksShow} />
      <DefaultRoute handler={TasksShow} />
    </Route>
  );

  Router.run(routes, Router.HistoryLocation, function (Handler) {
    React.render(<Handler />, $('#app-base')[0]);
  });
})();
