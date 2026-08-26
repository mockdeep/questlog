import autobind from "class-autobind";
import type {ReactElement} from "react";
import {Component} from "react";
import update from "immutability-helper";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";

import TableHeaders from "./table_headers";
import DraggableTaskRow from "./draggable_task_row";
import PendingTasksTable from "./pending_tasks_table";
import {ensure} from "helpers/ensure";
import type {MoveTask, UpdateTask} from "../action_creators";

function findTask(tasks: Task[], taskId: number): Task {
  return ensure(tasks.find(task => task.id === taskId));
}

function afterTaskHasHigherPriority(task: Task, afterTask: Task): boolean {
  if (!task.priority) { return true; }
  return Boolean(afterTask.priority && afterTask.priority < task.priority);
}

function beforeTaskHasLowerPriority(task: Task, beforeTask: Task): boolean {
  if (!beforeTask.priority) { return true; }
  return Boolean(task.priority && beforeTask.priority > task.priority);
}

/*
 * The task takes the position of whichever neighbour it displaced, and the
 * server shifts the rest of the sequence to make room. Positions are still
 * the ones the task had before the drag, so comparing against them tells us
 * which way it travelled.
 */
function newPosition(
  task: Task,
  beforeTask: Task | undefined,
  afterTask: Task | undefined,
): number {
  if (afterTask && task.position > afterTask.position) {
    return afterTask.position;
  }
  if (beforeTask && task.position < beforeTask.position) {
    return beforeTask.position;
  }

  return task.position;
}

export type Props = {
  currentTasks: Task[],
  deleteTask: (taskId: number) => void,
  moveTask: MoveTask,
  pendingTasks: Task[],
  updateTask: UpdateTask,
};

type State = {
  currentTasks: Task[];
};

class TaskListView extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const {currentTasks} = this.props;
    this.state = {currentTasks};
    autobind(this);
  }

  override componentDidUpdate(prevProps: Props): void {
    const {currentTasks} = this.props;

    if (prevProps.currentTasks !== currentTasks) {
      this.setState({currentTasks});
    }
  }

  reorderTasks(id: number, afterId: number): void {
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
    const {moveTask} = this.props;
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

    moveTask(taskId, {
      position: newPosition(task, beforeTask, afterTask),
      priority: newPriority,
    });
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

  currentTaskRows(): ReactElement[] {
    const {currentTasks} = this.state;

    return currentTasks.map((task: Task) => this.taskRow(task));
  }

  taskRow(task: Task): ReactElement {
    const {deleteTask, updateTask} = this.props;

    return (
      <DraggableTaskRow
        key={task.id}
        task={task}
        reorderTasks={this.reorderTasks}
        saveTaskPositions={this.saveTaskPositions}
        updateTask={updateTask}
        deleteTask={deleteTask}
      />
    );
  }

  override render(): ReactElement {
    const {deleteTask, pendingTasks, updateTask} = this.props;

    return (
      <DndProvider backend={HTML5Backend}>
        {this.currentTasksTable()}
        <PendingTasksTable
          deleteTask={deleteTask}
          pendingTasks={pendingTasks}
          updateTask={updateTask}
        />
      </DndProvider>
    );
  }
}

export default TaskListView;
