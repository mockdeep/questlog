/** @jsx React.DOM */

(function () {

  'use strict';

  var Router = Backbone.Router.extend({
    routes: {
      '': 'selectTag',
      'tasks': 'doNothing',
      ':slug': 'selectTag'
    },

    doNothing: function () {},

    selectTag: function () {
      React.render(
        <Questlog.TasksShow url={window.location.pathname}/>,
        $('#app-base')[0]
      );
    }
  });

  $(document).ready(function () {
    Questlog.router = new Router();

    Backbone.history.start({pushState: true})
  });

})();
