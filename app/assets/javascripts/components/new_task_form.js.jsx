/** @jsx React.DOM */

(function () {

  'use strict';

  Questlog.NewTaskForm = React.createClass({
    getInitialState: function () {
      return {
        buttonContent: 'Add Task',
        disabled: false,
        errors: [],
        taskTitle: ''
      };
    },
    setTitle: function (event) {
      this.setState({taskTitle: event.target.value});
    },
    saveTask: function (event) {
      event.preventDefault();
      if (this.state.disabled) { return; }
      if (this.state.taskTitle.trim() === '') {
        var newErrors = this.state.errors.concat('task title can\'t be blank');
        this.setState({errors: newErrors});
        return;
      }
      this.setState({buttonContent: 'Adding Task', disabled: true});
      Questlog.request({
        url: 'tasks',
        method: 'post',
        data: {task: {title: this.state.taskTitle.trim()}},
        success: this.loadTask
      });
    },
    loadTask: function () {
      Questlog.flash('success', 'Task added');
      this.props.loadTask();
      this.replaceState(this.getInitialState());
    },
    render: function () {
      return (
        <form onSubmit={this.saveTask} id='new-form'>
          <Questlog.ErrorDisplay errors={this.state.errors} />
          <div className='row'>
            <div className='col-md-6'>
              <input type='text'
                     autoComplete='off'
                     className='col-md-12'
                     id='new-title'
                     onChange={this.setTitle}
                     value={this.state.taskTitle}
                     ref='title' />
            </div>
            <div className='col-md-6'>
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
