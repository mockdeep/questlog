(function () {

  'use strict';

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
