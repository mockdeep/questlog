/** @jsx React.DOM */

(function () {
  'use strict';

  Questlog.NewTaskForm = React.createClass({
    getInitialState: function () {
      return {buttonContent: 'Add Task', disabled: false};
    },
    saveTask: function (event) {
      event.preventDefault();
      if (this.state.disabled) { return; }
      var taskTitle = this.refs.title.getDOMNode().value.trim();
      this.setState({buttonContent: 'Adding Task', disabled: true});
      Questlog.request({
        url: 'tasks',
        method: 'post',
        data: {task: {title: taskTitle}},
      });
    },
    render: function () {
      return (
        <form className='new_task' id='new_task' onSubmit={this.saveTask}>
          <div className='row-fluid'>
            <div className='span6'>
              <input type='text'
                     autoComplete='off'
                     className='span12'
                     id='new_title'
                     ref='title' />
            </div>
            <div className='span6'>
              <input type='submit'
                     disabled={this.state.disabled}
                     className='btn btn-success btn-block'
                     value={this.state.buttonContent} />
            </div>
          </div>
        </form>
      );
    }
  });
})();
