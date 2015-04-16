(function () {
  'use strict';

  var update = require('react/lib/update');

  var isPending = function (task) {
    return task.pending;
  };

  Questlog.TasksIndex = React.createClass({
    getInitialState: function () {
      return {currentTasks: [], pendingTasks: []};
    },

    loadTasks: function () {
      Questlog.request({
        method: 'get',
        url: '/tasks',
        success: this.updateTasks
      });
    },

    updateTasks: function (data) {
      var partitionedTasks = _.partition(data.tasks, isPending);
      this.setState({
        pendingTasks: partitionedTasks[0],
        currentTasks: partitionedTasks[1]
      });
    },

    removeTask: function (task) {
      this.setState({currentTasks: _.without(this.state.currentTasks, task)});
      this.setState({pendingTasks: _.without(this.state.pendingTasks, task)});
    },

    moveTask: function (id, afterId) {
      var tasks = this.state.currentTasks;

      var task = _.find(tasks, function (t) { return t.id === id; });
      var afterTask = _.find(tasks, function (t) { return t.id === afterId; });
      var taskIndex = tasks.indexOf(task);
      var afterIndex = tasks.indexOf(afterTask);

      var newTasks = update(tasks, {
        $splice: [
          [taskIndex, 1],
          [afterIndex, 0, task]
        ]
      });

      this.setState({currentTasks: newTasks});
    },

    saveTaskPositions: function (component) {
      var taskId = component.props.task.id;
      var tasks = this.state.currentTasks;

      var task = _.find(tasks, function (t) { return t.id === taskId; });
      var taskIndex = tasks.indexOf(task);
      var afterTask = tasks[taskIndex + 1];
      var beforeTask = tasks[taskIndex - 1];
      var newPriority = task.priority;

      if (beforeTask && afterTask) {
        if (task.priority !== beforeTask.priority && task.priority !== afterTask.priority) {
          newPriority = afterTask.priority;
        }
      } else if (afterTask && (afterTask.priority && afterTask.priority < task.priority || !task.priority)) {
        newPriority = afterTask.priority;
      } else if (beforeTask && (task.priority && beforeTask.priority > task.priority || !beforeTask.priority)) {
        newPriority = beforeTask.priority;
      }

      Questlog.request({
        method: 'put',
        url: '/bulk_tasks',
        data: { bulk_task: { positions: this.currentTaskPositions() } },
        success: function () { }
      });
      component.updatePriority({target: { value: newPriority }});
    },

    currentTaskPositions: function () {
      return _.map(this.state.currentTasks, function (task) {
        return task.id;
      });
    },

    currentTaskRows: function () {
      return _.map(this.state.currentTasks, this.taskRow);
    },

    pendingTaskRows: function () {
      return _.map(this.state.pendingTasks, this.taskRow);
    },

    taskRow: function (task) {
      return (
        <Questlog.TaskRow
          key={task.id}
          task={task}
          loadTasks={this.loadTasks}
          removeTask={this.removeTask}
          moveTask={this.moveTask}
          saveTaskPositions={this.saveTaskPositions}
        />
      );
    },

    componentDidMount: function () {
      this.loadTasks();
    },

    render: function () {
      return (
        <div>
          <Questlog.NewTaskForm loadTask={this.loadTasks} />
          <br />
          <div id='current-tasks'>
            <h2>Current Tasks</h2>
            <ul>
              {this.currentTaskRows()}
            </ul>
          </div>

          <div id='pending-tasks'>
            <h2>Pending Tasks</h2>
            <ul>
              {this.pendingTaskRows()}
            </ul>
          </div>
        </div>
      );
    }
  });

})();
