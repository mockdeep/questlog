import PropTypes from 'prop-types';
import React from 'react';

import ModalLink from 'src/_common/containers/modal_link';

import NotificationCheckbox from 'src/notification/containers/checkbox';
import {taskShape} from 'src/shapes';

export type Props = {
  completeTask: Function;
  task: Task;
};

function TaskFooter({task, completeTask}: Props) {
  const notificationProps = {task, completeTask};

  return (
    <footer className='task-footer'>
      {task ? <NotificationCheckbox {...notificationProps} /> : null}
      <br />
      <a href='/bulk_task/new'>{'Add multiple tasks'}</a>
      {' | '}
      <ModalLink modalName={'help'}>{'Help'}</ModalLink>
      <br />
      {'Try adding a tag using "#", for example: '}
      <strong>{'#home'}</strong>{' or '}<strong>{'#5-min'}</strong>{'. '}
      {'Click '}<ModalLink modalName={'help'}>{'help'}</ModalLink>{' for more.'}
    </footer>
  );
}

TaskFooter.propTypes = {
  completeTask: PropTypes.func.isRequired,
  task: taskShape,
};

export default TaskFooter;
