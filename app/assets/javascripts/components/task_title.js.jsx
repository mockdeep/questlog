'use strict';

var DeleteButton = require('./delete_button');

var TaskTitle = React.createClass({
  className: function () {
    var classString = 'col-md-12 task-display';
    if (this.props.task.priority) {
      classString = classString + ' priority-' + this.props.task.priority;
    }
    if (this.props.task.skip_count >= 15) {
      classString = classString + ' over-skipped';
    }
    return classString;
  },
  title: function () {
    return "skip count: " + this.props.task.skip_count;
  },
  emblems: function () {
    if (this.props.task.repeat_seconds) {
      return <i className='fa fa-repeat' title='task repeats' />;
    } else {
      return '';
    }
  },
  render: function () {
    return (
      <div className='row'>
        <div id='task' className={this.className()}>
          <table>
            <tr>
              <td className='col-md-1'>
                <DeleteButton
                  task={this.props.task}
                  loadTask={this.props.loadTask}
                />
              </td>
              <td className='col-md-10 title'>
                {this.props.task.title}
                <span className='emblems'>{this.emblems()}</span>
              </td>

              <td className='col-md-1'>
                <i
                  className='fa fa-arrow-down edit-button'
                  id='edit-task'
                  title='edit task'
                />
              </td>
            </tr>
          </table>
        </div>
      </div>
    );
  }
});

module.exports = TaskTitle;
