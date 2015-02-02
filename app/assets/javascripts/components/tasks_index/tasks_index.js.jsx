(function () {

  'use strict';

  Questlog.TasksIndex = React.createClass({
    getInitialState: function () {
      return {currentTasks: [], pendingTasks: []};
    },

    loadTasks: function () {
      Questlog.request({
        method: 'get',
        url: '/tasks',
        success: this.updateCurrentTasks
      });
      Questlog.request({
        method: 'get',
        url: '/pending_tasks',
        success: this.updatePendingTasks
      });
    },

    updateCurrentTasks: function (data) {
      this.setState({currentTasks: data.tasks});
    },

    updatePendingTasks: function (data) {
      this.setState({pendingTasks: data.pending_tasks});
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
        />
      );
    },

    componentDidMount: function () {
      this.loadTasks();
    },

    render: function () {
      return (
        <div>
          <div id='current-tasks'>
            <ul>
              {this.currentTaskRows()}
            </ul>
          </div>

          <div id='pending-tasks'>
            <ul>
              {this.pendingTaskRows()}
            </ul>
          </div>
        </div>
      );
    }
  });

})();
