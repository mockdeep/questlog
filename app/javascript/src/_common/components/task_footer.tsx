import React from 'react';

import NotificationCheckbox from 'src/notification/containers/checkbox';

export type Props = {
  completeTask: Function;
  task?: Task;
};

function TaskFooter({task, completeTask}: Props) {
  return (
    <footer className='task-footer'>
      {task && <NotificationCheckbox task={task} completeTask={completeTask} />}
      <br />
      <a href='/bulk_task/new'>{'Add multiple tasks'}</a>
      {' | '}
      <a href='/help' data-turbo-frame='dialog' data-turbo='true'>
        {'Help'}
      </a>
      <br />
      {'Try adding a tag using "#", for example: '}
      <strong>{'#home'}</strong>{' or '}<strong>{'#5-min'}</strong>{'. '}
      {'Click '}
      <a href='/help' data-turbo-frame='dialog' data-turbo='true'>
        {'help'}
      </a>
      {' for more.'}
    </footer>
  );
}

export default TaskFooter;
