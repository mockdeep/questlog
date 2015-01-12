/** @jsx React.DOM */

(function () {

  'use strict';

  Questlog.TasksShow = React.createClass({
    render: function () {
      return (
        <div>
          <Questlog.TaskDisplay />
          <Questlog.NewTaskForm />
        </div>
      );
    }
  });
})();
