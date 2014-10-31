/** @jsx React.DOM */

(function () {

  'use strict';

  Questlog.TaskDisplay = React.createClass({
    render: function () {
      return (
        <div>
          <Questlog.TaskTitle task={this.props.task} />
          <Questlog.MainButtons task={this.props.task} />
          <hr />
          <div id='edit-form'>
            <Questlog.EditTaskForm task={this.props.task} />
          </div>
        </div>
      );
    }
  });

})();
