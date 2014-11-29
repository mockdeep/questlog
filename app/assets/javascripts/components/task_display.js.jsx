/** @jsx React.DOM */

(function () {

  'use strict';

  Questlog.TaskDisplay = React.createClass({
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
    updateTags: function (data) {
      this.setState({tags: data.tags});
    },
    updateTask: function (data) {
      if (data) {
        this.setState({task: data.task, disabled: false});
      } else {
        this.setState({task: {title: '(no tasks!)'}, disabled: true});
      }
      this.setTitle();
    },
    getInitialState: function () {
      return {task: {title: 'Loading...'}, disabled: true, tags: []};
    },
    componentDidMount: function () {
      this.setTitle();
      this.loadTask();
    },
    disable: function () {
      this.setState({disabled: true});
    },
    setTitle: function () {
      document.title = 'Task: ' + this.state.task.title;
    },
    render: function () {
      return (
        <div>
          <Questlog.TagButtons task={this.state.task} tags={this.state.tags} />
          <Questlog.TaskTitle task={this.state.task} loadTask={this.loadTask} />
          <Questlog.MainButtons task={this.state.task}
                                loadTask={this.loadTask}
                                disabled={this.state.disabled}
                                disable={this.disable} />
          <hr />
          <div id='edit-form'>
            <Questlog.EditTaskForm task={this.state.task}
                                   loadTask={this.loadTask} />
          </div>
        </div>
      );
    }
  });

})();
