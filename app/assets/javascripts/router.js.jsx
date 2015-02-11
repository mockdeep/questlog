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
      <Route path='/sessions/new' handler={Questlog.Nothing} />
      <Route path='/sessions' handler={Questlog.Nothing} />
      <Route path='/tasks' handler={Questlog.Nothing} />
      <Route path='/privacy' handler={Questlog.Nothing} />
      <Route path='/what' handler={Questlog.Nothing} />
      <Route name='tag' path='/:slug' handler={Questlog.TasksShow} />
      <DefaultRoute handler={Questlog.TasksShow} />
    </Route>
  );

  $(document).ready(function () {
    Router.run(routes, Router.HistoryLocation, function (Handler) {
      window.Handler = Handler;
      React.render(<Handler />, $('#app-base')[0]);
    });
  });

})();
