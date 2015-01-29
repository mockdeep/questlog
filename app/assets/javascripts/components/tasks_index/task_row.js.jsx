(function () {
  'use strict';

  Questlog.TaskRow = React.createClass({
    markDone: function () {
      Questlog.request({
        url: 'tasks/' + this.props.task.id,
        data: {task: {done: true}}
      });
    },

    deleteTask: function (event) {
      event.stopPropagation();
      if (confirm('Delete this task?')) {
        Questlog.request({
          url: 'tasks/' + this.props.task.id,
          method: 'delete'
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
      if (this.props.task.priority) {
        classString = classString + ' priority-' + this.props.task.priority;
      }
      return classString;
    },

    render: function () {
      return (
        <li className={this.className()}>
          {this.props.task.title} {this.emblems()}
          {' | '}
          <a href='javascript:void(0)' onClick={this.markDone}>Done!</a>
          {' | '}
          <a href='javascript:void(0)' onClick={this.deleteTask}>Delete</a>
        </li>
      );
    }
  });

})();
