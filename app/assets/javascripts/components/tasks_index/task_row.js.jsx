(function () {
  'use strict';

  Questlog.TaskRow = React.createClass({
    markDone: function () {
      Questlog.request({
        url: 'tasks/' + this.props.task.id,
        data: {task: {done: true}},
        success: this.props.loadTasks
      });
    },

    updatePriority: function (event) {
      Questlog.request({
        url: 'tasks/' + this.props.task.id,
        data: {task: {priority: event.target.value}},
        success: this.props.loadTasks
      });
    },

    deleteTask: function (event) {
      event.stopPropagation();
      if (confirm('Delete this task?')) {
        Questlog.request({
          url: 'tasks/' + this.props.task.id,
          method: 'delete',
          success: this.props.loadTasks
        });
      }
    },

    emblems: function () {
      if (this.props.task.repeat_seconds) {
        return <i className='fa fa-repeat' title='task repeats' />;
      } else {
        return '';
      }
    },

    className: function () {
      var classString = '';
      if (this.priority()) {
        classString += ' priority-' + this.priority();
      }
      return classString;
    },

    priority: function () {
      return this.props.task.priority;
    },

    render: function () {
      return (
        <li className={this.className()}>
          {this.props.task.title} {this.emblems()}
          {' | Pri: '}
          <select onChange={this.updatePriority} defaultValue={this.priority()}>
            <option value=''>-</option>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
          </select>
          {' | '}
          <a href='javascript:void(0)' onClick={this.markDone}>Done!</a>
          {' | '}
          <a href='javascript:void(0)' onClick={this.deleteTask}>Delete</a>
        </li>
      );
    }
  });

})();
