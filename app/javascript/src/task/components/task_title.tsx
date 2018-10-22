import autobind from 'class-autobind';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import DeleteButton from 'src/task/components/delete_button';
import grab from 'src/_helpers/grab';
import TaskEditIcon from 'src/task/components/edit_icon';
import TaskEditTitleForm from 'src/task/containers/edit_title_form';
import timeframeNameMap from 'src/timeframe/name_map';
import {taskShape} from 'src/shapes';

type Props = {
  deleteTask: Function,
  task: Task,
};

class TaskTitle extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);
    autobind(this);
  }

  className() {
    const {task} = this.props;

    return classnames({
      'col-md-12 task-display': true,
      [`priority-${task.priority}`]: task.priority,
      'over-skipped': task.skipCount >= 15,
    });
  }

  title() {
    const {task} = this.props;

    return `skip count: ${task.skipCount}`;
  }

  emblems() {
    const {task} = this.props;

    if (!task.repeatSeconds) { return false; }

    return <i className='fas fa-redo-alt' title='task repeats' />;
  }

  timeframeName() {
    const {task} = this.props;

    if (!task.timeframe) { return false; }

    const timeframeName = grab(timeframeNameMap, task.timeframe);

    return (
      <div className='timeframe'>{timeframeName}</div>
    );
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
                  <DeleteButton task={task} deleteTask={deleteTask} />
                </td>
                <td className='col-xs-10 title'>
                  <div className='col-xs-10 col-xs-offset-1'>
                    <TaskEditTitleForm keyPrefix={'focusView'} task={task} />
                  </div>

                  <div className='col-xs-1'>
                    <span className='emblems'>{this.emblems()}</span>
                  </div>
                </td>
                <td className='col-xs-1'><TaskEditIcon task={task} /></td>
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
