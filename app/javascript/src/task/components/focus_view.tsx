import autobind from 'class-autobind';
import React from 'react';

import NewTaskForm from 'src/task/containers/new_task_form';
import TaskDisplay from 'src/task/components/task_display';

export type Props = {
  ajaxState: string,
  deleteTask: Function,
  updateTask: Function,
  task?: Task,
};

type State = {
  postponeSeconds: number;
};

class TaskFocusView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    autobind(this);

    this.state = {postponeSeconds: 300};
  }

  storePostponeSeconds(postponeSeconds: number) {
    this.setState({postponeSeconds});
  }

  setTitle(title: string) {
    document.title = title;
  }

  postponeTask(taskId: number) {
    const {updateTask} = this.props;
    const {postponeSeconds} = this.state;

    const attrs = {postpone: postponeSeconds};

    updateTask(taskId, attrs);
  }

  completeTask(taskId: number) {
    const {updateTask} = this.props;

    updateTask(taskId, {done: true});
  }

  mainDisplay() {
    const {ajaxState, task} = this.props;

    if (task) {
      return this.nextTaskDisplay(task);
    } else if (['fetching', 'taskSaving', 'loading'].includes(ajaxState)) {
      return this.loadingDisplay();
    } else if (ajaxState === 'ready') {
      return this.noTaskDisplay();
    }

    throw new Error(`don't know how to deal with ajaxState "${ajaxState}"`);
  }

  nextTaskDisplay(task: Task) {
    const {deleteTask} = this.props;
    const {completeTask, postponeTask, storePostponeSeconds} = this;

    this.setTitle(task.title);

    return (
      <TaskDisplay
        task={task}
        disabled={task.loadingState !== 'ready'}
        storePostponeSeconds={storePostponeSeconds}
        postponeTask={postponeTask}
        completeTask={completeTask}
        deleteTask={deleteTask}
      />
    );
  }

  loadingDisplay() {
    this.setTitle('Loading...');

    return <div><h1>{'Loading...'}</h1></div>;
  }

  noTaskDisplay() {
    this.setTitle('(no tasks!)');

    return <div><h2>{'No tasks! Try adding one below:'}</h2></div>;
  }

  render() {
    return (
      <div>
        {this.mainDisplay()}
        <hr />
        <NewTaskForm />
      </div>
    );
  }
}

export default TaskFocusView;
