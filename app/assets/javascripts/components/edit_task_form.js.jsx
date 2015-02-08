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
      if (this.state.taskTitle.trim() === '') {
        var newErrors = this.state.errors.concat('task title can\'t be blank');
        this.setState({errors: newErrors});
        return;
      }
      this.setState({buttonContent: 'Updating Task', disabled: true});
      Questlog.request({
        url: 'tasks/' + this.props.task.id,
        data: {id: this.props.id, task: {title: this.state.taskTitle.trim()}},
        success: this.loadTask
      });
    },
    loadTask: function () {
      $('#edit-task').click();
      this.props.loadTask();
      this.replaceState(this.getInitialState());
    },
    componentWillReceiveProps: function (newProps) {
      this.setState({taskTitle: newProps.task.title});
    },
    render: function () {
      return (
        <div className='row'>
          <div className='col-md-12' id='edit-form'>
            <form onSubmit={this.saveTask}>
              <Questlog.ErrorDisplay errors={this.state.errors} />
              <div className='row'>
                <div className='col-md-6'>
                  <input
                    type='text'
                    autoComplete='off'
                    className='col-md-12'
                    id='edit-title'
                    onChange={this.setTitle}
                    value={this.state.taskTitle}
                    ref='title'
                  />
                </div>
                <div className='col-md-6'>
                  <input
                    type='submit'
                    disabled={this.state.disabled}
                    className='btn btn-success btn-block'
                    value={this.state.buttonContent}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      );
    }
  });
})();
