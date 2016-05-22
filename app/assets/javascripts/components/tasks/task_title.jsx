'use strict';

var React = require('react');

var DeleteButton = require('components/tasks/delete_button');
var timeframeNameMap = require('timeframe_name_map');

var TaskTitle = React.createClass({
  propTypes: {
    task: React.PropTypes.object.isRequired,
    loadTask: React.PropTypes.func.isRequired,
    deleteTask: React.PropTypes.func.isRequired
  },

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
    return 'skip count: ' + this.props.task.skip_count;
  },
  emblems: function () {
    if (this.props.task.repeat_seconds) {
      return <i className='fa fa-repeat' title='task repeats' />;
    } else {
      return '';
    }
  },

  timeframeName: function () {
    if (this.props.task.timeframe) {
      var timeframeName = timeframeNameMap[this.props.task.timeframe];
      return (<div className='timeframe'>{timeframeName}</div>);
    }
  },

  render: function () {
    return (
      <div className='row'>
        <div id='task' className={this.className()}>
          <table>
            <tbody>
              <tr>
                <td className='col-md-1'>
                  {this.timeframeName()}
                  <DeleteButton
                    task={this.props.task}
                    loadTask={this.props.loadTask}
                    deleteTask={this.props.deleteTask}
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
            </tbody>
          </table>
        </div>
      </div>
    );
  }
});

module.exports = TaskTitle;
