/** @jsx React.DOM */

(function () {
  'use strict';

  Questlog.NewTaskForm = React.createClass({
    getInitialState: function () {
      return {buttonContent: 'Add Task', disabled: false, errors: []};
    },
    saveTask: function (event) {
      event.preventDefault();
      if (this.state.disabled) { return; }
      var taskTitle = this.refs.title.getDOMNode().value.trim();
      if (taskTitle === '') {
        var newErrors = this.state.errors.concat('task title can\'t be blank');
        this.setState({errors: newErrors});
        return;
      }
      this.setState({buttonContent: 'Adding Task', disabled: true});
      Questlog.request({
        url: 'tasks',
        method: 'post',
        data: {task: {title: taskTitle}},
      });
    },
    render: function () {
      return (
        <form onSubmit={this.saveTask}>
          <Questlog.ErrorDisplay errors={this.state.errors} />
          <div className='row-fluid'>
            <div className='span6'>
              <input type='text'
                     autoComplete='off'
                     className='span12'
                     id='new-title'
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
