import autobind from 'class-autobind';
import PropTypes from 'prop-types';
import React from 'react';

import DeleteButton from 'src/task/components/delete_button';
import Link from 'src/route/containers/link';
import timeframeNameMap from 'src/timeframe/name_map';

class TaskTitle extends React.Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  className() {
    let classString = 'col-md-12 task-display';

    if (this.props.task.priority) {
      classString = `${classString} priority-${this.props.task.priority}`;
    }
    if (this.props.task.skip_count >= 15) {
      classString = `${classString} over-skipped`;
    }

    return classString;
  }

  title() {
    return `skip count: ${this.props.task.skip_count}`;
  }

  emblems() {
    if (!this.props.task.repeatSeconds) { return false; }

    return <i className='fa fa-repeat' title='task repeats' />;
  }

  timeframeName() {
    if (!this.props.task.timeframe) { return false; }

    const timeframeName = timeframeNameMap[this.props.task.timeframe];

    return <div className='timeframe'>{timeframeName}</div>;
  }

  taskTitle() {
    const {task} = this.props;

    if (task.id) {
      return (
        <Link
          to='showTask'
          className='task-display__title'
          params={{taskId: task.id}}
        >
          {task.title}
        </Link>
      );
    }

    return task.title;
  }

  render() {
    const {deleteTask, task} = this.props;

    return (
      <div className='row'>
        <div id='task' className={this.className()}>
          <table>
            <tbody>
              <tr>
                <td className='col-md-1'>
                  {this.timeframeName()}
                  <DeleteButton
                    task={task}
                    deleteTask={deleteTask}
                  />
                </td>
                <td className='col-md-10 title'>
                  {this.taskTitle()}
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
}

TaskTitle.propTypes = {
  deleteTask: PropTypes.func.isRequired,
  task: PropTypes.object.isRequired,
};

export default TaskTitle;
