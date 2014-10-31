/** @jsx React.DOM */

(function () {

  'use strict';

  // next step need to move `disable()` up to here, and re-enable on updateTask
  Questlog.TaskDisplay = React.createClass({
    loadTask: function (callback) {
      Questlog.request({
        method: 'get',
        url: window.location.pathname,
        success: this.updateTask,
        error: Questlog.logError
      });
    },
    updateTask: function (data) {
      data = data || {title: '(no tasks!)'};
      this.setState({task: data, disabled: false});
    },
    getInitialState: function () {
      return {task: {}, disabled: false};
    },
    componentDidMount: function () {
      this.loadTask();
    },
    disable: function () {
      this.setState({disabled: true});
    },
    render: function () {
      return (
        <div>
          <Questlog.TaskTitle task={this.state.task} loadTask={this.loadTask} />
          <Questlog.MainButtons task={this.state.task}
                                loadTask={this.loadTask}
                                disabled={this.state.disabled}
                                disable={this.disable} />
          <hr />
          <div id='edit-form'>
            <Questlog.EditTaskForm task={this.state.task} loadTask={this.loadTask} />
          </div>
        </div>
      );
    }
  });

})();
