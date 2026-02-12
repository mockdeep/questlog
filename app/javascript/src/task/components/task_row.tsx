import autobind from "class-autobind";
import classnames from "classnames";
import type {ChangeEvent, MouseEvent, ReactElement} from "react";
import {PureComponent} from "react";
import {map} from "lodash";

import {grab, assert} from "helpers";
import TaskEditIcon from "src/task/components/edit_icon";
import TaskEditTitleForm from "src/task/components/edit_title_form";
import timeframeNameMap from "src/timeframe/name_map";
import type {UpdateTask} from "src/task/action_creators";

const BUTTON_CLASS = "btn btn-link tasks-table__action";

export type Props = {
  deleteTask: (taskId: number) => void,
  task: Task,
  updateTask: UpdateTask,
  isDragging?: boolean,
  status?: string,
  timeframesEnabled?: boolean,
  timeframeSpace?: TimeframeSpace,
};

type State = {
  timeframeClicked: boolean;
};

class TaskRow extends PureComponent<Props, State> {
  domNode: HTMLTableRowElement | undefined;

  constructor(props: Props) {
    super(props);
    autobind(this);
    this.state = {timeframeClicked: false};
  }

  markDone(event: MouseEvent): void {
    const {task, updateTask} = this.props;

    event.preventDefault();
    updateTask(task.id, {done: true});
  }

  updatePriority(event: ChangeEvent<HTMLSelectElement>): void {
    const {task, updateTask} = this.props;

    updateTask(task.id, {priority: parseInt(event.target.value, 10)});
  }

  updateTimeframe(event: ChangeEvent<HTMLSelectElement>): void {
    const {task, updateTask} = this.props;

    updateTask(task.id, {timeframe: event.target.value});
  }

  deleteTask(event: MouseEvent): void {
    const {deleteTask, task} = this.props;

    event.preventDefault();
    // eslint-disable-next-line no-alert
    if (confirm("Delete this task?")) {
      deleteTask(task.id);
    }
  }

  emblems(): ReactElement | null {
    const {task} = this.props;

    if (!task.repeatSeconds) { return null; }

    return <i className='fas fa-redo-alt' title='task repeats' />;
  }

  className(): string {
    const {isDragging, status} = this.props;

    return classnames({
      "tasks-table__row": true,
      [`tasks-table__row--priority-${this.priority()}`]: this.priority(),
      [`tasks-table__row--${status}`]: status,
      "tasks-table__row--dragging": isDragging,
    });
  }

  priority(): number | "" {
    const {task} = this.props;

    return task.priority || "";
  }

  timeframe(): string {
    const {task} = this.props;

    return task.timeframe || "inbox";
  }

  timeframeHasSpace(name: string): boolean {
    const {task, timeframeSpace} = this.props;

    return grab(assert(timeframeSpace), name) >= task.estimateMinutes;
  }

  optionText(title: string, name: string): string {
    const {timeframeSpace} = this.props;
    const space = grab(assert(timeframeSpace), name);
    let text = title;

    if (this.timeframe() !== name && isFinite(space)) {
      text += ` (${space})`;
    }

    return text;
  }

  timeframeOptions(): ReactElement[] {
    const {timeframeClicked} = this.state;

    if (!timeframeClicked) {
      // hack optimization so that each task row doesn't need to re-render
      return map(timeframeNameMap, (title, name) => {
        const optionTitle = name === "inbox" ? "-" : title;

        return <option value={name} key={name}>{optionTitle}</option>;
      });
    }
    return map(timeframeNameMap, (title, name) => {
      const disabled = !this.timeframeHasSpace(name);
      const optionTitle = name === "inbox" ? "-" : title;

      return (
        <option value={name} disabled={disabled} key={name}>
          {this.optionText(optionTitle, name)}
        </option>
      );
    });
  }

  timeframeSelector(): ReactElement {
    return (
      <select
        className='timeframe-select'
        onFocus={this.timeframeClicked}
        defaultValue={this.timeframe()}
        onChange={this.updateTimeframe}
        name='timeframe-select'
      >
        {this.timeframeOptions()}
      </select>
    );
  }

  timeframeClicked(): void {
    this.setState({timeframeClicked: true});
  }

  taskEstimate(): string {
    const {task} = this.props;

    return `${task.estimateMinutes} min`;
  }

  undoTask(): void {
    const {task, updateTask} = this.props;

    updateTask(task.id, {done: false});
  }

  undoButton(): ReactElement | null {
    const {task} = this.props;

    if (!task.pending) { return null; }

    return (
      <button className={BUTTON_CLASS} onClick={this.undoTask}>
        {"UNDO"}
      </button>
    );
  }

  storeDOMNode(domNode: HTMLTableRowElement): void {
    this.domNode = domNode;
  }

  render(): ReactElement {
    const {task, timeframesEnabled} = this.props;

    return (
      <tr className={this.className()} ref={this.storeDOMNode}>
        <td className='tasks-table__cell'>
          <button className={BUTTON_CLASS} onClick={this.markDone}>
            {"DONE"}
          </button>
        </td>
        <td><TaskEditTitleForm task={task} /></td>
        <td><TaskEditIcon task={task} /></td>
        <td>{this.taskEstimate()}</td>
        <td>{this.emblems()}</td>
        <td>
          <select onChange={this.updatePriority} value={this.priority()}>
            <option value=''>{"-"}</option>
            <option value='1'>{"1"}</option>
            <option value='2'>{"2"}</option>
            <option value='3'>{"3"}</option>
          </select>
        </td>
        <td>
          {timeframesEnabled ? this.timeframeSelector() : ""}
        </td>
        <td>
          {task.pending ? this.undoButton() : ""}
          <button className={BUTTON_CLASS} onClick={this.deleteTask}>
            {"DELETE"}
          </button>
        </td>
      </tr>
    );
  }
}

export default TaskRow;
