'use strict';

var helpers = require('../helpers');

var BulkTaskForm = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState: function () {
    return {taskTitles: ''};
  },

  setTitles: function (event) {
    this.setState({taskTitles: event.target.value});
  },

  saveTasks: function (event) {
    event.preventDefault();
    if (this.state.taskTitles.trim() == '') { return; }
    helpers.request({
      url: '/bulk_tasks',
      method: 'post',
      data: {bulk_task: {titles: this.state.taskTitles.trim()}},
      success: function () {
        this.context.router.transitionTo('/tasks');
      }.bind(this)
    });
  },

  rootAttrs: function () {
    return {
      className: 'new_bulk_task',
      onSubmit: this.saveTasks,
      id: 'new_bulk_task',
    };
  },

  render: function () {
    return (
      <form {...this.rootAttrs()}>
        <div className='row'>
          <div className='col-md-offset-3 col-md-6'>
            <textarea
              id='new-titles'
              className='task-input'
              rows='15'
              onChange={this.setTitles}
              value={this.state.taskTitles}
              name='bulk_task[titles]'
            />
          </div>
        </div>
        <div className='row'>
          <div className='col-md-offset-3 col-md-6'>
            <input
              type='submit'
              name='commit'
              value='Add Tasks'
              className='btn btn-success btn-block'
            />
          </div>
        </div>
      </form>
    );
  }
});

module.exports = BulkTaskForm;
