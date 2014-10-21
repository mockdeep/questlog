/** @jsx React.DOM */

(function () {
  'use strict';

  Questlog.EditTaskForm = React.createClass({
    getInitialState: function () {
      return {
        buttonContent: 'Update Task',
        disabled: false,
        taskTitle: this.props.task.title,
        errors: []
      };
    },
    setTitle: function (event) {
      this.setState({taskTitle: event.target.value});
    },
    saveTask: function (event) {
      event.preventDefault();
      if (this.state.disabled) { return; }
      if (this.state.taskTitle.trim() == '') {
        var newErrors = this.state.errors.concat('task title can\'t be blank');
        console.log('newErrors: ', newErrors);
        this.setState({errors: newErrors});
        return;
      }
      this.setState({buttonContent: 'Updating Task', disabled: true});
      Questlog.request({
        url: 'tasks/' + this.props.task.id,
        data: {id: this.props.id, task: {title: this.state.taskTitle.trim()}},
      });
    },
    render: function () {
      return (
        <form className='edit_task' id='edit_task' onSubmit={this.saveTask}>
          <Questlog.ErrorDisplay errors={this.state.errors} />
          <div className='row-fluid'>
            <div className='span6'>
              <input type='text'
                     autoComplete='off'
                     className='span12'
                     id='edit_title'
                     onChange={this.setTitle}
                     value={this.state.taskTitle}
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
