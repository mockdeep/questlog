/** @jsx React.DOM */

(function () {
  'use strict';

  Questlog.NewTaskForm = React.createClass({
    saveTask: function (event) {
      event.preventDefault();
      var taskTitle = this.refs.title.getDOMNode().value.trim();
      Questlog.request({
        url: 'tasks',
        method: 'post',
        data: { task: { title: taskTitle } },
      });
    },
    render: function () {
      return (
        <form className='new_task' id='new_task' onSubmit={this.saveTask}>
          <div className='row-fluid'>
            <div className='span6'>
              <input autoComplete='off' className='span12' id='new_title' type='text' ref='title' />
            </div>
            <div className='span6'>
              <input className='btn btn-success btn-block' type='submit' value='Add Task' />
            </div>
          </div>
        </form>
      );
    }
  });
})();
