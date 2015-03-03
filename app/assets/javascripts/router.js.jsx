(function () {

  'use strict';

  var Router = ReactRouter;

  var DefaultRoute = Router.DefaultRoute;
  var Route = Router.Route;
  var RouteHandler = Router.RouteHandler;
  Questlog.Link = Router.Link;

  var AppBase = React.createClass({
    render: function () {
      return (
        <RouteHandler />
      );
    }
  });

  Questlog.Nothing = React.createClass({
    render: function () { return false; }
  });

  var routes = (
    <Route handler={AppBase} path='/'>
      <Route path='/bulk_tasks/new' handler={Questlog.BulkTaskForm} />
      <Route path='/sessions/new' handler={Questlog.SessionsNew} />
      <Route path='/sessions' handler={Questlog.Nothing} />
      <Route path='/tasks' handler={Questlog.TasksIndex} />
      <Route path='/privacy' handler={Questlog.PrivacyPage} />
      <Route path='/what' handler={Questlog.WhatPage} />
      <Route name='tag' path='/:slug' handler={Questlog.TasksShow} />
      <DefaultRoute handler={Questlog.TasksShow} />
    </Route>
  );

  Router.run(routes, Router.HistoryLocation, function (Handler) {
    React.render(<Handler />, $('#app-base')[0]);
  });

})();
