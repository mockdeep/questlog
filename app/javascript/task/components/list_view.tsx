import autobind from "class-autobind";
import type {ReactElement} from "react";
import {Component} from "react";
import update from "immutability-helper";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";

import BulkTaskStore from "../bulk_store";

import TableHeaders from "./table_headers";
import DraggableTaskRow from "./draggable_task_row";
import {assert} from "helpers";
import type {UpdateTask} from "../action_creators";

function findTask(tasks: Task[], taskId: number): Task {
  return assert(tasks.find(task => task.id === taskId));
}

function afterTaskHasHigherPriority(task: Task, afterTask: Task): boolean {
  if (!task.priority) { return true; }
  return Boolean(afterTask.priority && afterTask.priority < task.priority);
}

function beforeTaskHasLowerPriority(task: Task, beforeTask: Task): boolean {
  if (!beforeTask.priority) { return true; }
  return Boolean(task.priority && beforeTask.priority > task.priority);
}

export type Props = {
  currentTasks: Task[],
  deleteTask: (taskId: number) => void,
  pendingTasks: Task[],
  updateTask: UpdateTask,
};

type State = {
  currentTasks: Task[];
  pendingTasks: Task[];
};

class TaskListView extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const {currentTasks, pendingTasks} = this.props;
    this.state = {currentTasks, pendingTasks};
    autobind(this);
  }

  override componentDidUpdate(prevProps: Props): void {
    const {currentTasks, pendingTasks} = this.props;

    if (
      prevProps.currentTasks !== currentTasks ||
      prevProps.pendingTasks !== pendingTasks
    ) {
      this.setState({currentTasks, pendingTasks});
    }
  }

  moveTask(id: number, afterId: number): void {
    if (id === afterId) { return; }
    const {currentTasks} = this.state;

    const task = findTask(currentTasks, id);
    // afterTask is the task that comes **before** the task we're moving
    // unless task is moved to the top, in which it is the task **after**
    // somehow this works for both cases...
    const afterTask = findTask(currentTasks, afterId);
    const taskIndex = currentTasks.indexOf(task);
    const afterIndex = currentTasks.indexOf(afterTask);

    const newTasks = update(
      currentTasks,
      {$splice: [[taskIndex, 1], [afterIndex, 0, task]]},
    );

    this.setState({currentTasks: newTasks});
  }

  saveTaskPositions(taskId: number): void {
    const {updateTask} = this.props;
    const {currentTasks} = this.state;

    const task = findTask(currentTasks, taskId);
    const taskIndex = currentTasks.indexOf(task);
    // afterTask is the task that comes **after** the task we're moving
    const afterTask = currentTasks[taskIndex + 1];
    const beforeTask = currentTasks[taskIndex - 1];
    let newPriority = task.priority;

    if (beforeTask && afterTask) {
      if (![beforeTask.priority, afterTask.priority].includes(task.priority)) {
        newPriority = afterTask.priority;
      }
    } else if (afterTask && afterTaskHasHigherPriority(task, afterTask)) {
      newPriority = afterTask.priority;
    } else if (beforeTask && beforeTaskHasLowerPriority(task, beforeTask)) {
      newPriority = beforeTask.priority;
    }

    BulkTaskStore.update({positions: this.currentTaskPositions()});
    updateTask(taskId, {priority: newPriority});
  }

  currentTaskPositions() {
    const {currentTasks} = this.state;

    return currentTasks.map((task: Task) => task.id);
  }

  currentTasksTable(): ReactElement | null {
    const {currentTasks} = this.state;

    if (currentTasks.length === 0) { return null; }

    return (
      <div id='current-tasks'>
        <table className='tasks-table'>
          <thead><TableHeaders label={"Current tasks"} /></thead>
          <tbody>{this.currentTaskRows()}</tbody>
        </table>
      </div>
    );
  }

  pendingTasksTable(): ReactElement | null {
    const {pendingTasks} = this.state;

    if (pendingTasks.length === 0) { return null; }

    return (
      <div id='pending-tasks'>
        <table className='tasks-table'>
          <thead><TableHeaders label={"Pending tasks"} /></thead>
          <tbody>{this.pendingTaskRows()}</tbody>
        </table>
      </div>
    );
  }

  currentTaskRows(): ReactElement[] {
    const {currentTasks} = this.state;

    return currentTasks.map((task: Task) => this.taskRow(task));
  }

  pendingTaskRows(): ReactElement[] {
    const {pendingTasks} = this.state;

    return pendingTasks.map((task: Task) => this.taskRow(task));
  }

  taskRow(task: Task): ReactElement {
    const {deleteTask, updateTask} = this.props;

    return (
      <DraggableTaskRow
        key={task.id}
        task={task}
        moveTask={this.moveTask}
        saveTaskPositions={this.saveTaskPositions}
        updateTask={updateTask}
        deleteTask={deleteTask}
      />
    );
  }

  override render(): ReactElement {
    return (
      <DndProvider backend={HTML5Backend}>
        {this.currentTasksTable()}
        {this.pendingTasksTable()}
      </DndProvider>
    );
  }
}

export default TaskListView;
