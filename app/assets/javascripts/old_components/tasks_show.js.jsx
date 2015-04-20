(function () {
  'use strict';

  var NewTaskForm = require('../components/new_task_form');
  var TaskFooter = require('../components/common/task_footer');
  var TaskDisplay = require('../components/task_display');

  Questlog.TasksShow = React.createClass({
    contextTypes: {
      router: React.PropTypes.func
    },
    getInitialState: function () {
      return {task: {title: 'Loading...'}, disabled: true, tags: []};
    },
    loadTask: function (url) {
      Questlog.request({
        method: 'get',
        url: this.context.router.getCurrentParams().slug || '',
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
      this.loadTask();
      this.setTitle();
    },

    componentWillReceiveProps: function (nextProps) {
      this.loadTask(nextProps.url);
      this.setTitle();
    },
    render: function () {
      return (
        <div>
          <TaskDisplay
            task={this.state.task}
            tags={this.state.tags}
            disable={this.disable}
            loadTask={this.loadTask}
            disabled={this.state.disabled}
          />
          <NewTaskForm loadTask={this.loadTask} />

          <hr />
          <TaskFooter />
        </div>
      );
    }
  });

})();
