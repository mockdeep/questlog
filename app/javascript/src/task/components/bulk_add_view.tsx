import autobind from 'class-autobind';
import React, {ChangeEvent} from 'react';

import AuthenticityToken from 'src/_common/components/authenticity_token';

type Props = {
  taskTitles: string,
  updateTaskMeta: Function,
};

class TaskBulkAddView extends React.Component<Props, never> {
  constructor(props: Props) {
    super(props);
    autobind(this);
  }

  setTitles(event: ChangeEvent<HTMLTextAreaElement>) {
    const {updateTaskMeta} = this.props;

    updateTaskMeta({newTask: {title: event.target.value}});
  }

  rootAttrs() {
    return {
      action: '/bulk_task',
      method: 'post',
      className: 'new_bulk_task',
      id: 'new_bulk_task',
    };
  }

  render() {
    const {taskTitles} = this.props;

    return (
      <form {...this.rootAttrs()}>
        <AuthenticityToken />
        <div className='row'>
          <div className='col-md-offset-3 col-md-6'>
            <textarea
              id='new-titles'
              className='task-input'
              rows={15}
              onChange={this.setTitles}
              value={taskTitles}
              name='bulk_task[titles]'
              required
            />
          </div>
        </div>
        <div className='row'>
          <div className='col-md-offset-3 col-md-6'>
            <input
              type='submit'
              name='commit'
              value='Add Tasks'
              className='btn btn-success btn-block'
            />
          </div>
        </div>
      </form>
    );
  }
}

export default TaskBulkAddView;
