import React from 'react';

import DeleteButton from 'js/task/components/delete_button';
import timeframeNameMap from 'js/timeframe/name_map';

const TaskTitle = React.createClass({
  propTypes: {
    deleteTask: React.PropTypes.func.isRequired,
    task: React.PropTypes.object.isRequired,
  },

  className() {
    let classString = 'col-md-12 task-display';

    if (this.props.task.priority) {
      classString = `${classString} priority-${this.props.task.priority}`;
    }
    if (this.props.task.skip_count >= 15) {
      classString = `${classString} over-skipped`;
    }

    return classString;
  },
  title() {
    return `skip count: ${this.props.task.skip_count}`;
  },
  emblems() {
    if (!this.props.task.repeatSeconds) { return false; }

    return <i className='fa fa-repeat' title='task repeats' />;
  },

  timeframeName() {
    if (!this.props.task.timeframe) { return false; }

    const timeframeName = timeframeNameMap[this.props.task.timeframe];

    return <div className='timeframe'>{timeframeName}</div>;
  },

  render() {
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
  },
});

export default TaskTitle;
