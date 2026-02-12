import autobind from "class-autobind";
import classnames from "classnames";
import {Component} from "react";
import type {ReactElement} from "react";

import DeleteButton from "src/task/components/delete_button";
import {grab} from "helpers";
import TaskEditIcon from "src/task/components/edit_icon";
import TaskEditTitleForm from "src/task/components/edit_title_form";
import timeframeNameMap from "src/timeframe/name_map";

type Props = {
  deleteTask: (taskId: number) => void,
  task: Task,
};

class TaskTitle extends Component<Props, never> {
  constructor(props: Props) {
    super(props);
    autobind(this);
  }

  className(): string {
    const {task} = this.props;

    return classnames({
      "col-md-12 task-display": true,
      [`priority-${task.priority}`]: task.priority,
      "over-skipped": task.skipCount >= 15,
    });
  }

  title(): string {
    const {task} = this.props;

    return `skip count: ${task.skipCount}`;
  }

  emblems(): ReactElement | null {
    const {task} = this.props;

    if (!task.repeatSeconds) { return null; }

    return <i className='fas fa-redo-alt' title='task repeats' />;
  }

  timeframeName(): ReactElement | null {
    const {task} = this.props;

    if (!task.timeframe) { return null; }

    const timeframeName = grab(timeframeNameMap, task.timeframe);

    return (
      <div className='timeframe'>{timeframeName}</div>
    );
  }

  render(): ReactElement {
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
                    <TaskEditTitleForm task={task} />
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

export default TaskTitle;
