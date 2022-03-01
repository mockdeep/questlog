import autobind from 'class-autobind';
import React, {ChangeEvent} from 'react';

import AuthenticityToken from 'src/_common/components/authenticity_token';

type Props = {
  task: NewTask,
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

  buttonMessage() {
    return 'Add Task';
  }

  render() {
    const {task} = this.props;

    return (
      <form action='/tasks' method='post' id='new-form'>
        <AuthenticityToken />
        <input
          type='hidden'
          name='task[parent_task_id]'
          value={task.parentTaskId}
        />
        <div className='row'>
          <input
            type='text'
            autoComplete='off'
            name='task[title]'
            id='new-title'
            className='task-input'
            onChange={this.setTitle}
            placeholder={'e.g: do laundry #home @10am ~1h'}
            value={task.title}
            required
          />
        </div>
        <div className='row'>
          <input
            type='submit'
            className='btn btn-success btn-block'
            value={this.buttonMessage()}
          />
        </div>
      </form>
    );
  }
}

export default NewTaskForm;
