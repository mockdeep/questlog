import autobind from 'class-autobind';
import PropTypes from 'prop-types';
import React from 'react';

import DeleteButton from 'src/task/components/delete_button';
import TaskEditIcon from 'src/task/components/edit_icon';
import TaskEditTitleForm from 'src/task/containers/edit_title_form';
import timeframeNameMap from 'src/timeframe/name_map';
import {taskShape} from 'src/shapes';

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

  render() {
    const {deleteTask, task} = this.props;

    return (
      <div className='row'>
        <div id='task' className={this.className()}>
          <table>
            <tbody>
              <tr>
                <td className='col-xs-1'>
                  {this.timeframeName()}
                  <DeleteButton
                    task={task}
                    deleteTask={deleteTask}
                  />
                </td>
                <td className='col-xs-10 title'>
                  <div className='col-xs-10 col-xs-offset-1'>
                    <TaskEditTitleForm keyPrefix={'focusView'} task={task} />
                  </div>

                  <div className='col-xs-1'>
                    <span className='emblems'>{this.emblems()}</span>
                  </div>
                </td>

                <td className='col-xs-1'>
                  <TaskEditIcon task={task} />
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
  task: taskShape.isRequired,
};

export default TaskTitle;
