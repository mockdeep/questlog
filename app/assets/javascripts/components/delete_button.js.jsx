/** @jsx React.DOM */

(function () {
  'use strict';

  Questlog.DeleteButton = React.createClass({
    deleteTask: function (event) {
      event.stopPropagation();
      if (confirm('Delete this task?')) {
        Questlog.request({
          url: 'tasks/' + this.props.task.id,
          method: 'delete',
          success: this.props.loadTask
        });
      }
    },

    render: function () {
      return (
        <i
          className='fa fa-times'
          title='delete task'
          onClick={this.deleteTask}
        />
      );
    }
  });

})();
