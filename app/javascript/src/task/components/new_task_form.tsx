import autobind from 'class-autobind';
import React, {ChangeEvent, FormEvent} from 'react';

type Props = {
  createTask: Function,
  task: NewTask,
  taskSaving: boolean,
  updateTaskMeta: Function,
};

class NewTaskForm extends React.Component<Props, never> {
  constructor(props: Props) {
    super(props);
    autobind(this);
  }

  setTitle(event: ChangeEvent<HTMLInputElement>) {
    const {task, updateTaskMeta} = this.props;
    const taskAttrs = {title: event.target.value};

    updateTaskMeta({newTask: {...task, ...taskAttrs}});
  }

  saveTask(event: FormEvent) {
    event.preventDefault();

    const {createTask, task} = this.props;

    createTask(task);
  }

  buttonMessage() {
    const {taskSaving} = this.props;

    return taskSaving ? 'Adding Task' : 'Add Task';
  }

  validTask() {
    const {task} = this.props;

    return task.title.trim().length > 0;
  }

  disabled() {
    const {taskSaving} = this.props;

    return taskSaving || !this.validTask();
  }

  render() {
    const {task} = this.props;

    return (
      <form onSubmit={this.saveTask} id='new-form'>
        <div className='row'>
          <input
            type='text'
            autoComplete='off'
            id='new-title'
            className='task-input'
            onChange={this.setTitle}
            placeholder={'e.g: do laundry #home @10am ~1h'}
            value={task.title}
          />
        </div>
        <div className='row'>
          <input
            type='submit'
            disabled={this.disabled()}
            className='btn btn-success btn-block'
            value={this.buttonMessage()}
          />
        </div>
      </form>
    );
  }
}

export default NewTaskForm;
