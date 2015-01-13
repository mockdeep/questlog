/** @jsx React.DOM */

(function () {

  'use strict';

  Questlog.TasksShow = React.createClass({
    getInitialState: function () {
      return {task: {title: 'Loading...'}, disabled: true, tags: []};
    },
    loadTask: function () {
      Questlog.request({
        method: 'get',
        url: window.location.pathname,
        success: this.updateTask
      });
      Questlog.request({
        method: 'get',
        url: '/tags',
        success: this.updateTags
      });
    },
    updateTask: function (data) {
      if (data) {
        this.setState({task: data.task, disabled: false});
      } else {
        this.setState({task: {title: '(no tasks!)'}, disabled: true});
      }
      this.setTitle();
    },
    updateTags: function (data) {
      this.setState({tags: data.tags});
    },
    disable: function () {
      this.setState({disabled: true});
    },
    setTitle: function () {
      document.title = 'Task: ' + this.state.task.title;
    },
    componentDidMount: function () {
      this.setTitle();
      this.loadTask();
    },
    render: function () {
      return (
        <div>
          <Questlog.TaskDisplay task={this.state.task}
                                tags={this.state.tags}
                                disable={this.disable}
                                loadTask={this.loadTask}
                                disabled={this.state.disabled} />
          <Questlog.NewTaskForm loadTask={this.loadTask} />
        </div>
      );
    }
  });

})();
