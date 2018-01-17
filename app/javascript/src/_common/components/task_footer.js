import PropTypes from 'prop-types';
import React from 'react';

import HelpLink from 'src/_common/containers/help_link';
import NotificationCheckbox from 'src/notification/containers/checkbox';
import {taskShape} from 'src/shapes';

function TaskFooter({task, completeTask}) {
  const notificationProps = {task, completeTask};

  return (
    <footer className='task-footer'>
      {task ? <NotificationCheckbox {...notificationProps} /> : null}
      <br />
      <a href='/bulk_task/new'>{'Add multiple tasks'}</a>
      {' | '}
      <HelpLink />
      <br />
      {'Try adding a tag using "#", for example: '}
      <strong>{'#home'}</strong>{' or '}<strong>{'#5-min'}</strong>{'. '}
      {'Click '}<HelpLink />{' for more.'}
    </footer>
  );
}

TaskFooter.propTypes = {
  completeTask: PropTypes.func.isRequired,
  task: taskShape,
};

export default TaskFooter;
